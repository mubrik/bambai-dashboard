'use client';
import {useState} from 'react';
import {Typography, Menu, MenuItem, Skeleton, Divider} from '@mui/material';
import {TESTING_IDS_MAP} from '@constants';
import useSidebarContext from '@providers/sidebarProvider/useSidebarContext';
import useIsMobile from '@hooks/useIsMobile';
/* queries */
import {logoutUser} from '@src/api/actions/authActions';
/* icons */
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  showBackButton?: boolean;
  onBackClick?: () => void;
  renderLeft?: React.ReactNode;
  renderMid?: React.ReactNode;
  renderSearch?: React.ReactNode;
  showDivider?: boolean;
  showSingleSchoolSelect?: boolean;
  sidebarOpen?: boolean;
  showSidebar?: boolean;
  setCollapseSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSidebar?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar = ({
  showBackButton,
  onBackClick,
  renderLeft = null,
  showDivider = true,
  renderSearch = null,
  renderMid = null,
}: Props) => {
  const {showSidebar, setShowSidebar} = useSidebarContext();
  const isMobileScreen = useIsMobile();
  const isLoading = false;
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);

  const [searchExpanded, setSearchExpanded] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick: React.MouseEventHandler<HTMLDivElement | SVGSVGElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderProfileSection = () => {
    if (isMobileScreen) {
      return (
        <>
          {renderSearch ? (
            <>
              {searchExpanded ? (
                <CloseIcon onClick={() => setSearchExpanded(false)} />
              ) : (
                <SearchOutlinedIcon onClick={() => setSearchExpanded(true)} />
              )}
            </>
          ) : null}
          <AccountCircleOutlinedIcon
            aria-label="account menu"
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            data-test={`${TESTING_IDS_MAP.NAVBAR}_menu`}
            className="cursor-pointer"
            height={24}
            id="menu-profile-button"
            onClick={handleClick}
            width={24}
          />
        </>
      );
    }
    return (
      <>
        <AccountCircleOutlinedIcon color="action" sx={{fontSize: 32}} />
        <div
          className="flex flex-col cursor-pointer"
          onClick={handleClick}
          role="button"
          data-test={`${TESTING_IDS_MAP.NAVBAR}_menu`}
        >
          <Typography variant="caption" color="primary">
            {isLoading ? <Skeleton /> : 'Admin'}
          </Typography>
          <div className="flex flex-row items-center">
            <Typography variant="body2" color="textPrimary">
              {isLoading ? <Skeleton /> : 'placeholder'}
            </Typography>
            <ArrowDropDownOutlinedIcon sx={{fontSize: 24}} />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div
        className={`flex flex-row justify-between md:grid md:grid-cols-3
        h-[64px] min-h-[64px] items-center px-2 md:px-4 py-2 relative`}
      >
        {/* left */}
        <div className="ml-12 md:ml-0 overflow-hidden">
          {isMobileScreen ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => setShowSidebar((prev) => !prev)}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                !!showSidebar && {display: 'none'},
              ]}
            >
              <MenuIcon />
            </IconButton>
          ) : null}
          {showBackButton ? (
            <ArrowBackIcon sx={{fontSize: 32}} onClick={onBackClick ?? (() => null)} className={'cursor-pointer'} />
          ) : null}
          {renderLeft && !searchExpanded ? renderLeft : null}
        </div>
        {/* center */}
        <div className="hidden md:flex flex-row justify-center overflow-hidden">
          {renderSearch}
          {renderMid}
        </div>
        {/* right */}
        <div className="flex grow flex-row gap-2 items-center justify-end overflow-hidden">
          {searchExpanded && isMobileScreen ? renderSearch : null}
          {renderProfileSection()}
        </div>
        {/* menu */}
        <Menu
          disableAutoFocusItem
          id="nav-menu"
          anchorEl={anchorEl}
          open={open}
          aria-hidden={false}
          onClose={handleClose}
          slotProps={{
            paper: {
              elevation: 1,
            },
            list: {
              sx: {paddingY: 1, minWidth: '200px'},
            },
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              /* navigate('/user/profile'); */
            }}
            className="mb-2"
            data-test={`${TESTING_IDS_MAP.NAVBAR}_view-profile`}
          >
            <PersonOutlinedIcon sx={{fontSize: 16}} />
            <Typography variant="body2">View Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={async () => {
              handleClose();
              void logoutUser();
            }}
            data-test={`${TESTING_IDS_MAP.NAVBAR}_signout`}
          >
            <LogoutOutlinedIcon color="error" sx={{fontSize: 16}} />
            <Typography color="error" variant="body2">
              Sign Out
            </Typography>
          </MenuItem>
        </Menu>
      </div>
      {showDivider ? <Divider className="w-full" /> : null}
    </>
  );
};
