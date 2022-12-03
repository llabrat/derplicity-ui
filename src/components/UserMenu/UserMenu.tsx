import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export function UserMenu() {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      {isAuthenticated ? (
        <>
          {user!.name}
          <Tooltip title="Open user menu">
            <IconButton
              onClick={handleOpenUserMenu}
              sx={{ p: 0, paddingLeft: "10px" }}
            >
              <Avatar src={user!.picture} alt={user!.name} />
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
            <MenuItem
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          variant="outlined"
          startIcon={<LoginIcon />}
          color={"inherit"}
          onClick={() => loginWithRedirect()}
        >
          Login
        </Button>
      )}
    </Box>
  );
}
