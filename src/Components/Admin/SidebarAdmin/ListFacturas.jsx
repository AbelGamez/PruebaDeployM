import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Tooltip, Spinner } from '@nextui-org/react';
import Container from '../../General/Container';
import { datosListFacturas } from '../../../Routes/routes';
import DownloadIcon from '../../../Assets/downloadIcon';

export default function ListFacturas() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        // Simulación de un retraso de 1 segundos antes de realizar la solicitud.
        setTimeout(async () => {
            setIsLoading(true); // Establece isLoading a true al iniciar la carga de datos.
            try {
                const response = await axios.get(datosListFacturas());
                const sortedOrders = response.data.sort((a, b) => a.id - b.id);
                setOrders(sortedOrders);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <Container className='w-[90%] mx-auto mt-14'>
            <h2 className="text-3xl font-semibold mb-10 text-black">Orders</h2>
            <Container className="border-x border-gray-200 rounded-sm mt-3 overflow-x-auto">
                <Table aria-label="Orders Table">
                    <TableHeader>
                        <TableColumn className="text-center text-black font-bold">ID</TableColumn>
                        <TableColumn className="text-center text-black font-bold">NAME</TableColumn>
                        <TableColumn className="text-center text-black font-bold">PATTERN</TableColumn>
                        <TableColumn className="text-center text-black font-bold">STATTRAK</TableColumn>
                        <TableColumn className="text-center text-black font-bold">FLOAT</TableColumn>
                        <TableColumn className="text-center text-black font-bold">CUSTOMER</TableColumn>
                        <TableColumn className="text-center text-black font-bold">ORDER DATE</TableColumn>
                        <TableColumn className="text-center text-black font-bold">ORDER TOTAL</TableColumn>
                        <TableColumn className="text-center text-black font-bold">DOWNLOAD INVOICE</TableColumn>
                    </TableHeader>
                    <TableBody
                        isLoading={isLoading}
                        loadingContent={<Spinner size='lg' color="primary" />}
                        emptyContent={"No rows to display."}>
                        {currentOrders.map((order, orderIndex) => (
                            <TableRow key={order.id}>
                                <TableCell className="text-center text-black">#{order.id}</TableCell>
                                <TableCell className="text-center text-black">
                                    {order.productos && order.productos.length > 0 ? order.productos[0].nombre : 'N/A'}
                                </TableCell>
                                <TableCell className="text-center text-black">
                                    {order.productos && order.productos.length > 0 ? order.productos[0].patron : 'N/A'}
                                </TableCell>
                                <TableCell className="text-center text-black">
                                    {order.productos && order.productos.length > 0 ? (order.productos[0].stattrak === 'Sí' ? 'Stattrak' : 'Without Stattrak') : 'N/A'}
                                </TableCell>
                                <TableCell className="text-center text-black">
                                    {order.productos && order.productos.length > 0 ? order.productos[0].float + ' %' : 'N/A'}
                                </TableCell>
                                <TableCell className="text-center text-black">{order.usuario}</TableCell>
                                <TableCell className="text-center text-black">
                                    {order.created_at ? format(new Date(order.created_at), 'dd MMM yyyy') : 'N/A'}
                                </TableCell>
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
