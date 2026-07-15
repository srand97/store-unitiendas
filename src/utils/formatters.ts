export const shortTextByCharacters = (text: string, length: number) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};

export const shortTextByWords = (text: string, wordCount: number) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length > wordCount ? words.slice(0, wordCount).join(" ") + "..." : text;
};

export const convertSecondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return { hours, minutes, secs };
};

// Formatea un valor numérico como peso colombiano: "$4.500" (sin decimales,
// punto como separador de miles, como se ve en cualquier tienda en Colombia).
export const formatCOP = (value: number | string | null | undefined): string => {
  const num = Number(value ?? 0);
  if (Number.isNaN(num)) return "$0";
  return `$${Math.round(num).toLocaleString("es-CO")}`;
};

// Dado un precio normal y uno con descuento, devuelve el precio que
// realmente se debe cobrar: el de descuento solo si existe y es menor.
export const getEffectivePrice = (
  normalPrice: number | string | null | undefined,
  priceDiscount?: number | string | null | undefined
): number => {
  const normal = Number(normalPrice ?? 0);
  const discount = Number(priceDiscount ?? 0);
  if (discount > 0 && discount < normal) return discount;
  return normal;
};

// True si hay un descuento real que valga la pena mostrar (precio con
// descuento existe y es estrictamente menor al precio normal).
export const hasRealDiscount = (
  normalPrice: number | string | null | undefined,
  priceDiscount?: number | string | null | undefined
): boolean => {
  const normal = Number(normalPrice ?? 0);
  const discount = Number(priceDiscount ?? 0);
  return discount > 0 && discount < normal;
};

export const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} bytes`;
  else if (bytes < 1048576) return `${(bytes / 1024).toFixed(2)} KB`;
  else if (bytes < 1073741824) return `${(bytes / 1048576).toFixed(2)} MB`;
  else return `${(bytes / 1073741824).toFixed(2)} GB`;
};

export function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1).toLocaleLowerCase();
}

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${year}-${month}-${day}`;
};

export const getValueByPath = ( obj: any, path:string)=>{
  /* 
    Examples:
    object.name
    object.other.id
    obeject.0.name
    
  */
  if(!path) return "";
  if(path?.includes(".")){
    try {
      const value = path
        .split('.')
        .reduce((acc, key) => {
          if (acc && acc[key] == null) return undefined;
          return acc?.[key];  
        } , obj)
      if (value == null) return "";
      
      if (typeof value === "object" && value !== null) {
        return "name" in value ? value.name ?? "" : "";
      }

      return value;
    } catch {
      return "";
    }
  }
  const value = obj?.[path];
  if (
    typeof value === "function" ||                // componente como función/clase
    (typeof value === "object" && value !== null && "$$typeof" in value) // React element
  ) {
    return value;
  }
  if (obj && obj?.[path] && typeof obj?.[path] === "object" && obj[path] !== null) {
    return "name" in obj[path] ? obj[path].name ?? "" : "";
  }
  return obj[path]
}

// Acceso seguro a propiedades anidadas tipo "a.b.c"
export const getNestedValue = (obj: any, path?: string) => {
  if (!path) return undefined;
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
};

// Resuelve un label mostrable tolerante:
// - Si namePath es "a.b" y solo existe "a" como string, usa ese string.
// - Si el valor es objeto, prioriza name/title/description.
export const resolveDisplayName = (source: any, namePath?: string): string => {
  try {
    if (!namePath) {
      if (source == null) return "";
      if (typeof source === "object") {
        if (typeof source.name === "string") return source.name;
        if (typeof source.title === "string") return source.title;
        if (typeof source.description === "string") return source.description;
      }
      return typeof source === "string" ? source : String(source ?? "");
    }
    let raw = getNestedValue(source, namePath);
    if (raw === undefined && namePath.includes('.')) {
      const firstKey = namePath.split('.')[0];
      const fallback = getNestedValue(source, firstKey);
      if (typeof fallback === 'string') return fallback;
      raw = fallback;
    }
    if (raw && typeof raw === 'object') {
      if (typeof raw.name === 'string') return raw.name;
      if (typeof raw.title === 'string') return raw.title;
      if (typeof raw.description === 'string') return raw.description;
    }
    return typeof raw === 'string' ? raw : String(raw ?? '');
  } catch {
    return "";
  }
};

// Asegura que un item derivado de un objeto (withObject) exista en la lista
export const ensureItemWithObject = (
  items: any[],
  obj: any,
  valuePath: string,
  namePath: string,
  isWithCode: boolean,
) => {
  const value = getNestedValue(obj, valuePath) ?? obj?.[valuePath] ?? obj?.id;
  const name = resolveDisplayName(obj, namePath);
  const exists = items.some((x: any) => `${x.value}` === `${value}`);
  if (!exists) return [...items, { value, name, code: isWithCode &&  obj?.code ? obj?.code : undefined }];
  return items;
};

// Genera una lista con placeholder del valor actual para no vaciar el SELECT
export const mergeItemsWithPlaceholder = (
  items: any[],
  obj: any,
  valuePath: string,
  namePath: string,
  currentVal: any
) => {
  if (!obj || currentVal == null || currentVal === "") return items;
  const value = getNestedValue(obj, valuePath) ?? obj?.[valuePath] ?? obj?.id;
  const name = resolveDisplayName(obj, namePath);
  return [{ value, name }];
};

export const getType = (file: any): string => {
    return file.type || `application/${file?.name?.split(".")?.pop()?.toLowerCase()}`;
  };

export const getTypeShort = (file: any): string => {
    const type = getType(file);
    return type.includes("/") ? type?.split("/")?.pop() || type : type;
  };


export  const getDisplayName = (file: any): string =>
    file instanceof File
      ? file.name
      : file?.original_name || file?.name || `Archivo ${file?.type?.split("/").pop()}`;

export  const getSizeMB = (file: any): string => {
  if (file.size) return (file.size / 1024 / 1024).toFixed(2);
  return "-";
};