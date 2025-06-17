'use client';
import {Box} from '@mui/material';
/* queries */
/* comps */
import {Sidebar} from '@components/sidebar/sidebar';
import SidebarProvider from '@providers/sidebarProvider/provider';
import useSidebarContext from '@providers/sidebarProvider/useSidebarContext';
import {Navbar} from '@components/navbar/navbar';
import {SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED} from '@constants';
import useIsMobile from '@hooks/useIsMobile';

export default function MainPageLayout({children}: {children: React.ReactNode}) {
  const isMobile = useIsMobile();
  const {collapseSidebar} = useSidebarContext();

  const _width = collapseSidebar ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <div className="h-full w-full flex flex-row bg-white">
      <SidebarProvider>
        <Sidebar />
        <Box
          className="flex flex-col flex-grow overflow-x-hidden transition-width ease-in-out delay-150 duration-700"
          sx={{width: !isMobile ? `calc(100% - ${_width}px)` : '100%'}}
        >
          <div className="flex flex-col flex-auto">
            <Navbar />
          </div>
          <main className="w-full h-full flex flex-col flex-auto overflow-y-auto">{children}</main>
        </Box>
      </SidebarProvider>
    </div>
  );
}
