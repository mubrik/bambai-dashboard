import {useMediaQuery, useTheme} from '@mui/material';

function useIsMobile() {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));
  return isMobileScreen;
}

export default useIsMobile;
