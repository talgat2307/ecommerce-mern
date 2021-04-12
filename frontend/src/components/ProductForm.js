import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FileInput from './Form/FileInput';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: '70%',
  },
  btn: {
    marginTop: theme.spacing(2),
  },
}));

const ProductForm = ({
  onSubmit,
  onChange,
  onFileChange,
  state,
  btnText
}) => {

  const classes = useStyles();
  return (
    <>
      <form
        onSubmit={onSubmit}
        className={classes.root}
      >
        <TextField
          onChange={onChange}
          value={state.name}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
        />
        <TextField
          onChange={onChange}
          value={state.price}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          id="price"
          label="Price"
          name="price"
        />
        <FormControl
          variant="outlined"
          fullWidth
          margin="normal"
        >
          <FileInput
            label="Image"
            name="image"
            id="image"
            onChange={onFileChange}
          />
        </FormControl>
        <TextField
          onChange={onChange}
          value={state.brand}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="brand"
          label="Brand"
          name="brand"
        />
        <TextField
          onChange={onChange}
          value={state.countInStock}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type="number"
          id="countInStock"
          label="Count In Stock"
          name="countInStock"
        />
        <TextField
          onChange={onChange}
          value={state.category}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="category"
          label="Category"
          name="category"
        />
        <TextField
          onChange={onChange}
          value={state.description}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          multiline
          rows={5}
          id="description"
          label="Description"
          name="description"
        />
        <Button
          type='submit'
          variant={'contained'}
          color={'primary'}
          fullWidth
          className={classes.btn}
        >
          {btnText}
        </Button>
      </form>
    </>
  );
};

export default ProductForm;