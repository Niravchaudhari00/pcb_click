import {
  Box,
  Checkbox,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { rootState, useAppDispatch } from "../../../redux/store";
import {
  ResponsePermissionType,
  ResponseRoleType,
} from "../../../interface/responseInterface";
import { getPermissionData } from "../../../redux/slice/PermissionSlice";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../common/Table";
import { getRoleData } from "../../../redux/slice/RoleSlice";

export interface PermissionUpdateType {
  module_id: number;
  permission_delete: number;
  permission_read: number;
  permission_update: number;
  permission_write: number;
  role_id: number;
}

const Permission = () => {
  const dispatch = useAppDispatch();
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);
  const [permissionDataRows, setPermissionRows] = useState<
    ResponsePermissionType[]
  >([]);

  const [selectRole, setSelectRole] = useState<ResponseRoleType[]>([]);

  const { permissionData, loading } = useSelector(
    (state: rootState) => state.permission
  );

  // get role
  const { roleData } = useSelector((state: rootState) => state.role);
  const [readAll, setReadAll] = useState<number>(0);

  // Get Permission Data
  useEffect(() => {
    dispatch(getPermissionData(selectedRoleId));
  }, [selectedRoleId]);

  // Get Role
  useEffect(() => {
    dispatch(getRoleData());
  }, []);

  // set permission data in state
  useEffect(() => {
    if (permissionData.length > 0) {
      setPermissionRows(permissionData);
    }
  }, [permissionData]);

  // set role
  useEffect(() => {
    if (roleData.length > 0) {
      setSelectRole(roleData);
    }
  }, [roleData]);

  const handleChangeRoleId = (event: any) => {
    const id = event.target.value;
    if (id !== undefined) {
      setSelectedRoleId((prev) => (prev = id));
    }
  };

  // ++++++++++++ Operations ++++++++++++++

  const handlerReadAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const readAllchecked = event.target.checked ? 1 : 0;
    console.log(`readAllchecked`, readAllchecked);
  };

  const handleRead = (params: any) => {
    console.log(`params`, params.row);
  };

  // value getter
  const columns: GridColDef[] = [
    {
      field: "Module",
      headerName: "Module",
      width: 300,
      headerAlign: "left",
      disableColumnMenu: true,
      filterable: true,
      valueGetter(params) {
        return params.row.tbl_module.name;
      },
      renderCell: (params) => {
        return <>{params.row.tbl_module.name}</>;
      },
    },
    {
      field: "permission_read",
      headerName: "Read",
      disableColumnMenu: true,
      sortable: false,
      flex: 5,
      renderHeader: () => {
        return (
          <Box>
            <Checkbox onChange={handlerReadAll} />
            <label htmlFor="" className="font-bold">
              Read
            </label>
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <Checkbox checked={params.row} />
          </Box>
        );
      },
    },
    {
      field: "permission_write",
      headerName: "Add",

      disableColumnMenu: true,
      sortable: false,
      renderHeader: (params) => {
        return (
          <Box>
            <Checkbox />
            <label htmlFor="" className="font-bold">
              Add
            </label>
          </Box>
        );
      },
      flex: 5,
      renderCell: () => {
        return (
          <Box>
            <Checkbox />
          </Box>
        );
      },
    },
    {
      field: "permission_update",
      headerName: "Update",
      disableColumnMenu: true,
      sortable: false,
      flex: 5,
      renderHeader: (params) => {
        return (
          <Box>
            <Checkbox />
            <label htmlFor="" className="font-bold">
              Update
            </label>
          </Box>
        );
      },
      renderCell: () => {
        return (
          <Box>
            <Checkbox />
          </Box>
        );
      },
    },
    {
      field: "permission_delete",
      headerName: "Delete",
      disableColumnMenu: true,
      sortable: false,
      flex: 5,
      renderHeader: (params) => {
        return (
          <Box>
            <Checkbox />
            <label htmlFor="" className="font-bold">
              Delete
            </label>
          </Box>
        );
      },
      renderCell: () => {
        return (
          <Box>
            <Checkbox />
          </Box>
        );
      },
    },
  ];

  // log
  return (
    <div>
      <Container>
        <Box
          sx={{
            marginBottom: 3,
            display: "flex",
            justifyContent: "space-between",
            placeItems: "center",
            height: 100,
          }}
        >
          <Typography
            fontWeight="bold"
            variant="h5"
            sx={{ textTransform: "capitalize" }}
          >
            {location.pathname.split("/").join("")}
          </Typography>
          <Box width={300}>
            <FormControl fullWidth>
              <InputLabel id="select-role">Select Role</InputLabel>
              <Select
                value={selectedRoleId}
                label="Select Role"
                onChange={handleChangeRoleId}
                defaultChecked={selectedRoleId === 1}
              >
                {selectRole.length > 0 ? (
                  selectRole.map((roleItem) => (
                    <MenuItem
                      sx={{ paddingY: 1 }}
                      key={roleItem.id}
                      value={roleItem.id}
                    >
                      {roleItem.name}
                    </MenuItem>
                  ))
                ) : (
                  <Box></Box>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              placeItems: "center",
              gap: 3,
            }}
          >
            {/* <SearchKeyword moduleData={moduleDataRows} /> */}
            {/* Add Button when you click open form  */}
          </Box>
        </Box>
        <Table columns={columns} rows={permissionDataRows} loading={loading} />
      </Container>
    </div>
  );
};

export default Permission;
