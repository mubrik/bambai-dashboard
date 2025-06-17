'use client';
import {useCallback} from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {
  Checkbox,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Pagination,
  Select,
  useMediaQuery,
  useTheme,
  SxProps,
} from '@mui/material';
/* comps */
import {TableSkeleton} from './tableSkeleton';
import {ChangeEvent} from 'react';

interface Column {
  headerContent?: string | React.ReactNode;
  columnHeaderSx?: SxProps;
  rowItemSx?: SxProps;
  rowItemClassname?: string;
  align?: 'left' | 'right' | 'center' | 'justify' | 'inherit';
  enableSorting?: boolean;
}

interface Row {
  content: Record<string, unknown>;
  tableOptions: {rowKey: string};
}

export interface TableProps {
  columns: Record<string, Column>;
  enablePagination?: boolean;
  isLoading?: boolean;
  isSelectable?: boolean;
  hasFiltersApplied?: boolean;
  totalNumOfRows?: number;
  page?: number;
  rows?: Row[];
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  selectedRows?: Row[];
  sortBy?: string;
  sortDirection?: 'desc' | 'asc';
  paginateSearchParams?: boolean;
  onRowClick?: (row: Row, event: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => void;
  isRowSelected?: (row: Row) => void;
  customRowStyle?: (row: Row) => SxProps;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pgSize: number) => void;
  onSortChange?: (param: {name: string; direction: string}) => void;
  onAllSelected?: (param: unknown, checked: boolean) => void;
}

