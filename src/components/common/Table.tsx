import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ResponseModuleTypes } from "../../interface/moduleInterface";
interface propsType {
  columns: GridColDef[];
  rows: ResponseModuleTypes[];
}
const Table = (props: propsType) => {
  return (
    <div style={{ height: 650, width: "100%" }}>
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
