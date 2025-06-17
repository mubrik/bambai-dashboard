import {Typography} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface GoBackProps {
  title: string;
  onPress?: () => void;
}

function GoBack({title, onPress}: GoBackProps) {
  return (
    <div
      className="flex flex-row gap-1 items-center self-start cursor-pointer"
      onClick={(ev) => {
        ev.stopPropagation();
        onPress?.();
      }}
    >
      <ArrowBackIcon color="primary" />
      <Typography variant="body1" color="primary">
        {title}
      </Typography>
    </div>
  );
}

export default GoBack;
