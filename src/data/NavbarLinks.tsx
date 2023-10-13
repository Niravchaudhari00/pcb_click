import ViewModuleIcon from "@mui/icons-material/ViewModule";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";

export interface NavbarlinksProps {
  id: number;
  name: string;
  path: string;
  icon: JSX.Element;
}

export const Navbarlinks: Array<NavbarlinksProps> = [
  {
    id: 1,
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeOutlinedIcon />,
  },
  {
    id: 2,
    name: "Module",
    path: "/module",
    icon: <ViewModuleIcon />,
  },
  {
    id: 3,
    name: "Role",
    path: "/role",
    icon: <CategoryOutlinedIcon />,
  },
  {
    id: 4,
    name: "Permission",
    path: "/permission",
    icon: <HowToRegOutlinedIcon />,
  },
  {
    id: 5,
    name: "User Managment",
    path: "/user-management",
    icon: <ManageAccountsOutlinedIcon />,
  },
];
