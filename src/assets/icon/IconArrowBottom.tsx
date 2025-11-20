import React from "react";
interface IconArrowBottomProps {
    width?: string | number;
    height?: string |  number;
    color?: string;
    clase?: string;
    style?: any;
}
const IconArrowUp :React.FC<IconArrowBottomProps>=({
  width = 16,
  height = 16,
  color = "#000000",
  clase = "iconArrowUp",
  style,
}) => {
  return (
    <svg
      className={clase}
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      style={{ ...style, transform: "rotate(-90deg)" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.3538 12.6462C10.4002 12.6927 10.4371 12.7478 10.4622 12.8085C10.4874 12.8692 10.5003 12.9343 10.5003 13C10.5003 13.0657 10.4874 13.1307 10.4622 13.1914C10.4371 13.2521 10.4002 13.3073 10.3538 13.3537C10.3073 13.4002 10.2522 13.437 10.1915 13.4622C10.1308 13.4873 10.0657 13.5003 10 13.5003C9.93433 13.5003 9.86928 13.4873 9.80858 13.4622C9.74788 13.437 9.69273 13.4002 9.64628 13.3537L4.64628 8.35372C4.59979 8.30729 4.56291 8.25214 4.53775 8.19144C4.51259 8.13074 4.49963 8.06568 4.49963 7.99997C4.49963 7.93427 4.51259 7.8692 4.53775 7.8085C4.56291 7.7478 4.59979 7.69266 4.64628 7.64622L9.64628 2.64622C9.7401 2.5524 9.86735 2.49969 10 2.49969C10.1327 2.49969 10.26 2.5524 10.3538 2.64622C10.4476 2.74004 10.5003 2.86729 10.5003 2.99997C10.5003 3.13265 10.4476 3.2599 10.3538 3.35372L5.7069 7.99997L10.3538 12.6462Z"
        fill={color}
      />
    </svg>
  );
};

export default IconArrowUp;