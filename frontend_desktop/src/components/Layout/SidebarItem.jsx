import React from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const SidebarItem = ({ icon, name, to, isSidebarOpen }) => {
  const linkContent = (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const base = 'flex items-center w-full p-2 rounded-md transition-colors duration-200';
        // Add a "justify-center" class when the sidebar is closed
        const alignment = isSidebarOpen ? 'justify-start' : 'justify-center';
        const active = 'bg-primary/10 text-primary';
        const inactive = 'text-foreground hover:bg-muted';
        return `${base} ${alignment} ${isActive ? active : inactive}`;
      }}
    >
      <div className={isSidebarOpen ? "mr-3" : "mr-0"}>{icon}</div>
      {isSidebarOpen && <div className="text-sm font-medium">{name}</div>}
    </NavLink>
  );

  return (
    <div className="my-1 px-2">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>{linkContent}</div>
          </TooltipTrigger>
          {!isSidebarOpen && (
            <TooltipContent side="right" align="center">
              {name}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};