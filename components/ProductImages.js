'use client'

import { useState } from "react"
import styled from "styled-components"

const Image = styled.img`
        max-width: 100%;
        max-height: 100%;
    `
const BigImage = styled.img`
    max-width: 100%;
    max-height: 200px;
`
const BigImageWrapper = styled.div`
    text-align: center;
`
const ImageButtons = styled.div`
    display: flex;
    gap: 10px;
    flex-grow: 0;
    margin-top: 10px;
    `
const ImageButton = styled.div`
    border: 2px solid #aaa;
    ${props => props.active ? `
        border-color: #ccc;
        `:`
        border-color: transparent;
        opacity: .7;
        `}
    margin-top: 10px;
    height: 45px;
    padding: 3px;
    cursor: pointer;
    border-radius: 5px;
    `

export default function ProductImages({images}){
    const [activeImage, setActiveImage] = useState(images?.[0]);
    
    return(
        <>
        <BigImageWrapper>
        <BigImage src={activeImage}/>
        </BigImageWrapper>
        <ImageButtons>
            {images?.map(image=>(
                <ImageButton key={image} active={image==activeImage} onClick={()=> setActiveImage(image)}>
                    <Image src={image}/>
                </ImageButton>
            ))}
        </ImageButtons>
        </>
    )
}