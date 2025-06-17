import {Button, ButtonProps, CircularProgress} from '@mui/material';
import {TESTING_IDS_MAP} from '@constantsDir/index';
import {getTestIdFromNameLabel} from '@utils/helpers';

interface MuiButtonProps extends ButtonProps {
  isLoading?: boolean;
  testID?: string;
}

export function MuiButton({
  children,
  disabled = false,
  isLoading = false,
  startIcon,
  type = 'button',
  testID = '',
  ...rest
}: MuiButtonProps) {
  return (
    <Button
      variant="contained"
      disabled={disabled || isLoading}
      startIcon={isLoading ? <CircularProgress color="primary" size={16} /> : startIcon}
      type={type}
      data-test={testID || getTestIdFromNameLabel(TESTING_IDS_MAP.BUTTON, children)}
      {...rest}
    >
      {children}
    </Button>
  );
}
