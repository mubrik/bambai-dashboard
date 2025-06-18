'use client';
import React, {useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Drawer, Typography, IconButton, Chip, Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import {cn} from '@utils/helpers';
import {SIDEBAR_WIDTH, SIDEBAR_WIDTH_COLLAPSED} from '@constants';
import useSidebarContext from '@providers/sidebarProvider/useSidebarContext';
import useIsMobile from '@hooks/useIsMobile';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupIcon from '@assets/svgs/group.svg';
import HomeIcon from '@assets/svgs/home.svg';
import PackageIcon from '@assets/svgs/package.svg';
import SchoolIcon from '@assets/svgs/school.svg';
import Image from 'next/image';

const transitionDuration = 700;

interface SidebarItemProps {
  name: string;
  icon?: string;
  subItems?: {name: string; path: string; icon?: string}[];
  path?: string;
  onPress?: () => void;
  isCollapsed?: boolean;
}

const SIDEBAR_ITEMS: SidebarItemProps[] = [
  {name: 'Dashboard', path: '/dashboard', icon: HomeIcon},
  {name: 'Projects', path: '/projects', icon: PackageIcon},
  {name: 'Schools', path: '/schools', icon: SchoolIcon},
  {name: 'Students', path: '/students?page=1', icon: SchoolIcon},
  {
    name: 'Users',
    icon: GroupIcon,
    subItems: [
      {name: 'School', path: '/users/students'},
      {name: 'Non-School', path: '/users/teachers'},
    ],
  },
];

function SidebarLink({name, path, icon, isCollapsed, onPress}: SidebarItemProps) {
  const pathname = usePathname();
  const isActive = !!(path && path === pathname);

  return (
    <Link
      key={name}
      href={path!}
      className={cn(
        'flex flex-row justify-start items-center p-2 rounded gap-2 transition-all duration-500',
        'hover:bg-sidebar-item-bg rounded',
        isCollapsed && 'justify-center p-0',
        isActive && 'bg-sidebar-item-bg',
      )}
      onClick={onPress}
    >
      <>
        {icon ? (
          <Image
            src={icon}
            className="text-2xl"
            style={{
              stroke: isActive && isCollapsed ? '#6577FF' : '',
            }}
            alt="icon"
          />
        ) : null}
        {!isCollapsed ? <Typography variant="body2">{name}</Typography> : null}
      </>
    </Link>
  );
}

const SidebarItem = ({name, path, subItems, icon, isCollapsed, onPress}: SidebarItemProps) => {
  if (!path && subItems?.length) {
    if (isCollapsed) {
      return <Image src={icon ?? ''} className="text-2xl" alt="icon" />;
    }

    return (
      <Accordion
        slotProps={{
          root: {
            elevation: 0,
          },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="flex flex-row justify-start items-center p-2 m-0"
          slotProps={{
            root: {
              className: cn('bg-transparent hover:bg-sidebar-item-bg rounded'),
            },
            content: {
              className: 'flex flex-row justify-start items-center gap-2 m-0',
            },
          }}
          sx={{
            'minHeight': '40px',
            '&.Mui-expanded': {
              minHeight: '40px',
            },
          }}
        >
          <Image src={icon ?? ''} className="text-2xl" alt="icon" />
          <Typography component="span" variant="body2">
            {name}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subItems.map((subItem) => (
            <SidebarLink
              key={subItem.name}
              name={subItem.name}
              path={subItem.path!}
              icon={subItem.icon}
              isCollapsed={isCollapsed}
              onPress={onPress}
            />
          ))}
        </AccordionDetails>
      </Accordion>
    );
  }

  return <SidebarLink name={name} path={path} icon={icon} isCollapsed={isCollapsed} onPress={onPress} />;
};

export const Sidebar = () => {
  const {showSidebar, setShowSidebar, setCollapseSidebar, collapseSidebar: isCollapsed} = useSidebarContext();
  const [isHovered, setIsHovered] = useState(false);
  const [hoverClicked, setHoverClicked] = useState(false);

  const isMobile = useIsMobile();

  const toggleDrawer = () => {
    setHoverClicked(true);
    setIsHovered(false);
    setCollapseSidebar?.((prev) => !prev);
  };

  const handleMouseEnter = () => {
    if (hoverClicked) {
      setHoverClicked(false);
      return;
    }

    setIsHovered(true);
    if (isCollapsed) {
      setCollapseSidebar?.(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const _width = isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH;

  return (
    <Drawer
      className={'relative'}
      slotProps={{
        paper: {
          sx: {
            width: `${_width}px`,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            px: isCollapsed ? 2 : 1,
            py: isCollapsed ? 2 : 3,
            overflow: 'visible',
            transition: `width ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          },
          onMouseEnter: () => handleMouseEnter(),
          onMouseLeave: () => handleMouseLeave(),
        },
      }}
      sx={{
        width: `${_width}px`,
        transition: `width ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
      open={isMobile ? showSidebar : true}
      variant={isMobile ? 'temporary' : 'permanent'}
      anchor="left"
      onClose={() => {
        if (isMobile) {
          setShowSidebar?.(false);
        }
      }}
      ModalProps={{keepMounted: true}}
    >
      {!isCollapsed ? (
        <div className={'flex flex-row items-center gap-2'}>
          <Typography variant="h5" className="px-2">
            Bambai
          </Typography>
          <Chip color="warning" size="small" variant="outlined" label="Admin" />
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        {!isCollapsed ? (
          <Typography variant="label" color="textSecondary" className="px-2">
            Control Panel
          </Typography>
        ) : null}
        <ul className={cn('flex flex-col gap-4 px-2', isCollapsed && 'px-0')}>
          {SIDEBAR_ITEMS.map((sb) => (
            <SidebarItem key={`${sb.name}-${sb.path}`} isCollapsed={isCollapsed} {...sb} />
          ))}
        </ul>
      </div>
      {!isCollapsed && isHovered && !isMobile && (
        <IconButton
          onMouseEnter={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
          }}
          onClick={() => toggleDrawer()}
          className="hover:bg-primary hover:text-white"
          sx={{
            position: 'absolute',
            width: '30px',
            height: '30px',
            top: '20px',
            left: `${_width}px`,
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            transition: `left ${transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {isCollapsed ? <ChevronRightIcon sx={{fontSize: '20px'}} /> : <ChevronLeftIcon sx={{fontSize: '20px'}} />}
        </IconButton>
      )}
    </Drawer>
  );
};
