import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import {
  TextField,
  CircularProgress,
  Autocomplete,
  Typography,
  FormControl,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFetch } from "@/hooks/useFetch";
import { resolveDisplayName, capitalizeFirstLetter } from "@/utilities/formatters";
import "./autocomplete.scss";
import IconArrowBottom from "@/assets/icons/IconArrowBottom";

/** Construye URL dinámica según dependsOn + query */
const buildUrlWithDepends = (
  baseUrl: string,
  dependsOn: string[],
  query: string[],
  formValues: Record<string, any>
) => {
  if (!baseUrl) return "";
  const params = new URLSearchParams();

  dependsOn.forEach((dep, index) => {
    const key = query[index];
    const val = formValues?.[dep];
    if (key && val != null) {
      const realVal =
        typeof val === "object" ? val?.id ?? val?.code ?? val?.value ?? "" : val;
      params.append(key, String(realVal));
    }
  });

  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
};

/** Inserta objeto withObject si no existe */
const ensureItemWithObject = (
  prev: any[],
  tempObject: any,
  valueKey: string,
  nameKey: string,
  isWithCode: boolean
) => {
  if (!tempObject) return prev;
  const exists = prev.some((p) => p[valueKey] === tempObject[valueKey]);
  if (!exists) {
    const label = isWithCode
      ? `${tempObject?.code ?? ""} - ${resolveDisplayName(tempObject, nameKey)}`
      : resolveDisplayName(tempObject, nameKey);
    return [...prev, { ...tempObject, label }];
  }
  return prev;
};

/**
 * Retorna el objeto "padre" del último nivel de una ruta tipo patch (e.g. "news.0.category")
 * @param {object} obj - El objeto base
 * @param {string} path - La ruta con puntos (e.g. "news.0.category")
 * @returns {object|null} - El objeto padre o null si la ruta no existe
 */
const getParentObject = (obj:any, path:string)=>{
  if (!obj || typeof obj !== "object" || typeof path !== "string") return null;

  const parts = path.split(".");
  if (parts.length < 2) return null;

  const parentPath = parts.slice(0, -1);
  let current: any = obj;

  for (const key of parentPath) {
    if (current == null) return null;

    // Forzamos acceso flexible: si es número, convertimos a índice
    const prop: string | number = /^\d+$/.test(key) ? Number(key) : key;
    current = (current as any)[prop];
  }
  return current;
}

interface AutocompleteDynamicFieldProps {
  item: any;
  formValues?: Record<string, any>;
  value?: any;
  onChange?: (value: any) => void;
  onValueChange?: (key: string, value: any) => void;
  mode?: "create" | "edit" | "view";
  props?: any;
}

