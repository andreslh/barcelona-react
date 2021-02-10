import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Tables from './features/tables';
import NewTable from './features/tables/NewTable';
import AddProducts from './features/tables/AddProducts';
import Products from './features/products';
import AddProduct from './features/products/AddProduct';
import {
  ACTIVE_TABLE,
  ADD_PRODUCT,
  ADD_PRODUCTS,
  HOME,
  NEW_TABLE,
  PRODUCTS,
  EDIT_PRODUCT,
} from './app/routes';

import './App.css';
import EditProduct from './features/products/EditProduct';

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

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Container>
      <AppBar classes={{ root: 'barcelona-app-bar' }} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Barcelona
          </Typography>
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
            <MenuItem onClick={handleClose}>
              <Link to={PRODUCTS}>Productos</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/">Pedidos anteriores</Link>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Switch>
        <Route path={NEW_TABLE}>
          <NewTable />
        </Route>
        <Route path={ACTIVE_TABLE}>
          <Tables />
        </Route>
        <Route path={ADD_PRODUCTS}>
          <AddProducts />
        </Route>
        <Route path={PRODUCTS}>
          <Products />
        </Route>
        <Route path={ADD_PRODUCT}>
          <AddProduct />
        </Route>
        <Route path={EDIT_PRODUCT}>
          <EditProduct />
        </Route>
        <Route path={HOME}>
          <Tables />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
