import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  Skeleton,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import IconCheckedSquare from "@/assets/icon/IconCheckedSquare";
import IconCheckSquare from "@/assets/icon/IconCheckSquare";
import { useFetch } from "@/hooks/useFetch";
import { Controller, useFormContext } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";

interface Item {
  id: any;
  name: string;
  description?: string;
  ordering_number?: number;
}

interface CheckBoxListProps {
  props: {
    value?: number[];
    name: string;
    items?: Item[];
    onSelected?: (value: number[]) => void;
    onChange?: (
      e: any,
      setValue?: (name: string, value: any) => void,
      formValues?: any
    ) => void;
    dependsOn?: string | string[];
    diferent?: string;
    visible?: (formValues: any) => boolean;
    showAdvertence?: boolean;
  };
  field?: {
    value?: number[];
    onChange?: (value: any) => void;
  };
  disabled?: boolean;
  dataField?: {
    url: string;
    value: string;
    name: string;
    isLoading?: boolean;
    dependsOn?: string | string[];
    query?: string | string[];
    isPaginated?: boolean;
    itemsPerPage?: number;
  };
  errors?: any;
  control?: any;
  isEdit?: boolean;
}

const CheckBoxList = ({
  props,
  field,
  disabled,
  dataField,
  errors,
  control,
  isEdit,
}: CheckBoxListProps) => {
  const { watch, setValue: setFormValue } = useFormContext();
  const { fetchData } = useFetch<any>();

  const [items, setItems] = useState<Item[]>(props.items || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevParamsRef = useRef<string>("");
  const initialLoadDone = useRef<boolean>(false);
  const loadingNextPageRef = useRef(false);

  const formValues = watch();
    // refs para scroll sin recrear listeners
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);
  useEffect(() => {
    isLoadingRef.current = isLoading;
    hasMoreRef.current = hasMore;
  }, [isLoading, hasMore]);

  // ---- depends/query ----
  const dependsOn = dataField?.dependsOn;
  const dependsFields = Array.isArray(dependsOn)
    ? dependsOn.filter(Boolean)
    : [dependsOn].filter(Boolean);

  const queryParams = dataField?.query || dependsFields;
  const dependsValues = dependsFields.map((f) => (f ? formValues[f] : undefined));

  const params = useMemo(() => {
    return isEdit && !initialLoadDone.current
      ? ""
      : dependsFields
          .map((fieldName, idx) => {
            const paramName = Array.isArray(queryParams)
              ? (queryParams[idx] as string) || (fieldName as string)
              : (queryParams as string);
            const value = dependsValues[idx];
            if (value == null || value === "") return null;
            const formattedValue = Array.isArray(value)
              ? value.map((v) => encodeURIComponent(v)).join(",")
              : encodeURIComponent(value);
            return `${paramName}=${formattedValue}`;
          })
          .filter(Boolean)
          .join("&");
  }, [isEdit, dependsFields, queryParams, dependsValues]);

  const baseUrl = useMemo(() => {
    if (!dataField?.url) return "";
    return params ? `${dataField.url}?${params}` : dataField.url;
  }, [dataField?.url, params]);

  // ---- selección ----
  const currentValue = field?.value || props.value || [];

  const selectedNames = useMemo(() => {
    if (!items?.length) return [];
    const currentIds = Array.isArray(currentValue) ? currentValue : [];
    return items.filter((it) => currentIds.includes(it.id)).map((it) => it.name);
  }, [items, JSON.stringify(currentValue)]);

  const isChecked = (id: number) =>
    Array.isArray(currentValue) && currentValue.includes(id);

  const getBoxShadow = (id: number) =>
    isChecked(id) ? "0 0 0 1px #5947ff, 0 0 0 2px #9e4efe" : "";

  // ---- fetch ----
  const handleFetchItems = useCallback(
    async (resetPage = false) => {
      if (isLoadingRef.current || loadingNextPageRef.current) return;
      if (!baseUrl) {
        setItems(props.items || []);
        return;
      }

      if (resetPage) {
        setPage(1);
        setItems([]);
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      loadingNextPageRef.current = true;

      try {
        setIsLoading(true);
        setError(null);

        const endpoint = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}page=${
          resetPage ? 1 : page
        }`;
        const response = await fetchData({
          endpoint,
          method: "GET",
          signal: abortControllerRef.current.signal,
        });

        const data = response?.data || response?.results || response;
        if (Array.isArray(data)) {
          const mapped: Item[] = data.map((row: any) => ({
            id: getNestedValue(row, dataField?.value || "id") ?? row.id ?? row.value,
            name:
              getNestedValue(row, dataField?.name || "name") ??
              row.name ??
              row.label,
          }));

          setItems((prev) => {
            const merged = resetPage || page === 1 ? mapped : [...prev, ...mapped];
            const seen = new Set<string>();
            return merged.filter((it) => {
              const k = String(it.id);
              if (seen.has(k)) return false;
              seen.add(k);
              return true;
            });
          });

          // hasMore detection
          let nextHasMore: boolean;
          if (typeof response?.total_pages === "number") {
            nextHasMore = (resetPage ? 1 : page) < response.total_pages;
          } else if ("next" in (response || {})) {
            nextHasMore = Boolean(response?.next);
          } else {
            nextHasMore = mapped.length > 0;
          }
          setHasMore(nextHasMore);

          if (page === 1 || resetPage) {
            prevParamsRef.current = params;
            initialLoadDone.current = true;
          }
        } else {
          setError("No se encontraron resultados");
          if (resetPage) setItems([]);
          setHasMore(false);
        }
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          console.error(`Error fetching data for ${props.name}:`, err);
          setError("Error al cargar los datos");
          if (page > 1) setHasMore(false);
        }
      } finally {
        abortControllerRef.current = null;
        setIsLoading(false);
        loadingNextPageRef.current = false;
      }
    },
    [baseUrl, page,   params, fetchData]
  );

  // ---- efectos controlados ----
  useEffect(() => {
    if (!baseUrl) {
       if (props.items?.length) setItems(props.items || []);
      return;
    }
    if (!initialLoadDone.current) {
      handleFetchItems(true); // carga inicial sólo una vez
    }
  }, [baseUrl]); // , handleFetchItems, props.items

  useEffect(() => {
    if (initialLoadDone.current && dependsFields.length > 0) {
      const urlChanged = prevParamsRef.current !== params;
      if (urlChanged) {
        handleFetchItems(true); // reset y refetch sólo si cambian dependencias
        field?.onChange?.([]);
        props?.onSelected?.([]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dependsValues)]);
  useEffect(() => {
    if (page > 1) {
        handleFetchItems();
    }
  }, [page, handleFetchItems]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // scroll infinito
  useEffect(() => {
    const container =  containerRef.current;
    if (!container) return;
    const infiniteEnabled = dataField?.isPaginated !== false;
    const itemsPerPage = dataField?.itemsPerPage ?? 200;
    
    const handleScroll = () => {
      if (!infiniteEnabled || isLoadingRef.current || !hasMoreRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight - scrollTop - clientHeight <= itemsPerPage) {
        setPage((p) => p + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore, dataField?.isPaginated]); //  

  if (typeof props?.visible === "function" && !props?.visible(formValues)) {
    return null;
  }

  const handleChange = (id: number) => {
    let newValue: number[] = [];
    const isCurrentlyChecked =
      Array.isArray(currentValue) && currentValue.includes(id);
    if (Array.isArray(currentValue)) {
      newValue = isCurrentlyChecked
        ? currentValue.filter((v) => v !== id)
        : [...currentValue, id];
    } else {
      newValue = [id];
    }
    field?.onChange?.(newValue);
    props?.onSelected?.(newValue);
    props?.onChange?.(newValue, setFormValue, formValues);
  };
  return (
    <Controller
      name={props.name}
      control={control}
      render={() => (
        <>
        
          <Grid container spacing={2} sx={{ width: "-webkit-fill-available" }}>
            <Grid size={6}>
              {error ? (
                 <Box className="descriptionCheckList" sx={{ display: "flex", justifyContent: "start", py: 3 }}>
                    <Typography color="grey">{error}</Typography>
                  </Box>
                // <Typography color="error">{error}</Typography>
              ) : isLoading && page === 1 ? (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={"100%"}
                  height={"220px"}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "var(--backgroundGlass)",
                    backdropFilter: "blur(30px)",
                  }}
                />
              ) : items?.length ? (
                <div
                  
                  // style={{
                  //   maxHeight: "215px",
                  //   minHeight: "210px",
                  //   overflowY: "auto",
                  //   paddingRight: "8px",
                  // }}
                >
                  <Grid container className="GridContainerCheckList" spacing={2} ref={containerRef}
                  id={"scroll_"+props.name}>
                    {items.map((item) => (
                      <Grid
                        size={{ xs: 12, sm: 12, md: 6 }}
                        key={String(item.id)}
                        sx={{
                          label: {
                            padding: "0px 15px 0px 10px",
                            span: { input: { display: "none" } },
                          },
                        }}
                      >
                        <FormControl component="fieldset" sx={{ width: "-webkit-fill-available" }}>
                          <FormControlLabel
                            className="checkbox_list"
                            sx={{ boxShadow: getBoxShadow(item.id) }}
                            control={
                              <Checkbox
                                icon={<IconCheckSquare />}
                                checkedIcon={<IconCheckedSquare />}
                                checked={isChecked(item.id)}
                                onChange={() => handleChange(item.id)}
                                name={props.name}
                                disabled={disabled}
                              />
                            }
                            label={
                              <span
                                style={{
                                  display: "inline-block",
                                  maxWidth: 240,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle",
                                }}
                              >
                                {item.name}
                              </span>
                            }
                          />
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>

                  {isLoading && page > 1 && (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                      <CircularProgress size={24} />
                    </Box>
                  )}
                </div>
              ) : (
                <div>
                    <Box className="descriptionCheckList" sx={{ display: "flex", justifyContent: "start", py: 3 }}>
                      <Typography color="grey">No se encontraron datos</Typography>
                   </Box>
                </div>
              )}
            </Grid>

            <Grid size={6}>
              <Box className="descriptionCheckList">
                <Typography className="size20" gutterBottom>
                  Opciones seleccionadas:
                </Typography>

                {selectedNames.length > 0 ? (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {selectedNames.map((name, index) => (
                      <Chip
                        className="size12"
                        key={index}
                        label={name}
                        sx={{ backgroundColor: "#e3f2fd", color: "var(--colorIndigo)" }}
                      />
                    ))}
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No hay opciones seleccionadas
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>

          {errors && errors[props.name] && (
            <Typography color="error" variant="body2">
              {errors[props.name].message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};

export default CheckBoxList;
