import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Pagination, Divider, Chip, Slider } from "@nextui-org/react";

import EditIcon from '../../Assets/editIcon';
import DeleteIcon from '../../Assets/deleteIcon';
import AlertIcon from '../../Assets/alertIcon';

import Container from '../General/Container';
import Card from '../General/Card';
import Image from '../General/Image';
import FilterPanel from '../General/FilterPanel';
import ProductDetailsInfo from "../General/ProductDetailsInfo";

import { AuthContext } from '../../context/AuthContext';
import { listProductsInStockFiltered, deleteProductInStock } from '../../Routes/routes';
function DisplayProductsAdmin() {
    const { user } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
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
        fetchData();
    }, [currentPage, filters]);

    async function fetchData() {
        try {
            const response = await axios.get(listProductsInStockFiltered(currentPage, filters));
            console.log('Colección de productos filtrados: ', response.data.data)
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    }

    const handleFiltersChange = (newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handleEditBtn = (product) => {
        setSelectedProduct(product);
    }

    const handleDeleteBtn = (product) => {
        setSelectedProduct(product);
        onOpen();
    }

    const handleDeleteConfirmation = async () => {
        if (selectedProduct) {
            try {
                await axios.put(deleteProductInStock(selectedProduct.id, user.id));
                // const updatedProducts = products.filter(product => product.id !== selectedProduct.id);
                // setProducts(updatedProducts);
                fetchData();
            } catch (error) {
                console.error('Error deleting product: ', error);
            }
            onClose();
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <FilterPanel filters={filters} onFiltersChange={handleFiltersChange} />

            <Container className='flex justify-center items-center mt-8 mx-10'>
                <Container className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-10'>
                    {products.map(productInStock => (
                        <Container key={productInStock.id} className='flex flex-col items-end'>
                            <Container className='flex justify-center w-24 rounded-t-lg shadow-xl pb-2 bg-white'>
                                <Link to={`/settings/product-management/edit/${productInStock.id}`}>
                                    <Button isIconOnly onClick={() => handleEditBtn(productInStock)} className='mt-2 me-1 bg-sky-700 hover:bg-sky-600'>
                                        <span className="text-white"><EditIcon /></span>
                                    </Button>
                                </Link>
                                <Button isIconOnly onClick={() => handleDeleteBtn(productInStock)} className='mt-2 bg-red-700 hover:bg-red-600'>
                                    <DeleteIcon />
                                </Button>
                            </Container>
                            <Link to={`/product/${productInStock.id}`}>
                                <Card
                                    className='rounded-none rounded-tl-lg rounded-br-lg rounded-bl-lg shadow-xl'
                                    src={productInStock.product.image}
                                    alt={productInStock.product.name}
                                    productName={productInStock.product.name}
                                    patternName={productInStock.product.pattern}
                                    productPrice={productInStock.unit_price}
                                    floatProduct={productInStock.float} />
                            </Link>
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

            <Modal isOpen={isOpen} onClose={onClose} size='3xl' backdrop='blur' placement='center' isDismissable={false}>
                <ModalContent className="bg-customGrey">
                    <>
                        <ModalHeader className='mt-4 ms-4 flex flex-col sm:flex-row items-center'>
                            <Container className="flex flex-col sm:flex-row items-center">
                                <Container className='flex items-center justify-center p-2.5 bg-red-300 rounded-full sm:mr-3 sm:mb-0 mb-3'>
                                    <AlertIcon />
                                </Container>
                                <Container className="flex flex-col text-center sm:text-left">
                                    <Container>
                                        <h1>Product removal confirmation</h1>
                                    </Container>
                                    <Container>
                                        <span className="text-sm font-normal">Are you sure you want to remove the following product?</span>
                                    </Container>
                                </Container>
                            </Container>
                        </ModalHeader>

                        <Divider className="my-5 bg-gray-400" />

                        <ModalBody>
                            {selectedProduct && (
                                <>
                                    <Container className='flex flex-col sm:flex-row justify-center items-center'>
                                        <Container className='w-[50%] sm:w-[47%] md:w-[40%] px-2 mb-4 sm:mb-0 sm:mr-7'>
                                            <Image
                                                src={selectedProduct.product.image}
                                                alt={`${selectedProduct.product.name} ${selectedProduct.product.pattern}`}
                                            />
                                        </Container>
                                        <Container className='w-[60%] pr-5'>
                                            {/* <h2 className='text-2xl font-semibold'>{selectedProduct.product.name} | {selectedProduct.product.pattern}</h2> */}
                                            <Container className='flex items-center justify-between mb-7'>
                                                <h2 className=' text-xl font-bold'>{selectedProduct.product.name} | {selectedProduct.product.pattern}</h2>
                                                <Container className='mx-auto'>
                                                    <Chip radius='sm' variant="flat" color="primary" className="text-lg px-3">
                                                        <span className="font-semibold">{selectedProduct.unit_price.toFixed(2)} $</span>
                                                    </Chip>
                                                </Container>
                                            </Container>
                                            <ProductDetailsInfo fieldLabel='Category' fieldValue={selectedProduct.product.category} className='my-3' />
                                            <ProductDetailsInfo fieldLabel='Rarity' fieldValue={selectedProduct.product.rarity_name} className='my-3' />
                                            <ProductDetailsInfo fieldLabel='Stattrak' fieldValue={selectedProduct.stattrak === 0 ? 'Without Stattrak' : 'With Stattrak'} className='my-3' />
                                            <Slider
                                                label={<span className="font-semibold">Float</span>}
                                                name='float'
                                                value={selectedProduct.float}
                                                step={0.001}
                                                hideThumb={true}
                                                maxValue={1}
                                                minValue={0}
                                                className="w-full mb-2" />
                                            {/* <Container className='mt-5'>
                                              
                                            </Container> */}
                                        </Container>
                                    </Container>
                                </>
                            )}
                        </ModalBody>


                        <ModalFooter className='mt-5'>
                            <Button color="primary" onClick={handleDeleteConfirmation}>Delete</Button>
                            <Button color="danger" variant="light" onPress={onClose}>Cancel</Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    )
}

export default DisplayProductsAdmin;