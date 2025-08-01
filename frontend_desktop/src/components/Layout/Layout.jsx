import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


// --- UI & Icons ---
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Toaster } from "@/components/ui/sonner";
import { ChevronLeft, ChevronRight, LogOutIcon } from 'lucide-react';

// --- Custom Sidebar Components ---
import { SidebarGroup } from './SidebarGroup';
import { SidebarItem } from './SidebarItem';
import { SidebarItemGroup } from './SidebarItemGroup';
import { menuItems } from './menuItems';


const Layout = () => {
    const savedSidebarState = Cookies.get("sidebarState");
    const [isSidebarOpen, setIsSidebarOpen] = useState(savedSidebarState ? JSON.parse(savedSidebarState) : true);

    const toggleSidebar = () => {
        const newSidebarState = !isSidebarOpen;
        setIsSidebarOpen(newSidebarState);
        Cookies.set("sidebarState", JSON.stringify(newSidebarState), { expires: 7 });
    };

    return (
        <div className="flex h-screen bg-muted/40">
            {/* Advanced Sidebar */}
            <div id="sidebar" className={`flex flex-col bg-background border-r transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
                <div className="flex flex-col h-full">
                    <div className="h-16 flex items-center justify-center font-bold text-xl mb-4">
                        {isSidebarOpen ? 'PRINTIFY' : 'P'}
                    </div>

                    <nav id="sidebar-items" className="flex-1 overflow-y-auto">
                        {menuItems.map((group, index) => (
                            <SidebarGroup key={index} title={isSidebarOpen ? group.title : ''}>
                                {group.items.map((item, idx) =>
                                    <SidebarItem key={idx} to={item.to} icon={item.icon} name={item.name} isSidebarOpen={isSidebarOpen} />
                                )}
                            </SidebarGroup>
                        ))}
                    </nav>

                    <div className='w-full flex justify-end p-2'>
                        <button onClick={toggleSidebar} className="bg-muted rounded-full p-2 hover:bg-muted-foreground/20">
                            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 flex items-center justify-end px-6 border-b">
                    <UserAccountDropdown />
                </header>
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                    <Toaster closeButton={true} />
                </main>
            </div>
        </div>
    );
};

export default Layout;


// --- User Dropdown Component ---
function UserAccountDropdown() {
    const navigate = useNavigate();
    const user = { name: "Shop Owner", email: "owner@printify.com" };

    const handleLogout = () => {
        console.log("Logging out...");
        navigate('/login');
    };

    const userInitials = user.name ? user.name.slice(0, 2).toUpperCase() : "SO";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                    <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/settings')}>Profile</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}