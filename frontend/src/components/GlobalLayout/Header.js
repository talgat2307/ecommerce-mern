import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Badge, Box, Container, Menu, MenuItem } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AccountCircle } from '@material-ui/icons';
import { logout } from '../../store/actions/userActions';
import SearchField from '../SearchField';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    fontWeight: 'bold',
  },
  appBar: {
    color: 'black',
    backgroundColor: 'white',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;'
  },
  headerLink: {
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
      color: 'inherit',
    },
  },
  headerBtn: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    margin: theme.spacing(0, 1),
    padding: theme.spacing(1, 3)
  },
}));

const Header = () => {

  const dispatch = useDispatch();
  const { userInfo} = useSelector(state => state.userLogin);
  const { cartItems } = useSelector(state => state.cart);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  const classes = useStyles();
  return (
    <>
      <AppBar position="fixed" elevation={0} className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              <Link className={classes.headerLink} to={'/'}>eStore</Link>
            </Typography>
            <SearchField />
            <Button
              className={classes.headerBtn}
              color="inherit"
              startIcon={
                <Badge badgeContent={cartItems.reduce((acc, item) => acc + item.qty, 0)} color="secondary">
                  <ShoppingCartIcon/>
                </Badge>
              }
              component={Link}
              to={'/cart'}
            />
            {userInfo && userInfo ?
              <>
                <Button
                  startIcon={<AccountCircle/>}
                  onClick={handleMenu}
                  color="inherit"
                >
                  {userInfo && userInfo.name}
                </Button>
                <Menu
                  className={classes.menu}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  {userInfo.role === 'user' ?
                    <Box>
                      <MenuItem
                        component={Link}
                        to={'/profile'}
                        className={classes.menuItem}
                        onClick={handleClose}
                      >Profile</MenuItem>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                          handleClose();
                          logoutHandler()
                        }}
                      >Log Out</MenuItem>
                    </Box>
                    :
                    <Box>
                      <MenuItem
                        component={Link}
                        to={'/admin'}
                        className={classes.menuItem}
                        onClick={handleClose}
                      >Admin Dashboard</MenuItem>
                      <MenuItem
                        className={classes.menuItem}
                        onClick={() => {
                          handleClose();
                          logoutHandler()
                        }}
                      >Log Out</MenuItem>
                    </Box>
                  }
                </Menu>
              </>
              :
              <Button
                className={classes.headerBtn}
                color='inherit'
                startIcon={<PersonIcon/>}
                component={Link}
                to={'/login'}
              >
                Login
              </Button>
            }
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;