import React, { useState } from 'react';
import ProductForm from '../../../components/ProductForm';
import { Container, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../store/actions/productActions';

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    countInStock: 0,
    category: '',
    description: '',
  });

  const dispatch = useDispatch();

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setProduct((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    dispatch(createProduct(formData));
  };

  return (
    <Container>
      <Typography variant={'h5'}>
        Create new product
      </Typography>
      <ProductForm
        state={product}
        onChange={inputChangeHandler}
        onFileChange={fileChangeHandler}
        onSubmit={submitFormHandler}
        btnText={'Submit'}
      />
    </Container>
  );
};

export default ProductCreate;