import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import * as yup from "yup";
import { rootState, useAppDispatch } from "../../../redux/store";
import { getRoleData } from "../../../redux/slice/RoleSlice";
import { useSelector } from "react-redux";
import { ResponseRoleType } from "../../../interface/responseInterface";
import {
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import Table from "../../common/Table";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { blue, green, red } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import NotifyError from "../../common/NotifyError";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmModal, { ConfirmModalType } from "../../common/ConfirmModal";

interface RoleType {
  id?: number;
  role_name: string;
  level: number;
  same_level_edit?: number | boolean;
}

const schema = yup.object({
  role_name: yup.string().required(),
  level: yup.number().required(),
});

const Role = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [roleDataRows, setRoleDataRows] = useState<ResponseRoleType[]>([]);
  const [roleUpdateValue, setRoleUpdateValue] = useState<RoleType | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalType | null>(
    null
  );
  const [DeleteModuleId, setDeleteModuleId] = useState<number | null>(null);
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<RoleType>({ resolver: yupResolver(schema) });

  const { roleData, loading } = useSelector((state: rootState) => state.role);

  // Get Role
  useEffect(() => {
    dispatch(getRoleData());
  }, []);

  // Set value in state
  useEffect(() => {
    if (roleData.length > 0) {
      setRoleDataRows(roleData);
    }
  }, [roleData]);

  //
  useEffect(() => {
    if (isEdit) {
      if (roleUpdateValue !== null) {
        const value = !!roleUpdateValue.same_level_edit;
        setValue("role_name", roleUpdateValue.role_name);
        setValue("level", roleUpdateValue.level);
        setValue("same_level_edit", value);
      }
    }
  }, [roleUpdateValue]);

  const HandleAddAndCancel = (x: boolean) => {
    setExpanded(x);
    setIsEdit(false);
    reset();
  };

  // on submit handler
  const onSubmit: SubmitHandler<RoleType> = (data) => {
    console.log(data);
    reset();
  };

  // console.log("component run count =>", count);

  // operations delete update //

  const handleUpdate = (params: GridRenderCellParams) => {
    setRoleUpdateValue({
      id: params.row.id,
      level: params.row.level,
      same_level_edit: params.row.same_level_edit,
      role_name: params.row.name,
    });
    setExpanded(true);
    setIsEdit(true);
  };

  const handleDelete = (params: GridRenderCellParams) => {
    setConfirmModal({
      title: "Confirm action",
      description: "Are you sure you want to confirm this action?",
      btnCancelTxt: "Cancel",
      btnConfirmTxt: "Confirm",
      cancelHandler: () => {
        setConfirmModal(null);
      },
      confirmHandler: () => {
        setDeleteModuleId(params.row.id);
        setConfirmModal(null);
      },
    });
  };

  // Gride Data table field
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 50,
      headerAlign: "left",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "same_level_edit",
      headerName: "Same Level Edit",
      disableColumnMenu: true,
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            {params.row.same_level_edit === 1 ? (
              <CheckCircleIcon sx={{ color: green[500] }} />
            ) : (
              <CancelIcon sx={{ color: red[500] }} />
            )}
          </Box>
        );
      },
    },
    {
      field: "level",
      headerName: "Level",
      disableColumnMenu: true,
      sortable: true,
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: true,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleUpdate(params)}
              sx={{ color: blue[900] }}
            >
              <ModeEditOutlineIcon />
            </IconButton>

            <IconButton onClick={() => handleDelete(params)}>
              <GridDeleteIcon sx={{ color: red[900] }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              placeItems: "center",
              gap: 3,
            }}
          >
            {/* <SearchKeyword /> */}
            {/* Add Button when you click open form  */}
            <Button
              onClick={() => HandleAddAndCancel(true)}
              variant="contained"
            >
              Add
            </Button>
          </Box>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Accordion expanded={expanded}>
            <AccordionSummary
              style={{ cursor: "default" }}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>Role Details</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <div className="flex gap-5 w-full">
                  <div className="w-full">
                    <Controller
                      name="role_name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          defaultChecked
                          value={field.value || ""}
                          error={!!errors.role_name}
                          label="Role Name"
                          id="outlined-basic"
                          placeholder="Enter Role Name"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
                    <NotifyError error={errors?.role_name?.message} />
                  </div>
                  <div className="w-full">
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          fullWidth
                          {...field}
                          defaultChecked
                          value={field.value || ""}
                          error={!!errors.level}
                          label="Level"
                          id="outlined-basic"
                          placeholder="Enter level"
                          variant="outlined"
                          size="small"
                        />
                      )}
                    />
                    <NotifyError error={errors?.level?.message} />
                  </div>
                </div>

                <div className="flex items-center my-5">
                  <Controller
                    control={control}
                    name="same_level_edit"
                    render={({ field }) => (
                      <Checkbox {...field} checked={!!field.value} />
                    )}
                  />
                  <Typography>Same Level Edit</Typography>
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => HandleAddAndCancel(false)}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>

        <Table columns={columns} rows={roleDataRows} loading={loading} />
      </Container>

      {confirmModal && <ConfirmModal modalData={confirmModal} />}
    </div>
  );
};

export default Role;
