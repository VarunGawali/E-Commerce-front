'use client'

import styled from "styled-components"
import PrimaryBtn from "./PrimaryBtn"
import CartIcon from "./CartIcon"
import Link from "next/link"
import { useContext } from "react"
import { CartContext } from "./CartContext"

const ProductWrapper = styled.div`
`

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 20px;
    height: 120px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    color: inherit;
    text-decoration: none;
    margin: 0;
`

const ProductInfoBox = styled.div`
    margin-top: 5px;
`

const PriceRow = styled.div`
    display: block;
    @media screen and (min-width: 768px){
        display: flex;
        gap: 10px;
    }
    align-items:center;
    justify-content: space-between;
    margin-top:5px;
`

const Price = styled.div`
    font-size: 1rem;
    font-weight: bold;
    text-align: right;
    @media screen and (min-width: 768px){
        font-size: 1.2rem;
        font-weight: bold;
        text-align: left;
    }
`

export default function ProductBox({_id,title,price,images}){
    const {addProduct} = useContext(CartContext)
    const url = '/product/'+_id
    const imageSrc = (images && images.length > 0) ? images[0] : '/path/to/default/image.jpg';
    return(
        <ProductWrapper>
        <WhiteBox href={url}>
            <div><img src={imageSrc} alt={title}></img></div>
        </WhiteBox>
        <ProductInfoBox>
            <Title href={url}>{title}</Title>
            <PriceRow>
                <Price>₹{price}</Price>
            <PrimaryBtn block='1' onClick={()=>addProduct(_id)} outline='1'>Add to cart</PrimaryBtn>
            </PriceRow>
        </ProductInfoBox>
        </ProductWrapper>
    )
}