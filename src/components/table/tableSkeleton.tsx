import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton} from '@mui/material';

export function TableSkeleton() {
  return (
    <TableContainer className="tw-p-4" component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Skeleton variant="rectangular" width={24} height={24} />
            </TableCell>
            {Array.from(new Array(4)).map((_, index) => (
              <TableCell key={index}>
                <Skeleton variant="text" width={100} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from(new Array(10)).map((_, index) => (
            <TableRow key={index}>
              <TableCell padding="checkbox">
                <Skeleton variant="rectangular" width={24} height={24} />
              </TableCell>
              {Array.from(new Array(4)).map((_, index) => (
                <TableCell key={index}>
                  <Skeleton variant="text" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
