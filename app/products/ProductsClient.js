// app/products/ProductsClient.js
'use client';

import styled from 'styled-components';
import Center from "@/components/Center";
import Header from "@/components/Header";
import { ProductsGrid } from '@/components/NewProducts';
import ProductBox from '@/components/ProductBox';

const Title = styled.h1`
  font-size: 1.5em;
`;

// Client-side component
function ProductsClient({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid>
        {products?.length>0 && products.map(product => (
          <ProductBox key={product._id} {...product}/>
        ))}
        </ProductsGrid>
      </Center>
    </>
  );
}

export default ProductsClient;
