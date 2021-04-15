import React from 'react';
import { Button, Container, Grid, List, ListItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gridMenu: {
    width: '20%',
  },
  gridTable: {
    width: '80%',
  },
  list: {
    width: '100%',
    padding: 0,
    marginTop: theme.spacing(2),
  },
  listItem: {
    padding: theme.spacing(1, 0, 1, 0),
  },
  btn: {
    justifyContent: 'start',
    '&:hover': {
      backgroundColor: '#e5e5e5',
    },
    '&:focus': {
      color: '#f48c06',
    }
  },
}));

const AdminLayout = (props) => {

  const classes = useStyles();
  return (
    <>
      <Container maxWidth="lg" className={classes.root}>
        <Grid item className={classes.gridMenu}>
          <Typography variant={'h5'}>Admin Dashboard</Typography>
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <Button fullWidth className={classes.btn} component={Link} to={'/admin'}>
                <Typography>
                  Users
                </Typography>
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button fullWidth className={classes.btn} component={Link} to={'/admin/product-list'}>
                <Typography>
                  Products
                </Typography>
              </Button>
            </ListItem>
            <ListItem className={classes.listItem}>
              <Button fullWidth className={classes.btn} component={Link} to={'/admin/order-list'}>
                <Typography>
                  Orders
                </Typography>
              </Button>
            </ListItem>
          </List>
        </Grid>
        <Grid item className={classes.gridTable}>
          {props.children}
        </Grid>
      </Container>
    </>
  );
};

export default AdminLayout;