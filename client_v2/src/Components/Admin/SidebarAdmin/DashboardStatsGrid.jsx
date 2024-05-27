import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { contUsers, sumUnitPrice, getTotalSales } from '../../../Routes/routes';
import { IoBagHandle, IoPieChart, IoPeople } from 'react-icons/io5';

export default function DashboardStatsGrid() {
    const [data, setUsers] = useState([]);
    const [dataPrice, setPrice] = useState([]);
    const [dataSales, setSales] = useState([]);

    useEffect(() => {
        fetchDataUsers();
        fetchDataPrice();
        fetchDataTotalSale();
    }, []);

    const fetchDataUsers = async () => {
        try {
            const response = await axios.get(contUsers());
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchDataPrice = async () => {
        try {
            const response = await axios.get(sumUnitPrice());
            setPrice(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchDataTotalSale = async () => {
        try {
            const response = await axios.get(getTotalSales());
            console.log(response.data);
            setSales(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="flex flex-col gap-4 pt-6 md:flex-row">
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
                    <IoBagHandle className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Sales</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{dataSales.total_sales}$</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
                    <IoPieChart className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Expenses</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{dataPrice.total_unit_price}$</strong>
                    </div>
                </div>
            </BoxWrapper>
            <BoxWrapper>
                <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
                    <IoPeople className="text-2xl text-white" />
                </div>
                <div className="pl-4">
                    <span className="text-sm text-gray-500 font-light">Total Customers</span>
                    <div className="flex items-center">
                        <strong className="text-xl text-gray-700 font-semibold">{data.userCount}</strong>
                    </div>
                </div>
            </BoxWrapper>
        </div>
    );
}

function BoxWrapper({ children }) {
    return <div className="bg-white rounded-lg p-4 flex-1 border border-gray-200 flex items-center">{children}</div>;
}
