import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import { ModuleTypes, setFilterByName } from "../../redux/slice/ModuleSlice";

const SearchKeyword = () => {
  const dispatch = useDispatch();

  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const [searchData, setSearchData] = useState<ModuleTypes[]>([]);
  const modulaData: ModuleTypes[] = useSelector(
    (state: rootState) => state.module.data
  );
  const result = modulaData?.filter((data) =>
    data.name.includes(searchKeyWord)
  );
  useEffect(() => {
    if (modulaData.length > 0) {
      setSearchData(result);
    }
  }, [modulaData, searchKeyWord]);

  dispatch(setFilterByName(searchData));
  return (
    <div>
      <TextField
        id="outlined-basic"
        placeholder="Search here..."
        variant="outlined"
        onChange={(e) => setSearchKeyWord(e.target.value)}
        size="small"
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