const ROWS_PER_PAGE = [10, 20, 50];
const BASE_ROW_ITEM_STYLE = {
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

export function TableMUI({
  columns = {},
  enablePagination = true,
  page = 1,
  rowsPerPage = ROWS_PER_PAGE[0],
  rowsPerPageOptions = ROWS_PER_PAGE,
  totalNumOfRows = 0,
  rows = [],
  selectedRows = [],
  isLoading,
  isSelectable,
  hasFiltersApplied,
  paginateSearchParams = false,
  onPageChange,
  onPageSizeChange,
  onRowClick,
  onSortChange,
  onAllSelected,
  isRowSelected,
  sortBy = '',
  sortDirection = 'desc',
  customRowStyle,
}: TableProps) {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  page = paginateSearchParams && searchParams.has('page') ? parseInt(searchParams.get('page') ?? '1') : page;
  rowsPerPage =
    paginateSearchParams && searchParams.has('perPage') ? parseInt(searchParams.get('perPage') ?? '10') : rowsPerPage;
  sortBy = paginateSearchParams && searchParams.has('sortBy') ? (searchParams.get('sortBy') ?? '') : sortBy;
  sortDirection =
    paginateSearchParams && searchParams.has('sortDirection')
      ? ((searchParams.get('sortDirection') as 'asc' | 'desc') ?? sortDirection)
      : sortDirection;

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (queries: {name: string; value: string}[]) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const _query of queries) {
        params.set(_query.name, _query.value);
      }
      return params.toString();
    },
    [searchParams],
  );

  const handlePaginationPageChange = (_: React.ChangeEvent<unknown> | null, page: number) => {
    if (paginateSearchParams) {
      router.push(pathname + '?' + createQueryString([{name: 'page', value: `${page}`}]));
      return;
    }
    onPageChange?.(page);
  };

  const handleChangeRowsPerPage = (
    event:
      | ChangeEvent<Omit<HTMLInputElement, 'value'> & {value: number}>
      | (Event & {target: {value: number; name: string}}),
  ) => {
    if (paginateSearchParams) {
      router.push(
        pathname +
          '?' +
          createQueryString([
            {name: 'page', value: '1'},
            {name: 'perPage', value: event.target.value.toString()},
          ]),
      );
      return;
    }
    onPageSizeChange?.(parseInt(event.target.value.toString(), 10));
    // reset back to 1st page
    onPageChange?.(1);
  };

  const renderTableHead = () => {
    const _columns = Object.entries(columns);

    return (
      <TableHead>
        <TableRow>
          {isSelectable ? (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={selectedRows.length > 0 && selectedRows.length < rows.length}
                checked={rows.length > 0 && selectedRows.length === rows.length}
                onChange={onAllSelected}
              />
            </TableCell>
          ) : null}
          {_columns.map(([colKey, column]) => {
            return (
              <TableCell key={colKey} sx={{...column.columnHeaderSx, textWrap: 'nowrap'}}>
                {!column.enableSorting ? (
                  column.headerContent
                ) : (
                  <TableSortLabel
                    key={colKey}
                    active={sortBy === colKey}
                    direction={sortDirection}
                    onClick={() => {
                      const _newDir = sortDirection === 'asc' ? 'desc' : 'asc';
                      onSortChange?.({
                        name: colKey,
                        direction: sortBy === colKey ? _newDir : sortDirection,
                      });
                    }}
                  >
                    {column.headerContent}
                  </TableSortLabel>
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  const renderTableRows = () => {
    const _columnKeys = Object.keys(columns);

    return (
      <TableBody>
        {rows.map((row, index) => {
          const _item = row.content;
          const _rowOptions = row.tableOptions;

          const isItemSelected = isSelectable ? !!isRowSelected?.(row) : false;
          // if no row key try and get key form content
          const uniqKey = _rowOptions?.rowKey ?? `${_item._id ?? _item.name ?? _item.fullName}-${index}`;

          return (
            <TableRow
              hover
              tabIndex={-1}
              aria-checked={isItemSelected}
              selected={isItemSelected}
              key={uniqKey}
              className={`${onRowClick ? 'cursor-pointer' : ''}`}
              role={isSelectable ? 'checkbox' : 'listbox'}
              onClick={(event) => {
                onRowClick?.(row, event);
              }}
              sx={customRowStyle ? customRowStyle(row) : undefined}
            >
              {isSelectable ? (
                <TableCell padding="checkbox">
                  <Checkbox checked={isItemSelected} inputProps={{'aria-labelledby': uniqKey}} />
                </TableCell>
              ) : null}
              {_columnKeys.map((column) => {
                const _customClassname = columns[column].rowItemClassname ?? '';
                const _customAlign = columns[column].align;
                const _sxProps = columns[column].rowItemSx ?? {};

                return (
                  <TableCell
                    key={`${column}-${uniqKey}`}
                    className={_customClassname}
                    align={_customAlign}
                    sx={{...BASE_ROW_ITEM_STYLE, ..._sxProps}}
                  >
                    {_item[column] as React.ReactNode}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  const renderPagination = () => {
    const numOfPages = totalNumOfRows <= rowsPerPage ? 1 : Math.ceil(totalNumOfRows / rowsPerPage);

    const skipped = (page - 1) * rowsPerPage;
    const displayRange = `${skipped + 1}-${Math.min(skipped + rowsPerPage, totalNumOfRows)} of ${totalNumOfRows}`;

    return (
      <div className="w-full flex justify-center items-center mt-auto">
        {/* desktop */}
        <div className="hidden md:flex flex-row items-center gap-2">
          <span className="text-subtitle2">Rows:</span>
          <Select value={rowsPerPage} onChange={handleChangeRowsPerPage} size="small">
            {rowsPerPageOptions.map((size) => (
              <MenuItem key={size} value={size}>
                {`${size}`}
              </MenuItem>
            ))}
          </Select>
          {numOfPages > 1 ? <div className="flex py-2 px-3 rounded bg-black/5">{displayRange}</div> : null}
          <Pagination
            shape="rounded"
            showFirstButton
            showLastButton
            count={numOfPages}
            page={page}
            onChange={handlePaginationPageChange}
          />
        </div>
        {/* mobile */}
        <div className="flex md:hidden justify-center items-center">
          {isMobileScreen ? (
            <TablePagination
              component="div"
              count={totalNumOfRows}
              // component is 0 based
              page={page - 1}
              onPageChange={(ev, page) => {
                // component is 0 based add 1 to pg
                handlePaginationPageChange(ev, page + 1);
              }}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(event) => {
                onPageSizeChange?.(parseInt(event.target.value.toString(), 10));
                // reset back to 1st page
                onPageChange?.(1);
              }}
              rowsPerPageOptions={rowsPerPageOptions}
              classes={{selectLabel: 'mb-0', displayedRows: 'mb-0'}}
            />
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className={'w-full h-full flex flex-col gap-4 tiny-scrollbar overflow-y-auto'}>
      <TableContainer>
        {isLoading ? (
          <TableSkeleton />
        ) : rows.length > 0 ? (
          <Table>
            {renderTableHead()}
            {renderTableRows()}
          </Table>
        ) : null}
      </TableContainer>
      {enablePagination && totalNumOfRows ? renderPagination() : null}
      {!isLoading && rows.length === 0 ? (
        <div className="flex flex-col grow justify-center items-center gap-4 p-4">
          <div>No data</div>
          <div className="flex flex-col gap-1">
            <span className="text-p2-regular text-center">No data to show </span>
            {hasFiltersApplied ? (
              <span className="text-p2-regular text-warning mt-2">
                {'You have some filters applied, try clearing them'}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
