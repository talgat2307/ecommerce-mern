import React, { useEffect, useState } from 'react';
import ProductForm from '../../../components/ProductForm';
import { Container, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, updateProduct } from '../../../store/actions/productActions';
import Loader from '../../../components/Loader';

const ProductEdit = ({ match }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: '',
    price: 0,
    image: '',
    brand: '',
    countInStock: 0,
    category: '',
    description: '',
  });

  const productId = match.params.id;

  const dispatch = useDispatch();
  const { product, loading } = useSelector(state => state.productDetails);
  const { success, loading: loadingUpdate } = useSelector(state => state.productUpdate);

  useEffect(() => {
    dispatch(getProductDetails(productId));
  }, [dispatch, productId, success]);

  useEffect(() => {
    if (product && product.name) {
      setUpdatedProduct(prevState => ({
        ...prevState,
        name: product.name,
        price: product.price,
        brand: product.brand,
        countInStock: product.countInStock,
        category: product.category,
        description: product.description,
      }));
    }
  }, [dispatch, product]);

  const inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUpdatedProduct(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileChangeHandler = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(updatedProduct).forEach((key) => {
      formData.append(key, updatedProduct[key]);
    });

    dispatch(updateProduct(formData, productId));
  };

  return (
    <Container>
      <Typography variant={'h5'}>
        Update product
      </Typography>
      {loading || loadingUpdate ? <Loader open={loading || loadingUpdate}/>
        :
        <ProductForm
          state={updatedProduct}
          onChange={inputChangeHandler}
          onFileChange={fileChangeHandler}
          onSubmit={submitFormHandler}
          btnText={'Update'}
        />
      }
    </Container>
  );
};

export default ProductEdit;