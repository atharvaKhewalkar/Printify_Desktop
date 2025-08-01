import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const SidebarItemGroup = ({ children, name, icon, isSidebarOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  // This component only renders fully if the sidebar is open
  if (!isSidebarOpen) {
    return (
      <div className="my-1 px-2">
        <div className="flex items-center justify-center w-full p-2">
          {icon}
        </div>
      </div>
    );
  }

  return (
    <div className="my-1 px-2">
      <div
        className="flex items-center justify-between w-full p-2 rounded-md cursor-pointer hover:bg-muted"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <div className="mr-3">{icon}</div>
          <div className="text-sm font-medium">{name}</div>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && <div className="ml-5 mt-1 border-l border-muted-foreground/20 pl-3">{children}</div>}
    </div>
  );
};