import React, { useRef, useState, RefObject } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Typography,
  Grid,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import IconArrowBottom from "@/assets/icon/IconArrowBottom";
import InputDefault from "./components/inputDefault/InputDefault";
import InputFile from "./components/inputFile/InputFile";
import CheckBoxListScroll from "./components/checkBoxList/ChecBoxListScroll";
import IconCheckSquare from "@/assets/icon/IconCheckSquare";
import IconCheckedSquare from "@/assets/icon/IconCheckedSquare";
import { ISize, TypeProps } from "@/interfaces/formDynamic";
import "./style.scss";


interface Props {
  item?: any;
  props?: TypeProps | any;
  showAdvertence?: boolean;
  label: string;
  title?: string;
  styleLabel?: React.CSSProperties;
  size: ISize;
  name?: string;
  disabled?: boolean;
  errorsCustom?: any;
  customName?: string;
  isEdit?: boolean;
  observerRef?: RefObject<HTMLDivElement | null>;
  menuRootRef?: RefObject<HTMLDivElement | null>;
  handleFetchItems?: any;
}
const CustomElementIn = ({
  props,
  label,
  title,
  styleLabel,
  size,
  disabled,
  showAdvertence,
  name,
  item,
  errorsCustom,
  customName,
  isEdit,
  observerRef,
  menuRootRef,
  handleFetchItems,
}: Props) => {
  const inputRefDate = useRef<HTMLInputElement | null>(null);
  const inputRefTime = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const parentData = watch();

  const fieldName = props?.name || name;

  if (!fieldName) {
    return null;
  }
  const fieldError = errorsCustom ? errorsCustom[customName || fieldName] : errors[fieldName];
  const showError = fieldError?.message;

  const handleIconClickDate = () => {
    inputRefDate.current?.showPicker();
  };

  const handleIconClickTime = () => {
    inputRefTime.current?.showPicker();
  };

  const capitalizeFirstLetter = (value: any) => {
    if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  };

  switch (props.diferent) {
    case "INPUT": {
      const type = props?.type;
      if (["text", "number", "email", "password", "date", "time", "textarea"].includes(type)) {
        return (
          <Grid size={size}>
            {title && (
              <Typography
                className="form-title"
                sx={{ visibility: title === "Invisible" ? "hidden" : "visible" }}
              >
                {title}
              </Typography>
            )}
            {label && (
              <Typography className="form-label" sx={styleLabel}>
                {label}
              </Typography>
            )}
            <Controller
              name={fieldName}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <InputDefault
                  errorMessage={error?.message}
                  props={props}
                  disabled={disabled}
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  showAdvertence={showAdvertence}
                  showError={showError}
                  inputRef={
                    type === "date" ? inputRefDate : type === "time" ? inputRefTime : undefined
                  }
                  onIconClick={
                    type === "date"
                      ? handleIconClickDate
                      : type === "time"
                        ? handleIconClickTime
                        : undefined
                  }
                />
              )}
            />
            <Typography className="form-error">
              {typeof showError === "string" ? showError : ""}
            </Typography>
          </Grid>
        );
      }
      break;
    }

    case "SELECT": {
      if (disabled) {
        const currentValue = watch(fieldName);
        const currentItem = props.items?.find((item: any) => `${item.value}` === `${currentValue}`);
        const displayLabel = currentItem ? currentItem.name : currentValue;

        return (
          <Grid size={size}>
            {label && (
              <Typography className="form-label" sx={styleLabel}>
                {label}
              </Typography>
            )}
            <Input
              value={capitalizeFirstLetter(displayLabel)}
              fullWidth
              size="small"
              className="input"
              readOnly
              disableUnderline
              disabled={disabled}
            />
          </Grid>
        );
      } else {
        const { onSelected, error, ...restProps } = props;
        //console.log(fieldName, error);
        const currentValue = watch(fieldName);
        const isValidValue = props.items?.some(
          (item: any) => `${item.value}` === `${currentValue}`
        );

        return (
          <Grid size={size}>
            <FormControl fullWidth className="select" disabled={disabled || props?.disabled}>
              {label && (
                <Typography className="form-label" sx={styleLabel}>
                  {label}
                </Typography>
              )}
              <Controller
                name={fieldName}
                control={control}
                render={({ field }) => {
                  const isItems = props.items?.length > 0;
                  return (
                    <Select
                      disabled={disabled || props?.disabled}
                      className="input"
                      IconComponent={() => <IconArrowBottom height={14} width={14} />}
                      sx={{
                        padding: "0px 20px",
                        div: {
                          opacity: field.value ? "1" : "0.5",
                          color: "var(--colorBlack) !important",
                        },
                      }}
                      size="small"
                      onClick={(e: any) => {
                        if (disabled || props?.disabled) {
                          e.preventDefault();
                          return;
                        }
                        e.stopPropagation();
                        setOpen(!open);
                      }}
                      onClose={() => setOpen(false)}
                      onChange={(e) => {
                        const selectedValue = e.target?.value;

                        if (onSelected) {
                          onSelected(selectedValue);
                        }
                        if (props.dependences && Array.isArray(props.dependences)) {
                          props.dependences.forEach((dependence: any) => {
                            if (dependence) {
                              setValue(dependence, "");
                            }
                          });
                        }
                        field.onChange(e);
                      }}
                      value={isValidValue ? field.value : ""}
                      open={open}
                      displayEmpty
                      MenuProps={{
                        PaperProps: {
                          ref: menuRootRef,
                          sx: {
                            maxHeight: 320,
                            overflowY: "auto",
                            overflowX: "hidden",
                            zIndex: 20000,
                          },
                          onScroll: (e: React.UIEvent<HTMLDivElement>) => {
                            const t = e.currentTarget;
                            if (t.scrollTop + t.clientHeight >= t.scrollHeight - 10) {
                              handleFetchItems();
                            }
                          },
                        },
                        keepMounted: true,
                      }}
                    >
                      <MenuItem
                        value=""
                        hidden
                        disabled
                        style={{ display: !isItems ? "none" : "" }}
                      >
                        {restProps.placeholder || "Selecciona una opción"}
                      </MenuItem>
                      {props.items?.map((item: any, index: number) => (
                        <MenuItem
                          value={`${item.value}`}
                          key={index}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "100%",
                          }}
                        >
                          {item.code && <> {item.code} - </>}
                          {capitalizeFirstLetter(item.name)}
                        </MenuItem>
                      ))}

                      {props.items?.length === 0 && (
                        <MenuItem value={`no-data-${fieldName}`} key={`no-data-0`} disabled>
                          No se encontraron datos
                        </MenuItem>
                      )}
                      <MenuItem disabled style={{ display: "none" }}>
                        <div ref={observerRef || undefined} style={{ height: "2px" }} />
                      </MenuItem>
                    </Select>
                  );
                }}
              />
              {(error || showError) && (
                <Typography className="form-error">{error || showError}</Typography>
              )}
            </FormControl>
          </Grid>
        );
      }
    }

    case "TITLE": {
      return (
        <Grid size={size}>
          <Box className="section">
            <Typography className="size20 title">{label}</Typography>
            {props.description && (
              <Typography className="size12 description">{props.description}</Typography>
            )}
          </Box>
        </Grid>
      );
    }

    case "RADIO": {
      return (
        <Grid size={size}>
          <Typography className="form-label" sx={styleLabel}>
            {label}
          </Typography>
          <FormControl component="fieldset">
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <RadioGroup row aria-label={label} {...field}>
                  {props.items?.map((item: any, index: number) => (
                    <FormControlLabel
                      className="radioGroup"
                      key={`radio-${index}`}
                      value={item.value}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              )}
            />
          </FormControl>
          {typeof showError === "string" && (
            <Typography className="form-error">{showError}</Typography>
          )}
        </Grid>
      );
    }

    case "CHECKBOX": {
      return (
        <Grid size={size}>
          {label && (
            <Typography className="form-label" sx={styleLabel}>
              {label}
            </Typography>
          )}
          <FormControl
            component="fieldset"
            sx={{
              ...props?.sx,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={field.value || false}
                      onChange={(e) => field.onChange(e.target.checked)}
                      color="primary"
                      icon={<IconCheckSquare />}
                      checkedIcon={<IconCheckedSquare />}
                      sx={{ ":hover": { backgroundColor: "transparent" } }}
                      disabled={disabled}
                    />
                  }
                  sx={{
                    marginRight: "0px",
                    "& span": { paddingLeft: "0px" },
                  }}
                  label=""
                />
              )}
            />
            <Typography className="size16">{props.text}</Typography>
          </FormControl>
          {typeof showError === "string" && (
            <Typography className="form-error">{showError}</Typography>
          )}
        </Grid>
      );
    }

    case "CHECKBOX_LIST_SCROLL": {
      return (
        <Grid size={size}>
          {label && (
            <Typography className="form-label size14" sx={styleLabel}>
              {label}
            </Typography>
          )}
          <Grid container spacing={3}>
            <Controller
              name={fieldName}
              control={control}
              render={({ field }) => (
                <CheckBoxListScroll
                  dataField={item.dataField}
                  field={field.value || []}
                  props={props}
                  disabled={disabled}
                />
              )}
            />
          </Grid>
          {typeof showError === "string" && (
            <Typography className="form-error">{showError}</Typography>
          )}
        </Grid>
      );
    }

    case "FILE": {
      return (
        <Grid size={size}>
          {label && (
            <Typography className="form-label" sx={styleLabel}>
              {label}
            </Typography>
          )}
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <InputFile
                value={field.value}
                onChange={(files) => field.onChange(files)}
                disabled={disabled}
                accept={props.accept}
                multiple={props.multiple}
                maxFiles={props.maxFiles}
                maxFileSize={props.maxFileSize}
              />
            )}
          />
          {typeof showError === "string" && (
            <Typography className="form-error">{showError}</Typography>
          )}
        </Grid>
      );
    }

    case "CUSTOM_CHILD": {
      return (
        <>
          <Controller
            name={fieldName}
            control={control}
            defaultValue={[]}
            render={({ field }) => {
              return (
                <Grid size={size} key={"CUSTOM_CHILD_" + fieldName + props.name}>
                  {React.cloneElement(props.component, {
                    ...props.component.props,
                    ...field,
                    parentData,
                    isEdit,
                    disabled,
                  })}
                </Grid>
              );
            }}
          />
        </>
      );
    }

    default: {
      console.error(`Tipo de elemento no soportado: ${props.diferent}`);
      return null;
    }
  }
};

export default CustomElementIn;
