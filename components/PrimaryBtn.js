'use client'

import styled, {css} from "styled-components"

export const ButtonStyle = css`
    background-color: #757575;
    color: #fff;
    border: 0;
    padding: 5px 15px;
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items-center;
    text-decoration: none;
    font-weight: bold;
    svg{
        height: 16px;
        margin-right: 8px;
    }
    ${props => props.block && css`
        display: block;
        width: 100%;
    `}
    ${props => props.white && !props.outline && css`
            background-color: #fff;
        `}
    ${props => props.white && props.outline && css`
            background-color: transparent;
            color:#fff;
            border: 1px solid #fff;
        `}
    
    ${props => props.black && !props.outline && css`
            background-color: #000;
        `}
    ${props => props.black && props.outline && css`
            background-color: transparent;
            color:#000;
            border: 1px solid #000;
        `}
    ${props => props.gray && props.size === 'l' && css`
            border: 1px solid #757575;
        `}
    ${props => props.outline &&  !props.white && css`
            background-color: transparent;
            color:#757575;
            border: 1px solid #757575;
        `}
    ${props => props.size === 'l' && css`
            font-size: 1.2rem;
            padding: 10px 20px;
            svg{
                height: 20px;
            }
        `}
`

const StyledBtn = styled.button`
        ${ButtonStyle}
`

export default function PrimaryBtn({children, ...rest}){
    return(
        <StyledBtn {...rest}>{children}</StyledBtn>
    )
}