import React from "react";
import {
  Box,
  Checkbox,
  Input,
  Button,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Controller } from "react-hook-form";
import IconAdd from "@/assets/icons/IconAdd";
import { IconDelete } from "@/assets/icons/IconDelete";
import IconCheckSquare from "@/assets/icons/IconCheckSquare";
import IconCheckedSquare from "@/assets/icons/IconCheckedSquare";
import { ISize } from "@/interfaces/formDynamic";
import "./checkboxOptions.scss";
import { useAlertStore } from "@/store/alertStore";
import { useFetch } from "@/hooks/useFetch";
interface CheckboxOptionsProps {
  size: ISize;
  control: any;
  errors: any;
  disabled?: boolean;
  fieldName: string;
  props: any;
  dataField?:any;
}

const CheckboxOptions: React.FC<CheckboxOptionsProps> = ({
  size,
  control,
  errors,
  disabled = false,
  fieldName,
  props,
  dataField,
}) => {
  const fieldError = errors[fieldName];
  const showError = fieldError?.message;

  const {showAlert} = useAlertStore();
  const { fetchData } = useFetch<any>();

  return (
    <Grid size={size}>
      {props.label && <Typography className="form-label">{props.label}</Typography>}
      <Controller
        name={fieldName}
        control={control}
        render={({ field }) => {
          const currentItems = field.value || props.items;

          const handleAddOption = () => {
            const newItems = [...currentItems];
            newItems.push({
              text: `${props.placeholder || "Opción"} ${newItems.length + 1}`,
              value: `option_${newItems.length + 1}`,
              isCorrect: false,
              inputValue: ""
            });
            field.onChange(newItems);
          };

          const handleDeleteOption = (index: number) => {
            const newItems = [...currentItems];
            const item = newItems[index]; 
            if(item?.id && dataField?.url){
              showAlert({
                type: "confirmation",
                onConfirm: async () => {
                  if(item.id){
                   const response = await fetchData({
                      endpoint: `${dataField.url}${item.id}/`,
                      method: "DELETE",
                    });
                    if(response?.success){
                      newItems.splice(index, 1);
                      field.onChange(newItems);
                      showAlert({ title: "Éxito", message: "Dato eliminado correctamente", type: "success" });
                    }else{
                      showAlert({ title: "Error", message: "Error al eliminar la opcion", type: "error" });
                    }
                  }
                },
                cancelName: "Cancelar",
                confirmName: "Aceptar",
                title: "¿Eliminar?",
                message: "¿Estás seguro de que deseas eliminar esta opcion?",
              });
            }else{
              newItems.splice(index, 1);
              field.onChange(newItems);
            }
          };

          const handleCheckboxChange = (index: number, checked: boolean) => {
            const newItems = [...currentItems];
            if (!props.allowMultiple) {
              newItems.forEach((item, i) => {
                if (i !== index) {
                  item.isCorrect = false;
                }
              });
            }
            newItems[index] = {
              ...newItems[index],
              isCorrect: checked
            };
            field.onChange(newItems);
          };

          const handleInputChange = (index: number, inputValue: string) => {
            const newItems = [...currentItems];
            newItems[index] = {
              ...newItems[index],
              inputValue
            };
            field.onChange(newItems);
          };

          return (
            <Box className="checkbox-options">
              {props.showAddButton && (
                <Box className="add-button-container">
                  <Button
                    startIcon={<IconAdd color="white" />}
                    onClick={handleAddOption}
                    variant="contained"
                    color="primary"
                    className="add-button"
                  >
                    Agregar respuesta
                  </Button>
                </Box>
              )}
              
              <Grid container spacing={2}>
                {currentItems?.map((option: any, index: number) => (
                  <Grid key={index} size={{ xs: 12, md: 6 }}>
                    <Box 
                      // onClick={() => handleCheckboxChange(index, !option.isCorrect)}
                      className="option-container"
                    >
                      <Box className="checkbox-container" onClick={() => handleCheckboxChange(index, !option.isCorrect)}>
                        <Checkbox
                          checked={option.isCorrect}
                          onChange={(e) => {
                            e.stopPropagation();
                            // handleCheckboxChange(index, e.target.checked);
                          }}
                          disabled={disabled}
                          icon={<IconCheckSquare />}
                          checkedIcon={<IconCheckedSquare />}
                          className="checkbox"
                          disableRipple                          
                        />
                      </Box>
                      
                      <Input
                        value={option.inputValue}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleInputChange(index, e.target.value);
                        }}
                        placeholder={`${props.placeholder || "Opción"} ${index + 1}`}
                        disabled={disabled}
                        disableUnderline
                        className="option-input"
                      />
                      
                      {props.showDeleteButton && index >= (props.minOptions || 2) && (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteOption(index);
                          }}
                          variant="contained"
                          className="delete-button"
                        >
                          <IconDelete />
                        </Button>
                      )}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        }}
      />
      {typeof showError === "string" && (
        <Typography className="form-error">{showError}</Typography>
      )}
    </Grid>
  );
};

export default CheckboxOptions; 