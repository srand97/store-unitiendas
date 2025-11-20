import { Box } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

import "./search.scss";

interface SearchProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Search = ({ placeholder, value, onChange, className }: SearchProps) => {
  return (
    <Box className={`${className} search`}>
      <input type="text" placeholder={placeholder} value={value} onChange={onChange} />
      <SearchOutlined sx={{ color: "#A5BEC3" }} />
    </Box>
  );
};

export default Search;
