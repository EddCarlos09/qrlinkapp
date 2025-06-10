import React, { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { LogOut, UserCircle } from 'lucide-react';
import ConfirmModal from '../../components/utils/ConfirmModal';


const Header = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirige al login
    setIsConfirmModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsConfirmModalOpen(true);
  };



  return (
  <header className="bg-green-600 text-white p-4 shadow-md">
    <h1 className="text-xl font-bold">QRLinkApp</h1>
    
    {/* <button
        onClick={handleConfirmLogout}
        className="flex items-center gap-2 bg-red-100 text-red-600 border border-red-300 px-3 py-2 rounded-full hover:bg-red-200 transition duration-200"
      >
        <LogOut size={18} />
        <span className="text-sm font-medium">Cerrar sesión</span>
      </button> */}
<div className="relative">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 transition">
            <UserCircle size={24} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white border rounded-md shadow-md py-1 w-40"
            sideOffset={5}
          >
            <DropdownMenu.Item
              onClick={handleConfirmLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer"
            >
              <LogOut size={16} />
              Cerrar sesión
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
      </div>
    <ConfirmModal
        isOpen={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onConfirm={handleLogout}
        message="¿Está seguro de cerrar sesión?"
      />
  </header>
  );
}

export default Header;