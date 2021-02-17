import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { PRODUCTS, LOGIN, CHANGE_PASSWORD } from '../app/routes';
import { logout, selectRole, selectTokens } from '../features/users/usersSlice';
import { ROLES } from '../app/constants';
import UsersService from '../services/users';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar() {
  const dispatch = useDispatch();
  const role = useSelector(selectRole);
  const tokens = useSelector(selectTokens);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isLoggedIn = tokens.accessToken != null;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    UsersService.logout({ token: tokens.refreshToken }).then(() => {
      dispatch(logout());
      setAnchorEl(null);
      history.push(LOGIN);
    });
  };

  const isAdmin = (role) => parseInt(role, 10) === ROLES.admin;

  return (
    <AppBar classes={{ root: 'barcelona-app-bar' }} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Barcelona
        </Typography>
        {isLoggedIn && (
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              aria-controls="header-menu"
              aria-haspopup="true"
              onClick={handleClick}
              data-testid="header-menu-icon"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="header-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/">Mesas</Link>
              </MenuItem>
              {isAdmin(role) && (
                <MenuItem onClick={handleClose}>
                  <Link to={PRODUCTS}>Productos</Link>
                </MenuItem>
              )}
              <MenuItem onClick={handleClose}>
                <Link to="/">Pedidos anteriores</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to={CHANGE_PASSWORD}>Cambiar contraseña</Link>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Link to="#">Cerrar sesión</Link>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
