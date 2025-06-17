'use client';
import {useContext, createContext} from 'react';

// create sidebar context
interface SidebarContextProps {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  collapseSidebar: boolean;
  setCollapseSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextProps | undefined>({
  showSidebar: true,
  setShowSidebar: () => null,
  collapseSidebar: false,
  setCollapseSidebar: () => null,
});

function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
}

export default useSidebarContext;
