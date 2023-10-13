import { DataGrid, GridColDef, GridDeleteIcon } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { rootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { blue, red } from "@mui/material/colors";
import ConfirmModal from "./ConfirmModal";

export interface ConfirmModalType {
  title: string;
  description: string;
  cancelBtnText: string;
  confirmBtnText: string;
  onDelete: () => number;
  onCancle: () => void;
}

interface ModuleTypes {
  created_by: null;
  id: number;
  created_time: string | null;
  modified_by: number;
  modified_time: string;
  name: string;
  status: number;
}

export default function DataTable({
  setValue,
}: {
  setValue: (edit: boolean, expanded: boolean, value?: ModuleTypes) => void;
}) {
  const [confirmModalData, setConfirmModalData] =
    useState<ConfirmModalType | null>(null);
  const [showData, setShowData] = useState<ModuleTypes[]>([]);

  const moduleData: ModuleTypes[] = useSelector(
    (state: rootState) => state.module.data
  );

  useEffect(() => {
    if (moduleData?.length > 0) {
      setShowData(moduleData);
    }
  }, [moduleData]);

  // handle update
  const handleUpdate = (props: any) => {
    // console.log(props.row);
    setValue(true, true, props.row);
  };

  // Handle Delete
  const handleDelete = (props: any) => {
    const id: number = props.row.id;
    setConfirmModalData({
      title: "Confirm action",
      description: "Are you sure you want to confirm this action?",
      cancelBtnText: "No",
      confirmBtnText: "Confirm",
      onCancle() {
        setConfirmModalData(null);
      },
      onDelete() {
        return id;
      },
    });
  };

  // Table
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      headerAlign: "left",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 5,
    },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: false,
      flex: 1,
      renderCell: (props) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleUpdate(props)}
              sx={{ color: blue[900] }}
            >
              <ModeEditOutlineIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(props)}>
              <GridDeleteIcon sx={{ color: red[900] }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        sx={{
          display: "flex",
          userSelect: "none",
          paddingX: 1,
        }}
        rows={showData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50, 100]}
      />

      {confirmModalData && <ConfirmModal modalData={confirmModalData} />}
    </div>
  );
}
