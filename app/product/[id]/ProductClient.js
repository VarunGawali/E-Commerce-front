// app/products/[id]/ProductClient.js (or .ts if using TypeScript)
'use client';

import Center from "@/components/Center";
import Header from "@/components/Header";
import styled from "styled-components";
import { Box } from "@/app/cart/page";
import ProductImages from "@/components/ProductImages";
import ButtonLink from "@/components/ButtonLink";
import PrimaryBtn from "@/components/PrimaryBtn";
import CartIcon from "@/components/CartIcon";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";

const Title = styled.h1`
  font-size: 1.5em;
`;

const Price = styled.span`
  color: green;
  font-size: 1.4rem;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px){
      grid-template-columns: .8fr 1.2fr;
    }
    gap: 40px;
    margin: 40px 0;
`

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`


export default function ProductClient({ product }) {
  const {addProduct} = useContext(CartContext)
  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
            <Box>
                <ProductImages images={product.images}/>
            </Box>
            <div>
                <Title>{product.title}</Title>
                <p>{product.description}</p>
                <PriceRow>
                <Price>Price: ₹{product.price}</Price>
                <PrimaryBtn onClick={()=>addProduct(product._id)}><CartIcon/>Add to Cart</PrimaryBtn>
                </PriceRow>
            </div>
        </ColWrapper>
      </Center>
    </>
  );
}
