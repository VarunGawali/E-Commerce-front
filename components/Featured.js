'use client'

import styled from "styled-components";
import Center from "./Center";
import PrimaryBtn from "./PrimaryBtn";
import ButtonLink from "./ButtonLink";
import CartIcon from "./CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Bg = styled.div`
    background-color: #222;
    color: #fff;
    padding: 50px 0;
`
const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 1.5rem;
    @media screen and (min-width: 768px){
        font-size: 3rem;
    }
`

const Desc = styled.p`
    color: #aaa;
    font-size: .9rem;
`
const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-width: 100%;
        max-height: 200px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order: 2;
    }
    @media screen and (min-width: 768px){
        grid-template-columns: .9fr 1.1fr;
        div:nth-child(1){
            order: 0;
        }
        img{
            max-width: 100%;
            
        }
    }
`
const Column = styled.div`
    display: flex;
    align-items: center;
    
`
const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 25px;
`


export default function Featured({featuredProduct}){
    const {addProduct} = useContext(CartContext)
    function addFeaturedToCart(){
        addProduct(featuredProduct._id)
    }

    if (!featuredProduct) {
        return null; // Or display a loading spinner, error message, etc.
    }
    
    return(
        <Bg>
            <Center>
                <ColumnsWrapper>
                    <Column>
                    <div>
                        <Title>{featuredProduct?.title}</Title>
                        <Desc>
                        {featuredProduct?.description}
                        </Desc>
                        <ButtonsWrapper>
                        <ButtonLink href={'/product/'+featuredProduct._id} outline={1} white={1} size="l">Read More</ButtonLink>
                        <PrimaryBtn onClick={addFeaturedToCart} gray={1} size="l">
                        <CartIcon/>
                            Add to cart
                        </PrimaryBtn>
                        </ButtonsWrapper>
                    </div>
                    </Column>
                    <Column>
                        <img src="https://varun-next-ecommerce.s3.amazonaws.com/1721236522510-macbook%20pro.png"></img>
                    </Column>
                </ColumnsWrapper>
            </Center>
        </Bg>
    )
}