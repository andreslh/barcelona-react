import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
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
    <Router>
      <Container>
        <AppBar position="static">
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
                <Link to="/">Comidas</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/">Bebidas</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/">Pedidos anteriores</Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        <Switch>
          <Route path="/new-table">
            <NewTable />
          </Route>
          <Route path="/">
            <Tables />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
