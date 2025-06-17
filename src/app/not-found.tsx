import Link from 'next/link';
import {MuiButton} from '@components/button/button';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';

export default function NotFound() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-3 bg-white">
      <ErrorIcon fontSize="large" color="error" />
      <Typography variant="body1">That page was not found</Typography>
      <Link href="/login">
        <MuiButton variant="text">Return Login</MuiButton>
      </Link>
    </div>
  );
}
