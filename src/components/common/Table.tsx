import { Box, Skeleton } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridOverlay,
  GridSortModel,
} from "@mui/x-data-grid";
import { PaginationModel } from "../core/module/Module";
import { useState } from "react";
interface propsType {
  columns: GridColDef[];
  rows: any;
  loading?: boolean;
  page?: PaginationModel;
  sortModel?: GridSortModel | undefined;
  handlePaginationModel: any;
  handleSortModelChange: any;
  rowCount?: number;
}

const NoDataFound = () => {
  return (
    <GridOverlay>
      <div className="w-[100vw] flex justify-center items-center">
        <p className="font-bold text-xl capitalize">no data available</p>
      </div>
    </GridOverlay>
  );
};
const Table = (props: any) => {
  const {
    columns,
    rows,
    loading,
    page,

    rowCount,
    handlePaginationModel = () => {},
    handleSortModelChange = () => {},
  } = props;

  const [sortModel, setSortModel] = useState<GridSortModel>();
  const handlChangeSortModel = (model: GridSortModel) => {
    console.log("model: ", model);
    setSortModel(model);
    handleSortModelChange(model);
  };
  return (
    <div className="w-[500px] md:w-[768px] lg:w-full">
      {loading ? (
        rows.map((_: any, i: number) => (
          <Box key={i} sx={{ mx: "auto", width: "100%" }}>
            <Skeleton height={50} animation="pulse" />
          </Box>
        ))
      ) : (
        <DataGrid
          sx={{
            display: "flex",
            userSelect: "none",
            paddingX: 1,
            border: "none",
          }}
          rowCount={rowCount}
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10, 20, 50, 100]}
          slots={{
            noRowsOverlay: NoDataFound,
          }}
          paginationModel={page}
          onPaginationModelChange={(newPage) =>
            handlePaginationModel && handlePaginationModel(newPage)
          }
          sortModel={sortModel}
          onSortModelChange={(newSortModel) =>
            handlChangeSortModel(newSortModel)
          }
        />
      )}
    </div>
  );
};

export default Table;
