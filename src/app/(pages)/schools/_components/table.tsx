'use client';
import {TableMUI} from '@components/table/table';
import {useGetSchoolsWithFilterSuspense} from '@api/school/queries';
import {PaginatedItem, School} from '@types';

interface TableSectionProps {
  data: PaginatedItem<School>;
}

const BASE_TABLE_COLUMNS = {
  schoolID: {
    headerContent: 'ID',
    enableSorting: true,
    align: 'left',
  },
  name: {
    headerContent: 'Name',
    enableSorting: true,
    rowItemSx: {maxWidth: '20ch'},
    align: 'left',
    rowItemClassname: 'text-primary text-body2',
  },
  code: {
    headerContent: 'Code',
    enableSorting: true,
    align: 'left',
  },
  numOfStudents: {
    headerContent: 'Amount of Students',
    enableSorting: true,
    align: 'left',
  },
  actions: {headerContent: 'Action', align: 'left'},
} as const;

export function SchoolTable({data}: TableSectionProps) {
  const tableData = data?.records?.map((x) => {
    return {
      content: {
        schoolID: x.schoolID,
        name: x.schoolName,
        code: x.schoolCode,
        numOfStudents: x.noOfStudents,
      },
      tableOptions: {
        rowKey: x._id,
        school: x,
      },
    };
  });
  const total = data?.total ?? 0;

  return (
    <TableMUI
      paginateSearchParams
      columns={BASE_TABLE_COLUMNS}
      rows={tableData}
      totalNumOfRows={total}
      enablePagination={total > 10}
    />
  );
}

export function SuspendSchoolTable() {
  const {data} = useGetSchoolsWithFilterSuspense();
  const tableData = data?.records?.map((x) => {
    return {
      content: {
        schoolID: x.schoolID,
        name: x.schoolName,
        code: x.schoolCode,
        numOfStudents: x.noOfStudents,
      },
      tableOptions: {
        rowKey: x._id,
        school: x,
      },
    };
  });
  const total = data?.total ?? 0;

  return (
    <TableMUI
      paginateSearchParams
      columns={BASE_TABLE_COLUMNS}
      rows={tableData}
      totalNumOfRows={total}
      enablePagination={total > 10}
    />
  );
}
