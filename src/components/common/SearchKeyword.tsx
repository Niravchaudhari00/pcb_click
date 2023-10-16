import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ResponseModuleTypes } from "../../interface/moduleInterface";
import { useEffect, useState } from "react";

const SearchKeyword = ({
  moduleData,
}: {
  moduleData: ResponseModuleTypes[];
}) => {
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const searchValue = moduleData.filter((data) =>
    data.name.includes(searchKeyWord)
  );

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
