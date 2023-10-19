import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ResponseModuleTypes } from "../../interface/moduleInterface";
import { useEffect, useState } from "react";

interface PropsType {
  moduleData: ResponseModuleTypes[];
  handleSetModuleData: (data: ResponseModuleTypes[]) => void;
}
const SearchKeyword = (props: PropsType) => {
  const [findModuleData, setFindModuleData] = useState<ResponseModuleTypes[]>(
    []
  );
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");

  const searchList = findModuleData.filter(
    (data) =>
      data.name
        .toLocaleLowerCase()
        .indexOf(searchKeyWord.toLocaleLowerCase()) !== -1
  );

  useEffect(() => {
    if (props.moduleData.length > 0) {
      setFindModuleData(props.moduleData);
    }
  }, [props.moduleData]);

  useEffect(() => {
    if (searchKeyWord.trim() === "") {
    } else {
      // props.handleSetModuleData(searchList);
      console.log(`searchList =>`, searchList);
    }
  }, [searchList]);

  // props.handleSetModuleData(searchList);
  // Search
  // const searchValue = findModuleData.filter((data) =>
  //   data.name.includes(searchKeyWord)
  // );

  // useEffect(() => {
  //   if (searchKeyWord.trim() === "") {
  //     props.handleSetModuleData(props.moduleData);
  //   } else {
  //     props.handleSetModuleData(searchList);
  //   }
  // }, [searchKeyWord]);

  return (
    <div>
      <TextField
        id="outlined-basic"
        placeholder="Search here..."
        variant="outlined"
        size="small"
        onChange={(e) => setSearchKeyWord(e.target.value)}
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
