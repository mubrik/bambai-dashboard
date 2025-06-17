import Link from 'next/link';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';

export default function NotFound() {
  return (
    <div className="h-full w-full flex justify-center items-center gap-3 bg-white">
      <ErrorIcon />
      <Typography variant="body1">That page was not found</Typography>
      <Link href="/dashboard">Return Dashboard</Link>
    </div>
  );
}
