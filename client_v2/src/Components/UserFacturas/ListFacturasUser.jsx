import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button, Tooltip, Pagination, Spinner } from '@nextui-org/react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import DownloadIcon from '../../Assets/downloadIcon';

import { AuthContext } from "../../context/AuthContext";
import Container from '../General/Container';

import { obtenerDatosTablaPorUsuario } from '../../Routes/routes';

export default function ListFacturasUser() {
    const [orders, setOrders] = useState([]);
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Simulación de un retraso de 1 segundos antes de realizar la solicitud.
        setTimeout(async () => {
            setIsLoading(true); // Establece isLoading a true al iniciar la carga de datos.
            try {
                const response = await axios.get(obtenerDatosTablaPorUsuario(user.id));
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                // Establece isLoading a false después de cargar los datos (incluso si hay un error).
                setIsLoading(false);
            }
        }, 1000); // Espera 1000 milisegundos (1 segundos) antes de realizar la solicitud.
    };

    const handlePrintPDF = (orderIndex) => {
        const order = orders[orderIndex];
        const doc = new jsPDF();
        const columns = [
            "Product Name",
            "Pattern",
            "StatTrak",
            "Float",
            "Customer Name",
            "Order Date",
            "Order Total"
        ];
        const data = order.productos.map(producto => [
            producto.nombre,
            producto.patron,
            producto.stattrak,
            producto.float,
            order.usuario,
            format(new Date(order.created_at), 'dd MMM yyyy'),
            order.total_price
        ]);

        doc.autoTable({
            head: [columns],
            body: data
        });

        doc.save(`order_${order.id}.pdf`);
    };

    // Calcula el índice del último pedido en la página actual
    const indexOfLastOrder = currentPage * ordersPerPage;

    // Calcula el índice del primer pedido en la página actual
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

    // Obtiene los pedidos para la página actual utilizando el método slice
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Calcula el número total de páginas necesarias para mostrar todos los pedidos
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    // Maneja el cambio de página
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container className="w-[85%] mx-auto pt-24 px-4 pb-4 rounded-sm border border-gray-200 flex-1">
            <strong className="text-gray-700 font-medium">Orders</strong>
            <Container className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
                <Table aria-label="Orders Table">
                    <TableHeader>
                        <TableColumn className="text-center text-black font-bold">ID</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Product Name</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Pattern</TableColumn>
                        <TableColumn className="text-center text-black font-bold">StatTrak</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Float</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Customer Name</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Order Date</TableColumn>
                        <TableColumn className="text-center text-black font-bold">Order Total</TableColumn>
                        <TableColumn className="text-center text-black font-bold">PDF</TableColumn>
                    </TableHeader>
                    <TableBody
                        isLoading={isLoading}
                        loadingContent={<Spinner size='lg' color="primary" />}
                        emptyContent={"No rows to display."}>
                        {currentOrders.map((order, orderIndex) => (
                            <TableRow key={order.id}>
                                <TableCell className="text-center text-black">#{order.id}</TableCell>
                                <TableCell className="text-center text-black">{order.productos[0].nombre}</TableCell>
                                <TableCell className="text-center text-black">{order.productos[0].patron}</TableCell>
                                <TableCell className="text-center text-black">{order.productos[0].stattrak}</TableCell>
                                <TableCell className="text-center text-black">{order.productos[0].float}</TableCell>
                                <TableCell className="text-center text-black">{order.usuario}</TableCell>
                                <TableCell className="text-center text-black">{format(new Date(order.created_at), 'dd MMM yyyy')}</TableCell>
                                <TableCell className="text-center text-black">{order.total_price.toFixed(2)} $</TableCell>
                                <TableCell className="text-center text-black">
                                    <Tooltip content="Download PDF" placement="right" className='bg-[#3b3b3b]'>
                                        <Button isIconOnly color='success' onClick={() => handlePrintPDF(orderIndex)}><DownloadIcon /></Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
            <Container className="flex justify-center mt-4">
                <Pagination
                    showControls
                    showShadow
                    total={totalPages}
                    initialPage={currentPage}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </Container>
        </Container>
    );
}
