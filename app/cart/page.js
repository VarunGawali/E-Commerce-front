'use client'

import styled from "styled-components"
import RootLayout from "../layout"
import Header from "@/components/Header"
import Center from "@/components/Center"
import PrimaryBtn from "@/components/PrimaryBtn"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "@/components/CartContext"
import axios from "axios"
import Table from "@/components/Table"
import Input from "@/components/Input"
import Image from "next/image"

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px){
        grid-template-columns: 1.4fr .7fr;
    }
    gap: 40px;
    margin-top: 40px;
    margin-bottom: 40px;
`
export const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`

const ProductCell = styled.td`
    padding: 10px 0;
`

const ProductImageBox = styled.div`
    width: 80px;
    height: 80px;
    padding: 2px;
    background-color: inherit;
    border: 1px solid rgba(0,0,0,.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    img{
        max-width: 60px;
        max-height: 60px;
    }
    @media screen and (min-width: 768px){
        padding: 10px;
        img{
            max-width: 80px;
            max-height: 80px;
        }
        width: 100px;
        height: 100px;
    }
`

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: block;
    @media screen and (min-width: 768px){
        display: inline-block;
        padding: 0 10px;
    }
`

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`

export default function CartPage(){
    const {cartProducts, addProduct, removeProduct, clearCart} = useContext(CartContext)
    const [products, setProducts] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')

    useEffect(()=>{
        if(cartProducts?.length > 0){
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data)
                })
                .catch(error => {
                    console.error('Error fetching products:', error)
                });
        } else {
            setProducts([]); // Clear products if the cart is empty
        }
    }, [cartProducts])

    function moreOfThisProduct(id){
        addProduct(id)
    }

    function lessOfThisProduct(id){
        removeProduct(id)
    }

    let total = 0

    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0
        total += price
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/checkout', {
                name,
                email,
                city,
                pincode,
                address,
                country,
                products: cartProducts.join(','),
                line_items: products, // Add the products to line_items
                paid: true
            });

            console.log('Response data:', response.data);
            if (response.data.message === 'Checkout successful') {
                const { orderId, amount } = response.data;

                // Redirect to payment
                window.location.href = `/payment?orderId=${orderId}&amount=${amount}`;
            } else {
                console.error('Error during checkout:', response.data);
            }
        } catch (error) {
            console.error('Checkout error:', error);
        }
    };

    return (
        <RootLayout>
            <Header/>
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Cart</h2>
                        {!cartProducts?.length && (
                            <div>Your cart is empty</div>
                        )}
                        {products?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price (in INR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <ProductCell>
                                                <ProductImageBox>
                                                    <Image src={product.images[0]} alt="Product Image" width={200} height={200}/>
                                                </ProductImageBox>
                                                {product.title}
                                            </ProductCell>
                                            <td>
                                                <PrimaryBtn black={1} outline={1} onClick={() => lessOfThisProduct(product._id)}>-</PrimaryBtn>
                                                <QuantityLabel>
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </QuantityLabel>
                                                <PrimaryBtn black={1} outline={1} onClick={() => moreOfThisProduct(product._id)}>+</PrimaryBtn>
                                            </td>
                                            <td>
                                                {cartProducts.filter(id => id === product._id).length * product.price}
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td>Cart Total:</td>
                                        <td></td>
                                        <td>{total}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!cartProducts?.length && (
                        <Box>
                            <h2>Checkout</h2>
                            <form onSubmit={handleSubmit}>
                                <Input type="text" placeholder="Name" value={name} name="name" onChange={e => setName(e.target.value)} />
                                <Input type="text" placeholder="Email" value={email} name="email" onChange={e => setEmail(e.target.value)} />
                                <CityHolder>
                                    <Input type="text" placeholder="City" value={city} name="city" onChange={e => setCity(e.target.value)} />
                                    <Input type="text" placeholder="Pin Code" value={pincode} name="pincode" onChange={e => setPincode(e.target.value)} />
                                </CityHolder>
                                <Input type="text" placeholder="Address" value={address} name="address" onChange={e => setAddress(e.target.value)} />
                                <Input type="text" placeholder="Country" value={country} name="country" onChange={e => setCountry(e.target.value)} />
                                <input type="hidden" name="products" value={cartProducts.join(',')} />
                                <PrimaryBtn size={'l'} block={1} black={1} type="submit">Proceed to pay</PrimaryBtn>
                            </form>
                        </Box>
                    )}
                </ColumnsWrapper>
            </Center>
        </RootLayout>
    )
}


