'use client'

import styled from "styled-components"
import ProductBox from "./ProductBox"
import Center from "./Center"

export const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    @media screen and (min-width: 768px){
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`

const Title = styled.h2`
    font-size: 2rem;
    margin:30px 0 20px;
    font-weight: 500;
`

export default function NewProducts({products}){
    return(
        <Center>
            <Title>New Arrivals</Title>
        <ProductsGrid>
            {products?.length>0 && products.map(product=>(
                <ProductBox key={product._id} {...product}/>
            ))}
        </ProductsGrid>
        </Center>
    )
}