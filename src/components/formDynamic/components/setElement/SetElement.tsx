import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Fragment } from "react";
import CustomHandleForm from "../../CustomHandleForm";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAlertStore } from "@/store/alertStore";
import { Controller, useFieldArray } from "react-hook-form";

interface Props {
  size: any;
  control: any;
  setValue: any;
  errors: any;
  disabled?: boolean;
  fieldName: string;
  props: any;
  isEdit?: boolean;
}
const SetElement = ({
  size,
  control,
  setValue,
  errors,
  disabled,
  fieldName,
  props,
  isEdit,
}: Props) => {
  const { showAlert } = useAlertStore();
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldName,
  });

  const createNewSectionObject = (items: any): Record<string, any> => {
    const newObject: Record<string, any> = {};
    items
      .forEach((item: any) => {
        if (item.props.diferent === "CHECKBOX_OPTIONS") {
          // Para CHECKBOX_OPTIONS, creamos un nuevo array de opciones
          newObject[item.props.name] = item.props.items.map((option: any) => ({
            ...option,
            isCorrect: false,
            inputValue: option.inputValue || ""
          }));
        } else {
          newObject[item.props.name] = item.props.defaultValue ?? "";
        }
      });
    return newObject;
  };
  const AddSectionButton = ({ props, disabled, items, append }: any) => (
    <Box
      className="backgroundGlass"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "8px",
        width: "100%",
      }}
    >
      <Typography className="size12" sx={{ color: "var(--colorGrey)" }}>
        {props.props?.descriptionAdd || "Descripción"}
      </Typography>
      <Button
        disableRipple
        startIcon={<AddIcon />}
        className="btn-blue backgroundGlass size16"
        onClick={() => {
          const newObject: Record<string, any> = createNewSectionObject(items);
          append(newObject);
        }}
        disabled={disabled}
        sx={{
          width: "100%",
          textTransform: "initial",
          color: "var(--colorIndigo)",
          height: "45px",
          borderRadius: "8px !important",
        }}
      >
        {props.props?.buttonAddText || "Agregar"}
      </Button>
    </Box>
  );

  const deleteElement = (index: number) => {
    remove(index);
  };

  return (
    <Grid size={size}>
      <Grid container spacing={2}>
        {fields.map((item: any, index: any) => (
          <Grid container size={size} spacing={2} key={item.id} className="formCard">
            

            {props.items
              .map((nestedItem: any, nestedIndex: any) => {
                const fieldPath = `${fieldName}.${index}.${nestedItem.props.name}`;
                return (
                  <Fragment key={`${nestedItem.props.name}-${nestedIndex}`}>
                    <Controller
                      control={control}
                      name={fieldPath}
                      render={({ field }) => {
                        return (
                          <CustomHandleForm
                            key={fieldPath}
                            index={index}
                            control={control}
                            item={{
                              ...nestedItem,
                              props: { 
                                ...nestedItem.props,
                                items: nestedItem.props.diferent === "CHECKBOX_OPTIONS" 
                                  ? field.value || nestedItem.props.items 
                                  : nestedItem.props.items,
                                ...field 
                              },
                            }}
                            setValue={setValue}
                            errors={errors[fieldName]?.[index]}
                            customName={nestedItem.props.name}
                            disabled={disabled}
                          />
                        );
                      }}
                    />
                  </Fragment>
                );
              })}

            {fields.length > 1 && (
              <Button
                disableRipple
                className="backgroundGlass size16 btn"
                onClick={() => {
                  showAlert({
                    type: "confirmation",
                    confirmName: "Si, Confirmar",
                    cancelName: "Cambié de parecer",
                    title: "Eliminar",
                    message: "¿Estás seguro que deseas eliminar esta sección?",
                    onConfirm: () => deleteElement(index),
                  });
                }}
                startIcon={<RemoveIcon sx={{ width: "16px", height: "16px" }} />}
                sx={{
                  width: "100%",
                  textTransform: "initial",
                  color: "var(--colorIndigo)",
                  mt: "16px",
                  height: "45px",
                  borderRadius: "8px !important",
                }}
              >
                Eliminar
              </Button>
            )}
          </Grid>
        ))}
        {!isEdit && (
          <AddSectionButton props={props} disabled={disabled} items={props.items} append={append} />
        )}
      </Grid>
    </Grid>
  );
};

export default SetElement;
