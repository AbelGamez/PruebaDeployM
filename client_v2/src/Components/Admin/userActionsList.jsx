import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Spinner, Chip, Pagination } from '@nextui-org/react';

import Container from '../General/Container';
import { listUserActions } from '../../Routes/routes';

function UserActionsList() {
    const [userActionsLog, setUserActionsLog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [actionsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // Simulación de un retraso de 1 segundos antes de realizar la solicitud.
        setTimeout(async () => {
            setIsLoading(true); // Establece isLoading a true al iniciar la carga de datos.
            try {
                const response = await axios.get(listUserActions());
                console.log('Colección de acciones de usuario: ', response.data);
                // Ordenar los datos por la fecha más reciente
                const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setUserActionsLog(sortedData);
            } catch (error) {
                console.error('Error fetching user actions: ', error);
            } finally {
                // Establece isLoading a false después de cargar los datos (incluso si hay un error).
                setIsLoading(false);
            }
        }, 1000); // Espera 1000 milisegundos (1 segundos) antes de realizar la solicitud.
    }

    const actionTypeColorMap = {
        Edit: "primary",
        Create: "success",
        Delete: "danger"
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('es-ES');
    }

    // Calcular el índice del último registro de acción en la página actual
    const indexOfLastAction = currentPage * actionsPerPage;

    // Calcular el índice del primer registro de acción en la página actual
    const indexOfFirstAction = indexOfLastAction - actionsPerPage;

    // Obtener las acciones de usuario de la página actual
    const currentActions = userActionsLog.slice(indexOfFirstAction, indexOfLastAction);
    
    // Calcular el número total de páginas
    const totalPages = Math.ceil(userActionsLog.length / actionsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <Container className='w-[90%] mx-auto mt-20'>
                <h1 className='text-3xl font-semibold mb-10 text-black'>Admin user action log</h1>
                <Table aria-label='User Actions Log'>
                    <TableHeader>
                        <TableColumn className="text-center text-black font-bold">USERNAME</TableColumn>
                        <TableColumn className="text-center text-black font-bold">PRODUCT NAME</TableColumn>
                        <TableColumn className="text-center text-black font-bold">CATEGORY</TableColumn>
                        <TableColumn className="text-center text-black font-bold">STATTRAK</TableColumn>
                        <TableColumn className="text-center text-black font-bold">FLOAT</TableColumn>
                        <TableColumn className="text-center text-black font-bold">PRICE</TableColumn>
                        <TableColumn className="text-center text-black font-bold">ACTION TYPE</TableColumn>
                        <TableColumn className="text-center text-black font-bold">CREATED AT</TableColumn>
                    </TableHeader>
                    <TableBody
                        isLoading={isLoading}
                        loadingContent={<Spinner size='lg' color="primary" />}
                        emptyContent={"No rows to display."}>
                        {currentActions.map((action) => (
                            <TableRow key={action.id}>
                                <TableCell className="text-center text-black">{action.user.nickname}</TableCell>
                                <TableCell className="text-center text-black">{action.stock.product.name} | {action.stock.product.pattern}</TableCell>
                                <TableCell className="text-center text-black">{action.stock.product.category}</TableCell>
                                <TableCell className="text-center text-black">{action.stock.stattrak === 0 ? 'Without Stattrak' : 'Stattrak'}</TableCell>
                                <TableCell className="text-center text-black">{action.stock.float} %</TableCell>
                                <TableCell className="text-center text-black">{action.stock.unit_price} $</TableCell>
                                <TableCell className="text-center text-black">
                                    <Chip color={actionTypeColorMap[action.action_type]} variant="flat">{action.action_type}</Chip>
                                </TableCell>
                                <TableCell className="text-center text-black">{formatDate(action.created_at)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Container className="flex justify-center mt-4">
                    <Pagination
                        showControls
                        showShadow
                        total={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                    />
                </Container>
            </Container>
            
        </>
    );
}

export default UserActionsList;