const AutocompleteDynamicField: React.FC<AutocompleteDynamicFieldProps> = ({
  item,
  formValues = {},
  value,
  onChange,
  onValueChange,
  mode = "create",
  props,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const itemObjectRef = useRef<any>(null);
  const handleTimerRef = useRef<any>(null);

  const isFromSetElement = props?.name?.split('.')?.length > 0; 
  const { fetchData } = useFetch();

  const dependsOn = item?.dataField?.dependsOn || [];
  const queryKeys = item?.dataField?.query || [];
  const endpoint = item?.dataField?.url || "";
  const valueKey = item?.dataField?.value?.toString() || "id";
  const nameKey = item?.dataField?.name || "name";
  const isWithCode = item?.dataField?.isWithCode ?? false;
  const isSearch = item?.props?.isSearch ?? false;
  const searchFields = item?.props?.searchFields || [];

  const isDisabled = mode === "view" || item?.props?.disabled;
  const [open, setOpen] = useState(false);
    

  
  /** Dependencias observadas */
  const dependValues = useMemo(
    () => dependsOn.map((dep: string) => formValues?.[dep]),
    [dependsOn.map((dep: string) => formValues?.[dep]).join("_")]
  );

  /** Construye URL completa */
  const buildUrl = useMemo(()=> {
    return (reset = false) => {
      let url = buildUrlWithDepends(endpoint, dependsOn, queryKeys, formValues);
      if (isSearch && inputValue && searchFields.length) {
        const params = new URLSearchParams();
        searchFields.forEach((field: any) => params.append(field, inputValue));
        url += `${url.includes("?") ? "&" : "?"}${params.toString()}`;
      }
      url += `${url.includes("?") ? "&" : "?"}page=${reset ? 1 : page}`;
      return url;
    };
  },[endpoint, inputValue, isSearch, page, dependsOn, queryKeys, searchFields, formValues]);

  /** Fetch de items */
  const fetchItems = useCallback(
    async (reset = false) => {
      if (!endpoint) return;
      const url = buildUrl(reset);
      try {
        setLoading(true);
        const response: any = await fetchData({ endpoint: url, method: "GET", isLoading: false });
        const results = Array.isArray(response?.data || response.results)
          ? (response.data || response.results)
          : Array.isArray(response)
          ? response
          : [];
        
        if (inputValue && results.length === 0 && !reset) return;

        setItems((prev) => {
          const combined = reset ? results : [...prev, ...results];
          const unique = Array.from(new Map(combined.map((obj: any) => [obj[valueKey], obj])).values());
          return getItemWithObject(unique);
        });

        const nextExists = Boolean(response?.next);
        setHasMore(nextExists);
        setPage((prev) => (reset ? 2 : nextExists ? prev + 1 : prev));
      } finally {
        setLoading(false);
      }
    },
    [buildUrl, endpoint] // , fetchData, inputValue
  );

  /** Asegura withObject al editar o ver */
  useEffect(() => {
    const withObjKey = item?.dataField?.withObject;
    const parentElement  = isFromSetElement && props?.name 
      ? getParentObject(formValues, props?.name) 
      : formValues;

    const tempObject = withObjKey 
      ? parentElement?.[withObjKey] 
      : undefined;
    if (tempObject) {
      itemObjectRef.current = tempObject;
      setItems((prev) => ensureItemWithObject(prev, tempObject, valueKey, nameKey, isWithCode));
      if (!value) {
        // Si no hay valor primario, seteamos desde withObject
        onChange?.(tempObject[valueKey]);
        onValueChange?.(valueKey, tempObject[valueKey]);
      }
    }
  }, [item?.dataField?.withObject, formValues]);

  /** Añade objeto temporal si aplica */
  const getItemWithObject = (finalItems: any[]) => {
    const tempObject = formValues?.[item?.dataField?.withObject] || itemObjectRef?.current;
    if (tempObject) {
      return ensureItemWithObject(finalItems, tempObject, valueKey, nameKey, isWithCode);
    }
    return finalItems;
  };

  /** Re-fetch al cambiar dependencias */
  useEffect(() => {
    if (!dependsOn.length) return;

    setItems([]);
    setPage(1);
    setHasMore(true);

    onChange?.(null);
    onValueChange?.(valueKey, null);

    if (dependValues.every((v: any) => v != null && v !== "")) {
      fetchItems(true);
    }
  }, [dependValues.join("_")]);

  /** Búsqueda local + remota */
  useEffect(() => {
    if (!isSearch  || !focused) return;
    if(!inputValue.trim()) return;
    handleTimerRef.current = setTimeout(() => {
      if (focused) fetchItems(true);
    }, 1000);
    return () => clearTimeout(handleTimerRef.current);
  }, [inputValue, focused, isSearch]); // , fetchItems 

  /** Prefetch al focus */
  const handleFocus = () => {
    setFocused(true);
    if (items.length === 0) fetchItems(true);
  };

  /** Valor seleccionado (objeto completo para MUI) */
  const selectedValue = useMemo(
    () => items.find((i) => i[valueKey] === value) || null,
    [value, items, valueKey]
  );

  /** Estilo de fondo cuando es view */
  const viewBackground = mode === "view" ? { backgroundColor: "rgba(232, 236, 238, 2)" } : {};

  return (
    <Grid>
      {isDisabled ? (
        <>
          {item?.label && <Typography className="form-label" sx={item?.styleLabel}>{item?.label}</Typography>}
            <Input
              value={`${isWithCode ? (selectedValue?.code+" -" ) : ""} ${capitalizeFirstLetter(resolveDisplayName(selectedValue, nameKey))}`}
              fullWidth
              size="small"
              className="input"
              readOnly
              disableUnderline
              disabled={isDisabled}
            />
        </>) : (
          <FormControl fullWidth className="select" disabled={isDisabled} >
        {item?.label && (
          <Typography className="form-label" sx={item?.styleLabel}>
            {item?.label}
          </Typography>
        )}

        <Autocomplete
          className="autocomplete-input"
          fullWidth
          options={items}
          value={selectedValue}
          getOptionLabel={(option: any) =>
          isWithCode
              ? `${option?.code ?? ""} - ${capitalizeFirstLetter(resolveDisplayName(option, nameKey))}`
              : capitalizeFirstLetter(resolveDisplayName(option, nameKey))
          }
          renderOption={(props, option) => (
            <li {...props} key={option.id }>{
              isWithCode
              ? `${option?.code ?? ""} - ${capitalizeFirstLetter(resolveDisplayName(option, nameKey))}`
              : capitalizeFirstLetter(resolveDisplayName(option, nameKey))
            }</li>
          )}
          isOptionEqualToValue={(option, value) => option.value === value.value} // 👈 define cómo comparar
          filterOptions={(options, params) => {
            const input = params.inputValue.toLowerCase();
            return options.filter((opt) =>{              
              const nameMatch = resolveDisplayName(opt, nameKey).toLowerCase().includes(input);
              const codeMatch = isWithCode ? (opt.code?.toString().toLowerCase() || "").includes(input) : false;
              return nameMatch || codeMatch;
            });
          }}
          onChange={(_, val) => {
            const valueToSet = val?.[valueKey] ?? null;
            onChange?.(valueToSet);
            onValueChange?.(valueKey, valueToSet);
          }}
          onInputChange={(_, val) => setInputValue(val)}
          onFocus={handleFocus}
          loading={loading}
          open={open}
          onOpen={() =>  setOpen(true) }
          onClose={() => setOpen(false) }
          disabled={isDisabled}
          popupIcon={ <IconArrowBottom style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.5s ease-in-out",
            }} />  
          }
          ListboxProps={{
            onScroll: (event: any) => {
              const bottom = event.target.scrollHeight - event.target.scrollTop <= event.target.clientHeight + 50;        
              if (bottom && hasMore && !loading) fetchItems(false);
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={viewBackground}
              className="input"
              placeholder={item?.props?.placeholder || item?.label || ""}
              size="small"
              disabled={isDisabled}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading && <CircularProgress color="inherit" size={18} sx={{ marginRight: "11.5px" }} />}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          noOptionsText={
            <Typography color="text.secondary" fontSize={13}>
              No se encontraron datos
            </Typography>
          }
        />
      </FormControl>
        )  
        }

      
    </Grid>
  );
};

export default AutocompleteDynamicField;
