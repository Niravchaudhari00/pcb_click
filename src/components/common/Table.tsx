import { Box, Skeleton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface propsType {
  columns: GridColDef[];
  rows: any;
  loading?: boolean;
}
const Table = (props: propsType) => {
  return (
    <div style={{ width: "100%" }}>
      {props.loading ? (
        props.rows.map((_: any, i: number) => (
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
          }}
          rows={props.rows}
          columns={props.columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      )}
    </div>
  );
};

export default Table;
