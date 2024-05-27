import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination } from "@nextui-org/react";

import Container from '../General/Container';
import Card from '../General/Card';
import FilterPanel from '../General/FilterPanel';

import { listProductsInStockByCategory } from '../../Routes/routes';
import { useCart } from '../../context/cartContext'; 

function DisplayProductsClient({ category }) {
    const [products, setProducts] = useState([]);
    const { cartItems, addToCart } = useCart(); // Obtiene el estado del carrito y la función addToCart del contexto del carrito
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        min_price: 0,
        max_price: 20000,
        min_float: 0,
        max_float: 1,
        stattrak: false,
        name: ''
    });

    useEffect(() => {
        async function fetchProductsInStockByCategory() {
            try {
                const response = await axios.get(listProductsInStockByCategory(category, currentPage, filters));
                console.log('Colección de productos Cliente: ', response.data.data)
                setProducts(response.data.data);
                setTotalPages(response.data.last_page);
            } catch (error) {
                console.error('Error fetching products: ', error);
            }
        }
        fetchProductsInStockByCategory();
    }, [category, currentPage, filters]);

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // const handleAddToCart = (product) => {
    //     // Verificacion de si el producto ya está en el carrito antes de agregarlo
    //     const isProductInCart = cartItems.some(item => item.id === product.id);
    //     if (!isProductInCart) {
    //         addToCart(product);
    //     } else {
    //         console.log('El producto ya está en el carrito');
    //     }
    // };

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1); // Reset current page when filters change
    };

    return (
        <>
            <Container className='mt-16'>
                <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />
            </Container>
            <Container className='mx-auto mt-10 w-11/12'>
                <Container className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-6 gap-10'>
                    {products.map(productInStock => (
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
                            {/* <button onClick={() => handleAddToCart(productInStock)}>Add to Cart</button> */}
                        </Container>
                    ))}
                </Container>
            </Container>
            <Container className="flex justify-center items-center my-20">
                <Pagination
                    showControls
                    showShadow
                    total={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Container>
        </>
    )
}

export default DisplayProductsClient;