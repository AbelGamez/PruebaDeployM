import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import { Card as NextUICard, CardBody, Chip, Slider, Button, Accordion, AccordionItem } from "@nextui-org/react";

import ShoppingCartIcon from "../../Assets/shoppingCartIcon";
import BookOpenIcon from "../../Assets/bookOpenIcon";
import TruckIcon from "../../Assets/truckIcon";

import Container from "../General/Container";
import Image from "../General/Image";
import ProductDetailsInfo from "../General/ProductDetailsInfo";
import Card from "../General/Card";

import { listProductInStock, listRndProductsInStock } from '../../Routes/routes';
import { useCart } from '../../context/cartContext';

function ProductDetails() {
    const { id } = useParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { cartItems, addToCart } = useCart(); // Obtiene el estado del carrito y la función addToCart del contexto del carrito
    const [rndProducts, setRndProducts] = useState([]);

    useEffect(() => {
        fetchDetailProduct();
        fetchRndProducts();
        window.scrollTo(0, 0);
    }, [id]);

    async function fetchDetailProduct() {
        try {
            const response = await axios.get(listProductInStock(id));
            setSelectedProduct(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function fetchRndProducts() {
        try {
            const response = await axios.get(listRndProductsInStock());
            setRndProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    const handleAddToCart = (product) => {
        // Verificacion de si el producto ya está en el carrito antes de agregarlo
        const isProductInCart = cartItems.some(item => item.id === product.id);
        if (!isProductInCart) {
            addToCart(product);
        } else {
            console.log('El producto ya está en el carrito');
        }
    };

    if (!selectedProduct) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Container className='container flex items-center justify-center mt-24 mx-auto px-4 sm:px-6 lg:px-8'>
                <NextUICard className='w-[85%]'>
                    <CardBody>
                        <Container className='grid grid-cols-1 gap-6 mt-16'>
                            <Container className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6'>
                                <Container className='w-8/12 sm:w-8/12 md:w-[60%] lg:w-[80%] xl:w-[70%] 2xl:w-[58%] xl:ms-[20%] 2xl:ms-[30%] mx-auto text-center flex justify-center'>
                                    <Container className="w-full h-full relative">
                                        <Image
                                            alt={selectedProduct.product.name}
                                            className="object-cover w-full h-full"
                                            // shadow='md'
                                            src={selectedProduct.product.image}
                                        />
                                    </Container>
                                </Container>
                                <Container className='w-[85%] sm:w-[82%] md:w-[79%] lg:w-[75%] xl:w-[71%] 2xl:w-[71%] mx-[8%] sm:mx-[9%] md:mx-[10%] lg:mx-[0%] my-auto space-y-4'>
                                    <Container className='flex items-center justify-between mb-7'>
                                        <h1 className='w-[90%] text-black text-2xl font-bold'>{selectedProduct.product.name} | {selectedProduct.product.pattern}</h1>
                                        <Container className='mx-auto'>
                                            <Chip radius='sm' variant="flat" color="primary" className="text-lg px-3">
                                                <span className="font-semibold">{selectedProduct.unit_price.toFixed(2)} $</span>
                                            </Chip>
                                        </Container>
                                    </Container>
                                    <ProductDetailsInfo fieldLabel='Category' fieldValue={selectedProduct.product.category} color='primary' />
                                    <ProductDetailsInfo fieldLabel='Rarity' fieldValue={selectedProduct.product.rarity_name} color='primary' />
                                    <ProductDetailsInfo fieldLabel='Stattrak' fieldValue={selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'With Stattrak'} color='primary' />
                                    <Slider
                                        label={<span className="font-semibold text-md">Float</span>}
                                        name='float'
                                        value={selectedProduct.float}
                                        step={0.001}
                                        hideThumb={true}
                                        maxValue={1}
                                        minValue={0}
                                        className="w-full mb-2" />
                                    <Container className="flex justify-center">
                                        <Button color='primary' radius='sm' variant="shadow" className="w-[60%] mt-5" onClick={() => handleAddToCart(selectedProduct)}>
                                            <ShoppingCartIcon /> <span className="font-semibold">Add to cart</span>
                                        </Button>
                                    </Container>
                                </Container>
                            </Container>
                            <Container className='w-[93%] sm:w-[89%] md:w-[94%] lg:w-[90%] xl:w-[90%] 2xl:w-[65%] mt-5 mb-10 mx-auto text-sm'>
                                <Accordion selectionMode="multiple" defaultExpandedKeys={["1"]} variant="splitted">
                                    <AccordionItem key='1' aria-label="Description" title={<span className="font-semibold">Description</span>} indicator={<BookOpenIcon />} disableIndicatorAnimation>
                                        <Container className="pb-5 px-5">
                                            {selectedProduct.product.description}
                                        </Container>
                                    </AccordionItem>
                                    <AccordionItem key='2' aria-label="Shipping Information" title={<span className="font-semibold">Shipping & Return Information</span>} indicator={<TruckIcon />} disableIndicatorAnimation>
                                       <Container className='pb-5 px-5'>
                                            We strive to provide you with a fast and secure shopping experience. All Counter-Strike skins you purchase from our store will be digitally delivered to your Steam account. The shipping process is almost instantaneous and you will receive your skins within 5-10 minutes after confirming your purchase. In case you experience any delays, please feel free to contact us through our customer support to assist you immediately.
                                        </Container>
                                    </AccordionItem>
                                    {/* <AccordionItem key='3' aria-label="Contact" title="Contact">
                                        If you have any questions or need additional assistance, our support team is available 24/7. You can reach us via [email/contact]
                                    </AccordionItem> */}
                                </Accordion>
                            </Container>
                        </Container>
                    </CardBody>
                </NextUICard>
            </Container>

            <Container className='mx-auto my-24 w-11/12'>
                <h2 className='text-2xl font-bold mb-8 text-black'>Other skins you may be interested in</h2>
                <Container className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-10'>
                    {rndProducts.map(productInStock => (
                        <Container key={productInStock.id}>
                            <Link to={`/product/${productInStock.id}`}>
                                <Card
                                    src={productInStock.product.image}
                                    alt={productInStock.product.name}
                                    productName={productInStock.product.name}
                                    patternName={productInStock.product.pattern}
                                    productPrice={productInStock.unit_price}
                                    floatProduct={productInStock.float}
                                />
                            </Link>
                        </Container>
                    ))}
                </Container>
            </Container>
        </>
    );
}

export default ProductDetails;