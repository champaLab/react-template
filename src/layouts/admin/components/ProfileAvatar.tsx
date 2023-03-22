import React from "react";
import {
  Box,
  Menu,
  IconButton,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
  Alert,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ProfilePopup from "./ProfilePopUp";
import { ThemeProvider } from "@emotion/react";
import { Notifications } from "@mui/icons-material";

export default function ProfileAvatar() {
  const { auth } = useSelector((state: RootState) => ({ ...state }));
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box >

      <Tooltip title="Manage profile">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, gap: 1 }}>
          <Badge badgeContent={4} color="primary" sx={{ mr: 2 }}>
            <Notifications />
          </Badge>
          <Avatar alt={auth.username ? auth.username.toUpperCase() : ""} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <ProfilePopup />
        </MenuItem>
      </Menu>
    </Box>

  );
}
