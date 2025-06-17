'use client';

import {useState} from 'react';
import {SidebarContext} from './useSidebarContext';
import useIsMobile from '@hooks/useIsMobile';

function SidebarProvider({children}: {children: React.ReactNode}) {
  const isMobile = useIsMobile();
  const [showSidebar, setShowSidebar] = useState(true);
  const [collapseSidebar, setCollapseSidebar] = useState(false);

  return (
    <SidebarContext.Provider
      value={{showSidebar, setShowSidebar, collapseSidebar: !isMobile && collapseSidebar, setCollapseSidebar}}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export default SidebarProvider;
