import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function RouteLoader() {
  return (
    <div className="h-full w-full flex justify-center items-center gap-3 bg-white">
      <CircularProgress />
      <Typography variant="body1">Loading Bambai Control Panel ...</Typography>
    </div>
  );
}
