import { Box, Skeleton } from "@mui/material";
import { DataGrid, GridColDef, GridOverlay } from "@mui/x-data-grid";
interface propsType {
  columns: GridColDef[];
  rows: any;
  loading?: boolean;
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
const Table = (props: propsType) => {
  const { columns, rows, loading } = props;
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
          rows={rows}
          columns={columns}
          autoHeight
          pagination
          pageSizeOptions={[5, 10, 20, 50, 100]}
          slots={{
            noRowsOverlay: NoDataFound,
          }}
          paginationMode="client"
          autoPageSize
        />
      )}
    </div>
  );
};

export default Table;
