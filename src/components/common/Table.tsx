import { DataGrid, GridColDef } from "@mui/x-data-grid";
interface propsType {
  columns: GridColDef[];
  rows: any;
}
const Table = (props: propsType) => {
  return (
    <div style={{ width: "100%" }}>
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
    </div>
  );
};

export default Table;
