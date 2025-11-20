export const IconUser = ({ color = "#F5F5F5", width = "22", height = "22" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M11 13.75C14.0376 13.75 16.5 11.2876 16.5 8.25C16.5 5.21243 14.0376 2.75 11 2.75C7.96243 2.75 5.5 5.21243 5.5 8.25C5.5 11.2876 7.96243 13.75 11 13.75Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 18.5625C4.41461 15.6862 7.43789 13.75 11 13.75C14.5621 13.75 17.5854 15.6862 19.25 18.5625"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
