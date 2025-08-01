import React from 'react';

export const SidebarGroup = ({ children, title }) => {
  return (
    <div className="mb-4">
      {title && (
        <h3 className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </h3>
      )}
      <div className="py-1 text-md">
        {children}
      </div>
    </div>
  );
};