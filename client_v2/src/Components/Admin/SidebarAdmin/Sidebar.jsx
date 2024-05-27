import { useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar, Tooltip, Button } from "@nextui-org/react";
import { AcmeLogo } from '../../General/AcmeLogo';

import SettingIcon from '../../../Assets/settingsIcon';
import AdminIcon from '../../../Assets/adminIcon'
import ManagementIcon from '../../../Assets/managementIcon'
import IconBillLine from '../../../Assets/bills';
import AddProductIcon from '../../../Assets/addProductIcon';
import MyAccountIcon from '../../../Assets/myAccountIcon';
import TransactionsHistoryIcon from '../../../Assets/transactionsHistoryIcon';
import LogoutIcon from '../../../Assets/logoutIcon';
import UserActionsLogIcon from '../../../Assets/userActionsLogIcon';

const Sidebar = ({ setActiveComponent }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/pistols');
  };

  return (
    <>
      <div className="h-screen flex transition-all duration-300 overflow-y-auto pr-28">
        <aside className="flex flex-col items-center bg-black bg-opacity-80 text-white shadow fixed h-full w-20">
          <div className="h-16 flex items-center w-full">
            <Tooltip content="Home" placement="right" offset={30} className='bg-[#3b3b3b]'>
              <Link to='/' className="h-6 mx-auto">
                <AcmeLogo />
              </Link>
            </Tooltip>
          </div>

          <ul className="w-full">
            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('Home')}>
              <Tooltip content="Dashboard" placement="right" className='bg-[#3b3b3b]'>
                <div className='h-16 px-6 flex justify-center items-center w-full focus:text-orange-500'>
                  <SettingIcon />
                </div>
              </Tooltip>
            </li>

            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('Users')} >
              <Tooltip content="User & Privilege Control" placement="right" className='bg-[#3b3b3b]'>
                <div className='h-16 px-6 flex justify-center items-center w-full'>
                  <AdminIcon />
                </div>
              </Tooltip>
            </li>

            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('ActionsLog')} >
              <Tooltip content="User Actions Log" placement="right" className='bg-[#3b3b3b]'>
                <div className='h-16 px-6 flex justify-center items-center w-full'>
                  <UserActionsLogIcon />
                </div>
              </Tooltip>
            </li>

            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('Product')} >
              <Tooltip content="Product Management" placement="right" className='bg-[#3b3b3b]'>
                <div className='h-16 px-6 flex justify-center items-center w-full'>
                  <ManagementIcon />
                </div>
              </Tooltip>
            </li>
            <li className="hover:bg-[#3b3b3b]"  >

            </li>
            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('AddProduct')}>
              <Tooltip content="Add Product" placement="right" className='bg-[#3b3b3b]'>
                <Link to={`/settings/product-management/add/`}>

                  <div className='h-16 px-6 flex justify-center items-center w-full'>
                    <AddProductIcon />
                  </div>
                </Link>

              </Tooltip>
            </li>

            <li className="hover:bg-[#3b3b3b]" onClick={() => setActiveComponent('Facturas')}>
              <Tooltip content="Orders List" placement="right" className='bg-[#3b3b3b]'>
                <div className='h-16 px-6 flex justify-center items-center w-full'>
                  <IconBillLine className='' />
                </div>
              </Tooltip>
            </li>
          </ul>

          <div className="mt-auto h-16 flex items-center w-full">
            {/* Action Section */}
            <div className='flex items-center relative w-full pl-6 pb-6'>
              <div className='flex items-center'>
                <Dropdown className='bg-black' placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="primary"
                      size="sm"
                      src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      {user && <p className="font-semibold">{user.email}</p>}
                    </DropdownItem>
                    <DropdownItem key="my_account">
                      <Link to="/myAccount" className="flex items-center">
                        <MyAccountIcon className="mr-2" /> My Account
                      </Link>
                    </DropdownItem>
                    {/* {user.admin === 1 && (
                      <DropdownItem key="dashboard">
                        <Link to="/Dashboard" className="flex items-center">
                          <SettingIcon className='mr-2'/>Dashboard</Link>
                      </DropdownItem>
                    )} */}
                    <DropdownItem key="transaction_History">
                      <Link to="/ListFacturasUser" className="flex items-center">
                        <TransactionsHistoryIcon className="mr-2" />Transaction history
                      </Link>
                    </DropdownItem>
                    <DropdownItem key="logout" color="danger" >
                      <Link onClick={handleLogout} className='flex items-center'>
                        <LogoutIcon className="ml-0.5 mr-1.5" />Log Out
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

            </div>
          </div>
        </aside>
      </div>
    </>
  );

};

export default Sidebar;
