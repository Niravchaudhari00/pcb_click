import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import NotifyError from "../../common/NotifyError";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";

import {
  addModuleName,
  deleteModuleName,
  getModuleData,
  updateModuleName,
} from "../../../redux/slice/ModuleSlice";
import { rootState, useAppDispatch } from "../../../redux/store";
import {
  GridColDef,
  GridDeleteIcon,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Table from "../../common/Table";
import { blue, red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { ResponseModuleTypes } from "../../../interface/moduleInterface";
import ConfirmModal, { ConfirmModalType } from "../../common/ConfirmModal";
import SearchKeyword from "../../common/SearchKeyword";

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
  const [count, setCount] = useState(0);

  const dispatch = useAppDispatch();

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
  const { loading } = useSelector((state: rootState) => state.module);

  // Set data in setModuleDataRows
  useEffect(() => {
    if (moduleData.length > 0) {
      setModuleDataRows(moduleData);
    }
  }, [moduleData]);

  // Get Module Details
  useEffect(() => {
    dispatch(getModuleData());
  }, []);

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

  useEffect(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  console.log(count);
  // Gride Table columns

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
            <SearchKeyword moduleData={moduleDataRows} />
            {/* Add Button when you click open form  */}
            <Button onClick={HandleAddAndCancel} variant="contained">
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
