import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner } from '@nextui-org/react';

import Container from '../../General/Container';
import { datosTablaFacturas } from '../../../Routes/routes';

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // Simulación de un retraso de 1 segundos antes de realizar la solicitud.
    setTimeout(async () => {
      setIsLoading(true); // Establece isLoading a true al iniciar la carga de datos.
      try {
        const response = await axios.get(datosTablaFacturas());
        console.log(response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        // Establece isLoading a false después de cargar los datos (incluso si hay un error).
        setIsLoading(false);
      }
    }, 1000); // Espera 1000 milisegundos (1 segundos) antes de realizar la solicitud.
  };


  return (
    <Container className='w-full'>
      <Container className='bg-white py-3 px-5 rounded-lg'>
        <h2 className="text-gray-700 font-medium">Recent orders</h2>
      </Container>
      <Container className="border-x border-gray-200 rounded-lg mt-3 overflow-x-auto">
        <Table aria-label="Recent Orders Table">
          <TableHeader>
            <TableColumn className="text-center text-black font-bold">ID</TableColumn>
            <TableColumn className="text-center text-black font-bold">NAME</TableColumn>
            <TableColumn className="text-center text-black font-bold">PATTERN</TableColumn>
            <TableColumn className="text-center text-black font-bold">STATTRAK</TableColumn>
            <TableColumn className="text-center text-black font-bold">FLOAT</TableColumn>
            <TableColumn className="text-center text-black font-bold">CUSTOMER</TableColumn>
            <TableColumn className="text-center text-black font-bold">ORDER DATE</TableColumn>
            <TableColumn className="text-center text-black font-bold">ORDER TOTAL</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<Spinner size='lg' color="primary" />}
            emptyContent={"No rows to display."}>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="text-center text-black">#{order.id}</TableCell>
                <TableCell className="text-center text-black">{order.productos && order.productos.length > 0 ? order.productos[0].nombre : 'N/A'}</TableCell>
                <TableCell className="text-center text-black">{order.productos && order.productos.length > 0 ? order.productos[0].patron : 'N/A'}</TableCell>
                <TableCell className="text-center text-black">{order.productos && order.productos.length > 0 ? (order.productos[0].stattrak === 'Sí' ? 'Stattrak' : 'Without Stattrak') : 'N/A'}</TableCell>
                <TableCell className="text-center text-black">{order.productos && order.productos.length > 0 ? order.productos[0].float + ' %' : 'N/A'}</TableCell>
                <TableCell className="text-center text-black">{order.usuario}</TableCell>
                <TableCell className="text-center text-black">{order.created_at ? format(new Date(order.created_at), 'dd MMM yyyy') : 'N/A'}</TableCell>
                <TableCell className="text-center text-black">{order.total_price.toFixed(2)} $</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </Container>
    </Container>
  );
}