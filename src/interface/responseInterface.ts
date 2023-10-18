export interface ErrorResponseType {
  data: any;
  message: string;
  success: boolean;
  status: number;
}

export interface ResponseRoleType {
  id: number;
  name: string;
  status: number;
  created_by: number;
  created_time: string;
  modified_by: number;
  modified_time: string;
  same_level_edit: number;
  level: number;
  role_category: string;
}

export interface ResponsePermissionType {
  id: number;
  role_id: number;
  module_id: number;
  permission_read: number;
  permission_write: number;
  permission_update: number;
  permission_delete: number;
  created_by: null;
  modified_by: number;
  created_time: string;
  modified_time: string;
  tbl_module: {
    name: string;
  };
}
