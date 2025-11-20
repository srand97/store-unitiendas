import { useCallback, useEffect, useRef, useState } from "react";
import CustomElementIn from "./CustomElementIn";
import { useFetch } from "@/hooks/useFetch";
import { Controller, useFormContext } from "react-hook-form";
import {
  resolveDisplayName,
  ensureItemWithObject,
  mergeItemsWithPlaceholder,
  getValueByPath,
} from "@/utils/formatters";
import { IElementln } from "@/interfaces/formDynamic";

const getNestedValue = (obj: any, path: string) => {
  return getValueByPath(obj, path); //path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

interface ICustomHandleForm {
  item: IElementln;
  index: number;
  control: any;
  errors: any;
  setValue: (name: string, value: any) => void;
  disabled?: boolean;
  customName?: string;
  isEdit?: boolean;
}

const CustomHandleForm = ({
  item,
  index,
  control,
  errors,
  setValue,
  disabled,
  customName,
  isEdit,
}: ICustomHandleForm) => {
  const [items, setItems] = useState<any[]>(item?.props?.items || []);
  const itemObjectRef = useRef<any>(null);
  
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastPage, setLastPage] = useState<number | string>();
  const [loading, setLoading] = useState(false);

  const { fetchData } = useFetch();
  const { watch } = useFormContext();
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevParamsRef = useRef<string>("");
  const initialLoadDone = useRef<boolean>(false);

  const formValues = watch();

  // -------- params de dependencias --------
  const dependsOn = item?.dataField?.dependsOn;
  const dependsFields = Array.isArray(dependsOn) ? dependsOn : [dependsOn].filter(Boolean);
  const queryParams = item?.dataField?.query || dependsFields;
  const dependsValues = dependsFields.map((field) => (field ? formValues[field] : undefined));

  
  const params =
    dependsFields.length === 0
      ? ""
      : dependsFields
          .map((field, idx) => {
            const paramName = Array.isArray(queryParams) ? queryParams[idx] || field : queryParams;
            const value = dependsValues[idx];
            if (value == null || value === "") return null;
            return `${paramName}=${encodeURIComponent(value)}`;
          })
          .filter(Boolean)
          .join("&");

  const getUrlWithDependence = useCallback(
    (pageParam = page) => {
      if (!item?.dataField?.url) return "";
      const base = params ? `${item.dataField.url}?${params}` : item.dataField.url;
      return `${base}${params ? "&" : "?"}page=${pageParam}`; // &limit=${item?.dataField?.limit || 20}
    },
    [item?.dataField?.url, params, page]
  );

  
    useEffect(() => {         
      const withObjKey = item?.dataField?.withObject;
      const tempObject = withObjKey ? formValues?.[withObjKey] : undefined;
      if (!withObjKey || !tempObject) return; 
      itemObjectRef.current = { ...tempObject };
      setItems((prev) => ensureItemWithObject(
        prev,
        tempObject,
        item?.dataField?.value?.toString() || "id",
        item?.dataField?.name || "name",
        item?.dataField?.isWithCode ?? false,

      ));
    }, [item?.dataField?.withObject, JSON.stringify(item?.dataField?.withObject ? formValues?.[item?.dataField?.withObject] : undefined)]);

  const getItemWithObject = (finalItems:any[])=>{
    if (item?.dataField?.withObject) {
      const tempObject = formValues?.[item.dataField.withObject] || itemObjectRef?.current;
      if (tempObject) {
        return ensureItemWithObject(
          finalItems,
          tempObject,
          item?.dataField?.value?.toString() || "id",
          item?.dataField?.name || "name",
          item?.dataField?.isWithCode ?? false,
        );
      }
    }
    return finalItems;
  }
  // -------- fetch con paginación --------
  const handleFetchItems = useCallback(
    async (reset = false, isMore=false) => {
      const url = getUrlWithDependence(reset ? 1 : page);      

      // control to abort
      if (!url) return;      
      if(!hasMore && !isMore) return
      if(lastPage == page && params == url) return;

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();
      setLoading(true);

      try {
        setError(null);
        const response = await fetchData({
          endpoint: url,
          method: "GET",
          isLoading: item?.dataField?.isLoading || true,
        });

        const data = response.data || response.results;
        const next = response.next ?? null; // 👈 el campo real que indica si hay más
      
        if(next==null){
          setLastPage(page+1);
        }        
        prevParamsRef.current =  params;
        if (Array.isArray(data)) {
          const newItems = data.map((itemSelect: any) => ({
            value: getNestedValue(itemSelect, item?.dataField?.value?.toString() || "id"),
            name: resolveDisplayName(itemSelect, item?.dataField?.name || "name"),
            code: item?.dataField?.isWithCode ?  itemSelect?.code : undefined ,
          }));

          setItems((prev) => {//(reset ? newItems : [...prev, ...newItems])
            const finalItems = reset ? newItems : [...prev, ...newItems];
            const unique = finalItems.filter(
                  (item, index, self) =>
                    index === self.findIndex((t) => t.value === item.value)
                );
            return getItemWithObject([...unique]);
          });
          setHasMore(next?true:false); // 👈 ahora depende del campo `next`
          // setHasMore(data.length >= (item?.dataField?.limit || 20));

          initialLoadDone.current = true;
          if (reset) setPage(2);
          else setPage(() => page + 1);
        } else {           
          setHasMore(false);
        }
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setError("Error al cargar los datos");
        }
      } finally {
        abortControllerRef.current = null;
        setLoading(false);
      }
    },
    [item?.dataField?.url, params, page, getUrlWithDependence]
  );



  // -------- carga inicial --------
  useEffect(() => {
    const isSelect = item?.props?.diferent === "SELECT";
    const hasUrl = getUrlWithDependence();
    const hasDependencies = dependsFields.length > 0;
    const dependenciesComplete = hasDependencies ? dependsValues.every(val => val != null && val !== "") : true;
    
    if (isSelect && hasUrl && items.length === 0 && dependenciesComplete) {     
      handleFetchItems(true);
    }
  }, [item?.props?.diferent, getUrlWithDependence(), ...dependsValues]);

  // -------- cambios en dependencias --------
  useEffect(() => {
    if (initialLoadDone.current && dependsFields.length > 0) { 
      const urlChanged = prevParamsRef.current !== params;
      if (urlChanged) {
        // Decidir limpieza según si las dependencias están completas
        const dependenciesComplete = dependsFields.length > 0
          ? dependsValues.every(val => val != null && val !== "")
          : true;

        if (!dependenciesComplete) {
          setItems([]);
          setValue(item.props?.name, "");
        } else {
          // No vaciar items por completo: inyectar placeholder del valor actual para evitar que el SELECT se vea vacío
          const withObjKey = item?.dataField?.withObject;
          const obj = withObjKey ? (formValues?.[withObjKey] || itemObjectRef?.current) : null;
          const currentVal = formValues?.[item?.props?.name];
          if (obj && currentVal != null && currentVal !== "") {
            setItems(
              mergeItemsWithPlaceholder(
                [],
                obj,
                item?.dataField?.value?.toString() || "id",
                item?.dataField?.name || "name",
                currentVal
              )
            );
          } else {
            // Si no hay objeto, mantener items actuales para no perder visibilidad del valor
          }
        }
        handleFetchItems(true, true);
      }
    }
  }, [params, ...dependsValues]);

  // -------- limpiar --------
  useEffect(() => {
    return () => {
      initialLoadDone.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // -------- observer para scroll infinito --------
  const observerRef = useRef<HTMLDivElement | null>(null);
  const menuRootRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {    
    if (!open || !observerRef.current || !menuRootRef.current || loading || !hasMore) return;

    const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        handleFetchItems(); // tu paginación
      }
    },
    {
      root: menuRootRef.current,    // 👈 clave: el Paper del menú
      rootMargin: "0px 0px 200px 0px",
      threshold: 0,                 // 👈 dispara apenas aparezca
    }
  );

  const el = observerRef.current;
  io.observe(el);
  return () => {
    io.unobserve(el);
    io.disconnect();
  };
  }, [open, loading, hasMore, handleFetchItems]);

  // -------- render --------
  if (typeof item?.visible === "function") {
    if (!item?.visible(formValues)) {
      return null;
    }
  }

  return (
    <Controller
      name={item?.props?.name || ""}
      control={control}
      render={({ field }) => (
        <>
          <CustomElementIn
            item={item}
            showAdvertence={item?.showAdvertence}
            props={{
              ...item?.props,
              items,
              error,              
              value: field?.value,
              onChange: (e: any) => {
                field?.onChange(e);
                if (item?.props?.onChange) {
                  item?.props.onChange(e, setValue, formValues);
                }              
              },
            }}
            label={item?.label}
            title={item?.title}
            styleLabel={item?.styleLabel}
            size={item?.size}
            key={`form${index}`}
            disabled={disabled}
            errorsCustom={errors}
            customName={customName}
            isEdit={isEdit}
            observerRef={observerRef} 
            menuRootRef={menuRootRef}
            handleFetchItems={handleFetchItems}
          />
          
          {/* {loading && <p>Cargando más...</p>} */}
        </>
      )}
    />
  );
};


export default CustomHandleForm;
