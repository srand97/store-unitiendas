import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Typography, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// IMPORTADOS
import CustomHandleForm from "./CustomHandleForm";
import { MainButton } from "../mainButton/MainButton";
import { IElementln } from "@/interfaces/formDynamic";

interface IForm<T extends yup.AnyObjectSchema = yup.AnyObjectSchema> {
  name?: string;
  form: IElementln[];
  onSubmit: (value: yup.InferType<T>, resetForm: () => void) => void;
  onCancel?: () => void;
  loading?: boolean;
  textSubmit?: string;
  colorSubmit?: string;
  validationSchema: T;
  initialValues: yup.InferType<T>;
  editValues?: Partial<yup.InferType<T>>;
  isEdit?: boolean;
  setIsEdit?: (value: boolean) => void;
  showCancel?: boolean;
  showSubmit?: boolean;
  disabled?: boolean;
  styleSubmit?: any;
  isCard?: boolean;
}

const CustomForm = ({
  name,
  form,
  onSubmit,
  onCancel,
  loading,
  textSubmit = "Guardar",
  colorSubmit = "var(--colorIndigo)",
  validationSchema,
  initialValues,
  editValues,
  isEdit = false,
  setIsEdit,
  showCancel = false,
  showSubmit = true,
  disabled = false,
  styleSubmit,
  isCard = true,
}: IForm) => {
  const methods = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = methods;

  useEffect(() => {
    if (isEdit && editValues) {
      reset(editValues);
    } else {
      reset(initialValues);
    }
  }, [isEdit, editValues]);

  if (!form) {
    return null;
  }

  // FUNCION BOTON CANCELAR
  const handleCancel = () => {
    if (onCancel) onCancel();
    if (setIsEdit) setIsEdit(false);
    reset(initialValues);
  };

  const onFormSubmit = (data: any) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key in initialValues)
    );
    onSubmit(filteredData, reset);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit((data) => {
            onFormSubmit(data);
          })}
        >
          <Box
            sx={{
              display: "grid",
              gap: "24px",
            }}
          >
            {/*************************/}
            {/* NOMBRE DEL FORMULARIO */}
            {/*************************/}
            {name && (
              <Typography className="size25" sx={{ fontWeight: 700 }}>
                {name}
              </Typography>
            )}

            {/*********/}
            {/* CARTA */}
            {/*********/}

            <Box className={isCard ? "formCard" : ""}>
              <Grid container spacing={3}>
                {form.map((item, index) => {
                  if (!item.props) {
                    return null;
                  }
                  return (
                    <CustomHandleForm
                      key={`${item}-${index}`}
                      index={index}
                      item={item}
                      control={control}
                      errors={errors}
                      setValue={setValue}
                      disabled={disabled || loading}
                      isEdit={isEdit}
                    />
                  );
                })}
              </Grid>
            </Box>

            {/****************************/}
            {/* BOTONES CANCELAR/GUARDAR */}
            {/****************************/}
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: 2,
              }}
            >
              {showCancel && (
                <MainButton
                  onClick={handleCancel}
                  text={disabled ? "Volver" : "Cancelar"}
                  className="btnBack"
                />
              )}
              {showSubmit && !disabled && (
                <MainButton
                  text={loading ? "Cargando..." : isEdit ? "Editar" : textSubmit}
                  sx={{
                    ...styleSubmit,
                    background: colorSubmit,
                    width: !showCancel ? "100%" : "fit-content",
                    opacity: disabled ? 0.5 : 1,
                    color: disabled ? "var(--colorWhite)" : "inherit",
                  }}
                  type="submit"
                  disabled={disabled}
                />
              )}
            </Box>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};

export default CustomForm;
