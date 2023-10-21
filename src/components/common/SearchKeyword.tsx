import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";

interface PropsType {
  moduleData: any;
  handleSetModuleData: (data: any[]) => void;
}
const SearchKeyword = (props: PropsType) => {
  const { moduleData, handleSetModuleData } = props;

  const [searchText, setSearchText] = useState<string>("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setData(moduleData);
  }, [moduleData]);

  const searchData = useMemo(() => {
    if (!searchText) {
      return moduleData;
    } else {
      return data.filter((data) => {
        if (data.tbl_module !== undefined) {
          return data.tbl_module.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
        } else {
          return data.name.toLowerCase().includes(searchText.toLowerCase());
        }
      });
    }
  }, [searchText, data]);

  useEffect(() => {
    handleSetModuleData(searchData);
  }, [searchData]);

  return (
    <div>
      <TextField
        id="outlined-basic"
        placeholder="Search here..."
        variant="outlined"
        size="small"
        autoComplete={"false"}
        onChange={(e) => setSearchText(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchKeyword;
