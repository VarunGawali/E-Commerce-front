'use client'

import Header from "@/components/Header";
import Center from "@/components/Center";
import { Box } from "../cart/page";

export default function ThankyouPage(){
    return(
        <>
        <Header/>
        <Center>
                <Box>
                    <h1>Thanks for your order!</h1>
                    <p>We will email you when your order will be dispatched.</p>
                </Box>
            </Center>
        </>
    )
}