import { yupResolver } from "@hookform/resolvers/yup";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import NotifyError from "../../common/NotifyError";
// import { useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { blue, red } from "@mui/material/colors";
import {
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ResponseModuleTypes } from "../../../interface/moduleInterface";
import {
  addModuleName,
  deleteModuleName,
  getModuleData,
  getPermissionModule,
  updateModuleName,
} from "../../../redux/slice/ModuleSlice";
import { rootState, useAppDispatch } from "../../../redux/store";
import ConfirmModal, { ConfirmModalType } from "../../common/ConfirmModal";
import SearchKeyword from "../../common/SearchKeyword";
import Table from "../../common/Table";

// pagination interface
export interface PaginationModel {
  page: number;
  pageSize: number;
}

//Define Interface
export interface ModuleNameType {
  id?: number;
  name: string;
}
// Yup Schema
const schema = yup.object({
  name: yup.string().required(),
});

const Module = () => {
  // Initial State Hooks
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [moduleName, setModuleName] = useState<ModuleNameType | null>(null);
  const [moduleDataRows, setModuleDataRows] = useState<ResponseModuleTypes[]>(
    []
  );
  const [updateValue, setUpdateValue] = useState<ModuleNameType | null>(null);
  const [updateValueData, setUpdateValueData] = useState<ModuleNameType | null>(
    null
  );
  const [deleteModuleId, setDeleteModuleId] = useState<number | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalType | null>(
    null
  );

  const [page, setPage] = useState<PaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Use form hook
  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    setValue,
    getValues,
  } = useForm<ModuleNameType>({ resolver: yupResolver(schema) });

  const moduleData: ResponseModuleTypes[] = useSelector(
    (state: rootState) => state.module.data
  );
  const { loading, permissionModule } = useSelector(
    (state: rootState) => state.module
  );

  const handleSetModuleData = (data: ResponseModuleTypes[]) => {
    setModuleDataRows(data);
  };

  // when read false
  useEffect(() => {
    if (permissionModule?.read === 0) {
      navigate("/dashboard");
    }
  }, []);
  // Set data in setModuleDataRows
  console.log("moduleData.length: ", moduleData.length);
  useEffect(() => {
    if (moduleData.length > 0) {
      handleSetModuleData(moduleData);
    }
  }, [moduleData]);

  // Get Module Details
  useEffect(() => {
    if (location.pathname) {
      dispatch(getPermissionModule(location.pathname.split("/")[1]));
      dispatch(getModuleData());
    } else {
      navigate("/dashboard");
    }
  }, [location.pathname]);

  // Add And Update Module Name
  useEffect(() => {
    if (moduleName !== null && !isEdit) {
      dispatch(addModuleName(moduleName));
    } else if (isEdit) {
      dispatch(updateModuleName(updateValueData));
    }
  }, [moduleName, updateValueData]);

  // Delete Module Name
  useEffect(() => {
    if (deleteModuleId !== null) {
      dispatch(deleteModuleName(deleteModuleId));
    }
  }, [deleteModuleId]);

  // Toggle Btn
  const HandleAddAndCancel = () => {
    setIsEdit(false);
    setExpanded((prev) => !prev);
    reset();
  };

  // Submit Handler
  const onSubmit: SubmitHandler<ModuleNameType> = (data) => {
    // Update Module Name
    if (isEdit) {
      const currentValue = getValues();
      const updateData = {
        id: updateValue?.id,
        name: currentValue.name,
      };
      setUpdateValueData(updateData);
      reset();
    } else {
      // Add Module Name
      const addModuleName = {
        name: data.name,
      };
      setModuleName(addModuleName);
      reset();
    }
  };

  // Cancel Handler
  const handleCancel = () => {
    setExpanded(false);
    setIsEdit(false);
    reset();
  };

  // pagination
  const handlePageChange = (pageData: PaginationModel) => {
    setPage({
      page: pageData.page,
      pageSize: pageData.pageSize,
    });
  };

  useEffect(() => {
    handlePageChange({ page: 3, pageSize: 10 });
  }, []);
  // ++++++++++++++++++++ Operations +++++++++++++++++++++++//

  // Edit Mode
  useEffect(() => {
    if (isEdit) {
      if (updateValue !== null) {
        setValue("name", updateValue.name);
      }
    }
  }, [isEdit, updateValue]);

  const handleUpdate = (props: GridRenderCellParams) => {
    // set value in update state
    setUpdateValue({
      id: props.row.id,
      name: props.row.name,
    });

    setExpanded(true);
    setIsEdit(true);
  };

  const handleDelete = (props: GridRenderCellParams) => {
    setConfirmModal({
      title: "Confirm action",
      description: "Are you sure you want to confirm this action?",
      btnCancelTxt: "Cancel",
      btnConfirmTxt: "Confirm",
      cancelHandler: () => {
        setConfirmModal(null);
      },
      confirmHandler: () => {
        setDeleteModuleId(props.row.id);
        setConfirmModal(null);
      },
    });
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "No",
      width: 100,
      headerAlign: "left",
      disableColumnMenu: true,
    },
    {
      field: "name",
      headerName: "Name",
      disableColumnMenu: true,
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      disableColumnMenu: true,
      sortable: false,
      flex: 1,

      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() =>
                permissionModule?.update === 1 && handleUpdate(params)
              }
              sx={{ color: blue[900] }}
            >
              {permissionModule?.update === 1 ? (
                <Tooltip title="Edit" placement="left">
                  <ModeEditOutlineIcon />
                </Tooltip>
              ) : (
                <Tooltip title="No Allowed" placement="left">
                  <ModeEditOutlineIcon
                    sx={{ cursor: "not-allowed", color: blue[200] }}
                  />
                </Tooltip>
              )}
            </IconButton>

            <IconButton
              onClick={() => permissionModule?.delete && handleDelete(params)}
            >
              {permissionModule?.delete ? (
                <Tooltip title="Delete" placement="right">
                  <GridDeleteIcon sx={{ color: red[900] }} />
                </Tooltip>
              ) : (
                <Tooltip title="No Allowed" placement="right">
                  <GridDeleteIcon
                    sx={{ color: red[200], cursor: "not-allowed" }}
                  />
                </Tooltip>
              )}
            </IconButton>
          </Box>
        );
      },
    },
  ];

  return (
    <div className="w-[500px] md:w-[768px] lg:w-full">
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
            <SearchKeyword
              moduleData={moduleData}
              handleSetModuleData={handleSetModuleData}
              // handleSearchText={handleSearchText}
            />
            {/* Add Button when you click open form  */}
            {permissionModule?.write ? (
              <Button
                startIcon={!expanded ? <AddIcon /> : <ClearIcon />}
                onClick={HandleAddAndCancel}
                variant="contained"
              >
                {!expanded ? "Add" : "Cancel"}
              </Button>
            ) : (
              <Button
                sx={{
                  cursor: "not-allowed",
                  bgcolor: blue[100],
                  "&:hover": { bgcolor: blue[100] },
                }}
                startIcon={!expanded ? <AddIcon /> : <ClearIcon />}
                variant="contained"
              >
                {!expanded ? "Add" : "Cancel"}
              </Button>
            )}
          </Box>
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Accordion expanded={expanded}>
            <AccordionSummary
              style={{ cursor: "default" }}
              aria-controls="panel-content"
              id="panel-header"
            >
              <Typography>Module Details</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{
                  display: "flex",
                  gap: 2,
                }}
              >
                <Box>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        defaultChecked
                        value={field.value || ""}
                        error={!!errors.name}
                        label="Module Name"
                        id="outlined-basic"
                        placeholder="Enter Module Name"
                        variant="outlined"
                        size="small"
                      />
                    )}
                  />
                  <NotifyError error={errors?.name?.message} />
                </Box>
                <Box sx={{ display: "flex", gap: 2, height: 40 }}>
                  {/* cancel Button when you click form reset and close accordion */}
                  <Button onClick={handleCancel} variant="outlined">
                    cancel
                  </Button>
                  {/* Submit  */}
                  <Button type="submit" variant="contained">
                    {isEdit ? "Update" : "Add"}
                  </Button>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Table columns={columns} rows={moduleDataRows} loading={loading} />
      </Container>

      {confirmModal && <ConfirmModal modalData={confirmModal} />}
    </div>
  );
};

export default Module;
