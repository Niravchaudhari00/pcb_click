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
import {
  getPermissionData,
  permissionUpdate,
  permissionUpdateAll,
} from "../../../redux/slice/PermissionSlice";
import { GridColDef } from "@mui/x-data-grid";
import Table from "../../common/Table";
import { getRoleData } from "../../../redux/slice/RoleSlice";
import LoadingBar from "../../common/LoadingBar";
import SearchKeyword from "../../common/SearchKeyword";

export interface PermissionPayloadType {
  role_id: number;
  module_id: number;
  permission_delete?: number;
  permission_read?: number;
  permission_update?: number;
  permission_write?: number;
}

export interface AllPermissionUpdate {
  role_id: number;
  type: string;
  value: number;
}

const Permission = () => {
  const dispatch = useAppDispatch();
  const [selectedRoleId, setSelectedRoleId] = useState<number>(4);
  const [permissionDataRows, setPermissionRows] = useState<
    ResponsePermissionType[]
  >([]);

  const [selectRole, setSelectRole] = useState<ResponseRoleType[]>([]);
  const [updateAllPermission, setUpdateAllPermission] = useState<
    AllPermissionUpdate | undefined
  >();

  // get state in slice
  const { permissionData, loading, updateLoading } = useSelector(
    (state: rootState) => state.permission
  );

  // get role
  const { roleData } = useSelector((state: rootState) => state.role);
  const [permission, setPermission] = useState<any | undefined>();

  const [globalPermission, setGlobalPermission] = useState({
    permission_write: 0,
    permission_delete: 0,
    permission_update: 0,
    permission_read: 0,
  });

  // Get Permission Data
  useEffect(() => {
    dispatch(getPermissionData(selectedRoleId));
  }, [selectedRoleId]);

  // Get Role
  useEffect(() => {
    dispatch(getRoleData());
  }, []);

  const handleSetPermissionData = (data: ResponsePermissionType[]) => {
    setPermissionRows(data);
  };

  // set permission data in state
  useEffect(() => {
    if (permissionData.length > 0) handleSetPermissionData(permissionData);
  }, [permissionData]);

  // set role
  useEffect(() => {
    if (roleData.length > 0) setSelectRole(roleData);
  }, [roleData]);

  // permission
  useEffect(() => {
    if (permission !== undefined) dispatch(permissionUpdate(permission));
  }, [permission]);

  // update all permission
  useEffect(() => {
    if (updateAllPermission) dispatch(permissionUpdateAll(updateAllPermission));
  }, [updateAllPermission]);

  const handleChangeRoleId = (event: any) => {
    const id = event.target.value;
    if (id) setSelectedRoleId((prev) => (prev = id));
  };

  // ++++++++++++ Operations ++++++++++++++

  const handleGivenPermissionAll = (
    newValue: boolean,
    type: string,
    role_id: number
  ) => {
    const value = newValue ? 1 : 0;
    const newPD = permissionDataRows.map((data) => {
      let xyz: any = { ...data };
      xyz[type] = value;
      return xyz;
    });

    setPermissionRows(newPD);

    const permissionAllUpdatePayload = {
      role_id: role_id,
      type: type.split("_")[1],
      value: value,
    };

    setUpdateAllPermission(permissionAllUpdatePayload);
  };

  const handleGivenPermission = (params: any, fieldName: string) => {
    let xyz = { ...params.row };
    let fieldNameUpdatedValue = xyz[fieldName] === 1 ? 0 : 1;
    xyz[fieldName] = fieldNameUpdatedValue;

    const upatePermissionPayload = {
      module_id: xyz.module_id,
      role_id: xyz.role_id,
      permission_read: xyz.permission_read,
      permission_delete: xyz.permission_delete,
      permission_update: xyz.permission_update,
      permission_write: xyz.permission_write,
    };
    setPermission(upatePermissionPayload);
  };

  useEffect(() => {
    permissionAllCheckedOrNot();
  }, [permissionDataRows]);

  // handle permissionAllCheckedOrNot
  const permissionAllCheckedOrNot = () => {
    let permission_read = 1;
    let permission_write = 1;
    let permission_update = 1;
    let permission_delete = 1;

    permissionDataRows.map((data) => {
      if (data.permission_read === 0) {
        permission_read = 0;
      }
      if (data.permission_update === 0) {
        permission_update = 0;
      }
      if (data.permission_write === 0) {
        permission_write = 0;
      }
      if (data.permission_delete === 0) {
        permission_delete = 0;
      }
    });

    setGlobalPermission({
      permission_delete,
      permission_read,
      permission_update,
      permission_write,
    });
  };

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
            <Checkbox
              checked={
                permissionDataRows.length > 0 &&
                Boolean(globalPermission.permission_read)
              }
              onClick={(e: any) =>
                handleGivenPermissionAll(
                  e.target.checked,
                  "permission_read",
                  selectedRoleId
                )
              }
            />
            <label htmlFor="" className="font-bold">
              Read
            </label>
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <Checkbox
              checked={!!params.row.permission_read}
              onClick={() => {
                handleGivenPermission(params, "permission_read");
              }}
            />
          </Box>
        );
      },
    },
    {
      field: "permission_write",
      headerName: "Add",

      disableColumnMenu: true,
      sortable: false,
      renderHeader: () => {
        return (
          <Box>
            <Checkbox
              checked={
                permissionDataRows.length > 0 &&
                Boolean(globalPermission.permission_write)
              }
              onClick={(e: any) =>
                handleGivenPermissionAll(
                  e.target.checked,
                  "permission_write",
                  selectedRoleId
                )
              }
            />
            <label htmlFor="" className="font-bold">
              Add
            </label>
          </Box>
        );
      },
      flex: 5,
      renderCell: (params) => {
        return (
          <Box>
            <Checkbox
              checked={!!params.row.permission_write}
              onClick={() => {
                handleGivenPermission(params, "permission_write");
              }}
            />
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
      renderHeader: () => {
        return (
          <Box>
            <Checkbox
              checked={
                permissionDataRows.length > 0 &&
                Boolean(globalPermission.permission_update)
              }
              onClick={(e: any) =>
                handleGivenPermissionAll(
                  e.target.checked,
                  "permission_update",
                  selectedRoleId
                )
              }
            />
            <label htmlFor="" className="font-bold">
              Update
            </label>
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <Checkbox
              checked={!!params.row.permission_update}
              onClick={() => {
                handleGivenPermission(params, "permission_update");
              }}
            />
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
      renderHeader: () => {
        return (
          <Box>
            <Checkbox
              checked={
                permissionDataRows.length > 0 &&
                Boolean(globalPermission.permission_delete)
              }
              onClick={(e: any) =>
                handleGivenPermissionAll(
                  e.target.checked,
                  "permission_delete",
                  selectedRoleId
                )
              }
            />
            <label htmlFor="" className="font-bold">
              Delete
            </label>
          </Box>
        );
      },
      renderCell: (params) => {
        return (
          <Box>
            <Checkbox
              checked={!!params.row.permission_delete}
              onClick={() => {
                handleGivenPermission(params, "permission_delete");
              }}
            />
          </Box>
        );
      },
    },
  ];

  // log
  return (
    <div>
      <LoadingBar loading={updateLoading} />
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
            <SearchKeyword
              moduleData={permissionData}
              handleSetModuleData={handleSetPermissionData}
            />
            {/* Add Button when you click open form  */}
          </Box>
        </Box>
        <Table columns={columns} rows={permissionDataRows} loading={loading} />
      </Container>
    </div>
  );
};

export default Permission;
