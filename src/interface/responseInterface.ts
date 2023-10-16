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
