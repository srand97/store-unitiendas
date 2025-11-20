import * as yup from "yup";
import { Card, SelectChangeEvent, SxProps, Theme } from "@mui/material";
import { ChangeEvent, ReactNode } from "react";

/**
 * @property value -> este es un valor numerico incrementable inicializado en 0
 */
type TypeElement =
  | "text"
  | "number"
  | "date"
  | "time"
  | "password"
  | "email"
  | "textarea"
  | "file"
  | "phone";

export interface ISize {
  sm: number;
  md?: number;
  lg?: number;
}

export interface IDataField {
  url: string;
  name?: string;
  value?: number | string;
  isLoading?: boolean;
  dependsOn?: string | string[];
  query?: string | string[];
  itemsPerPage?: number; // threshold
  isPaginated? : boolean; // infiniteScroll
  limit?: number;
  withObject?: string;
  isWithCode?: boolean;
}
export interface IItemsPagination {
  url: string;
  idKey?: string;
  nameKey?: number | string;
}
export interface IElementln {
  props: TypeProps;
  label: string;
  size: ISize;
  title?: string;
  styleLabel?: React.CSSProperties;
  class?: string;
  showAdvertence?: boolean;
  dataField?: IDataField;
  // Permite lógica condicional para mostrar/ocultar campos
  visible?: (values: any) => boolean;
}
interface propBase {
  placeholder?: string;
  disabled?: boolean;
  name: string;
  onMouseEnter?: (e: any) => void;
  value?: string;
  items?: any[];
  dependences?: {
    name: string;
    action?: string;
    accessValue?: string;
    query?: string;
    accessId?: string;
  }[];
}

export interface Form {
  content: IElementln[];
}

export interface IContent<T extends yup.AnyObjectSchema = yup.AnyObjectSchema> {
  form?: {
    content: IElementln[];
  };
  initialValues: yup.InferType<T>;
  validationSchema: T;
}

export interface IStepper {
  activeStep: number;
  setActiveStep: (value: number) => void;
  isStepper: boolean;
  child?: IContent[];
  onSubmit: (value: any, resetForm: any) => void;
  editValues?: object;
  isEdit: boolean;
  setIsEdit?: any;
}

export interface CardOption {
  label: string;
  value: string;
  icon: ReactNode;
}

// Tipo para el evento de cambio genérico
type FormChangeEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | SelectChangeEvent<any>
  | React.ChangeEvent<{ value: unknown }>
  | string
  | boolean
  | number;

// Tipo para la función onChange personalizada
type CustomOnChangeHandler = (
  e: FormChangeEvent,
  setValue: (name: string, value: any) => void,
  formValues: Record<string, any>
) => void;

interface propBase {
  placeholder?: string;
  disabled?: boolean;
  name: string;
  sx?: SxProps<Theme> | undefined;
  onChange?: CustomOnChangeHandler;
}

interface Select extends propBase {
  items: any[];
    showLabel?: boolean;
  diferent: "SELECT";
  onSelected?: (e: any) => Promise<void> | void;
  dependences?: any;
}


interface Autocomplete extends propBase {
  items: any[];
    showLabel?: boolean;
  diferent: "SELECT_AUTOCOMPLETE";
  onSelected?: (e: any) => Promise<void> | void;
  dependences?: any;
}

interface Check extends propBase {
  diferent: "CHECKBOX";
  text: string;
}

interface CheckList extends propBase {
  diferent: "CHECKBOX_LIST";
  items: any;
  dependences?: any;
  value?: any;
}

interface CheckListScroll extends propBase {
  diferent: "CHECKBOX_LIST_SCROLL";
  items: any;
  dependences?: any;
  value?: any;
}

interface Input extends propBase {
  autoComplete?: string | undefined;
  type: TypeElement;
  diferent: "INPUT";
  showForgetPassword?: boolean;
}

interface TextEnricher extends propBase {
  diferent: "TEXT_ENRICHER";
  maxLength?: number;
  style?: React.CSSProperties | SxProps<Theme>;
}

interface Title extends propBase {
  diferent: "TITLE";
  description?: string;
  divider?: boolean;
}
interface Radio extends propBase {
  diferent: "RADIO";
  items: any;
}
interface SetElement extends propBase {
  diferent: "SETELEMENTS";
  items: IElementln[];
  descriptionAdd?: string;
  buttonAddText?: string;
}

interface File extends propBase {
  type: TypeElement;
  diferent: "FILE";
  accept: string;
  weight: string | number;
  multiple: boolean;
}

interface TextDisplay extends propBase {
  diferent: "TEXT_DISPLAY";
  showOnly?: string;
  readOnly?: string | boolean;
}

interface Card extends propBase {
  diferent: "CARD";
  items: CardOption[];
}
interface CustomChild extends propBase {
  diferent: "CUSTOM_CHILD";
  component?: React.ReactNode;
}

interface CheckboxOptions extends propBase {
  diferent: "CHECKBOX_OPTIONS";
  minOptions?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  allowMultiple?: boolean;
  items: Array<{
    text: string;
    value: string;
    isCorrect: boolean;
    inputValue: string;
  }>;
}

interface MatchingPairs extends propBase {
  diferent: "MATCHING_PAIRS";
  minPairs?: number;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  items: Array<{
    element_a: string;
    element_b: string;
  }>;
}

export type TypeProps =
  | Check
  | CheckList
  | Select
  | Input
  | TextEnricher
  | Title
  | SetElement
  | Radio
  | File
  | TextDisplay
  | Card
  | CustomChild
  | CheckboxOptions
  | MatchingPairs
  | CheckListScroll
  | Autocomplete
