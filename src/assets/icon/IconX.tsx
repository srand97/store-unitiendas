export const IconX = ({ color = "#A1A1A1", width = "22", height = "22" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
    >
      <path d="M20 4.5L4 20.5M20 20.5L4 4.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
