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
import Grid from "@mui/material/Grid2";
import IconCheckedSquare from "@/assets/icons/IconCheckedSquare";
import IconCheckSquare from "@/assets/icons/IconCheckSquare";
import { useFetch } from "@/hooks/useFetch";
import { Controller, useFormContext } from "react-hook-form";
// import { useAlertStore } from "@/store/alertStore";

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
    onChange?: (e: any, setValue?: (name: string, value: any) => void, formValues?: any) => void;
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
  const [items, setItems] = useState<Item[]>(props.items || []);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { fetchData } = useFetch<any>();
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevParamsRef = useRef<string>("");
  const initialLoadDone = useRef<boolean>(false);
  // const {showAlert} = useAlertStore();
  
  const formValues = watch();

  const dependsOn = dataField?.dependsOn;
  const dependsFields = Array.isArray(dependsOn)
    ? dependsOn.filter(Boolean)
    : [dependsOn].filter(Boolean);

  const queryParams = dataField?.query || dependsFields;

  const dependsValues = dependsFields.map((field) => (field ? formValues[field] : undefined));

  const params =
    isEdit && !initialLoadDone.current
      ? ""
      : dependsFields
          .map((field, idx) => {
            const paramName = Array.isArray(queryParams) ? queryParams[idx] || field : queryParams;

            const value = dependsValues[idx];

            if (value == null || value === "") return null;
            const formattedValue = Array.isArray(value)
              ? value.map((v) => encodeURIComponent(v)).join(",")
              : encodeURIComponent(value);

            return `${paramName}=${formattedValue}`;
          })
          .filter(Boolean)
          .join("&");

  const getUrlWithDependence = useCallback(() => {
    if (!dataField?.url) return "";
    return params ? `${dataField.url}?${params}` : dataField.url;
  }, [dataField?.url, params]);
  const currentValue = field?.value || props.value || [];

  const selectedNames = useMemo(() => {
    if (!items?.length) return [];
    const currentIds = Array.isArray(currentValue) ? currentValue : [];
    return items.filter((item) => currentIds.includes(item.id)).map((item) => item.name);
  }, [items, JSON.stringify(currentValue)]);

  const isChecked = (id: number) => {
    return Array.isArray(currentValue) && currentValue.includes(id);
  };

  const getBoxShadow = (id: number) => {
    return isChecked(id) ? "0 0 0 1px #5947ff, 0 0 0 2px #9e4efe" : "";
  };

  const handleFetchItems = useCallback(async () => {
    setIsLoading(true);
    const url = getUrlWithDependence();
    if (!url) {
      setItems(props.items || []);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    try {
      setError(null);
      const response = await fetchData({
        endpoint: url,
        method: "GET",
        // isLoading: dataField?.isLoading,
      });

      const data = response.data || response.results || response;
      if (Array.isArray(data)) {
        const newItems = data.map((itemSelect: any) => ({
          id: getNestedValue(itemSelect, dataField?.value || "id") || itemSelect.id || itemSelect.value,
          name: getNestedValue(itemSelect, dataField?.name || "name") || itemSelect.name || itemSelect.label,
        }));
        setItems(newItems);
        prevParamsRef.current = params;
        initialLoadDone.current = true;
      } else {
        setError("No se encontraron resultados");
        setItems(props.items || []);
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        console.error(`Error fetching data for ${props.name}:`, error);
        setError("Error al cargar los datos");
        setItems(props.items || []);
      }
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  }, [dataField?.url, params, getUrlWithDependence]);

  useEffect(() => {
    if (getUrlWithDependence() && items.length === 0) {
      const timer = setTimeout(
        () => {
          handleFetchItems();
        },
        isEdit && !initialLoadDone.current ? 0 : 300
      );
      return () => clearTimeout(timer);
    }
  }, [getUrlWithDependence()]);

  useEffect(() => {
    if (initialLoadDone.current && dependsFields.length > 0) {
      const urlChanged = prevParamsRef.current !== params;
      if (urlChanged) {
        // Limpiar los valores seleccionados cuando cambian las dependencias
        setItems([]);
        field?.onChange?.([]);
        props?.onSelected?.([]);
        
        // Si hay un onChange en las props, llamarlo para notificar el cambio
        if (props?.onChange) {
          props.onChange([], setFormValue, formValues);
        }
        
        const timer = setTimeout(() => {
          handleFetchItems();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [...dependsValues]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  if (typeof props?.visible === "function" && !props?.visible(formValues)) {
    return null;
  }

  // Function to handle delete when unchecking and item has id and dataField
/*   const handleDeleteItem = async (id: number) => {
    if (!dataField?.url || !id) return;
    try {
      await fetchData({
        endpoint: `${dataField.url}/${id}/`,
        method: "DELETE",
      });
    } catch (error: any) {
      // Optionally handle error
      console.error(`Error deleting item with id ${id}:`, error);
    }
  }; */

  const handleChange = (id: number) => {
    let newValue: number[] = [];
    const isCurrentlyChecked = Array.isArray(currentValue) && currentValue.includes(id);
    if (Array.isArray(currentValue)) {
      if (isCurrentlyChecked) {
        newValue = currentValue.filter((valueItem) => valueItem !== id);
        // If item has id and dataField, send delete request
      /*   if (id && dataField) {
          handleDeleteItem(id);
        } */
      } else {
        newValue = [...currentValue, id];
      }
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
                // <Typography color="error">{error}</Typography>
                <Box className="descriptionCheckList" sx={{ display: "flex", justifyContent: "start", py: 3 }}>
                  <Typography color="grey">{error}</Typography>
                </Box>
              ) : isLoading ? (
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
                <Grid container className="GridContainerCheckList" spacing={2}>
                  {items.map((item,index) => (
                    <Grid
                      size={{ xs: 12, sm: 12, md: 6 }}
                      key={`${item.id}-${index}`}
                      sx={{
                        label: {
                          padding: "0px 15px 0px 10px",
                          span: {
                            input: {
                              display: "none",
                            },
                          },
                        },
                      }}
                    >
                      <FormControl component="fieldset" sx={{ width: "-webkit-fill-available" }}>
                        <FormControlLabel
                          className="checkbox_list"
                          sx={{
                            boxShadow: getBoxShadow(item.id),
                          }}
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
              ): (
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
                        sx={{
                          backgroundColor: "#e3f2fd",
                          color: "var(--colorIndigo)",
                        }}
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

// Utilidad para acceder a propiedades anidadas tipo 'subject.name'
const getNestedValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
};

export default CheckBoxList;
