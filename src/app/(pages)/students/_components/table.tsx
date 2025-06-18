"use client"
import {TableMUI} from '@components/table/table';
import {useGetStudentsWithFilterSuspense} from '@src/api/student/queries';


const BASE_TABLE_COLUMNS = {
  studentID: {
    headerContent: 'ID',
    enableSorting: true,
    align: 'left',
  },
  fullName: {
    headerContent: 'Name',
    enableSorting: true,
    rowItemSx: {maxWidth: '20ch'},
    align: 'left',
    rowItemClassname: 'text-primary text-body2',
  },
  gender: {
    headerContent: 'Gender',
    enableSorting: true,
    align: 'left',
  },
  schoolName: {
    headerContent: 'School',
    enableSorting: true,
    align: 'left',
  },
  mobileNumber: {
    headerContent: 'Mobile No (Whatsapp)',
    enableSorting: true,
    align: 'left',
  },
  dob: {
    headerContent: 'DOB',
    enableSorting: true,
    align: 'left',
  },
  actions: {headerContent: 'Action', align: 'left'},
} as const;

export function SuspenseStudentTable({}) {
  const {data} = useGetStudentsWithFilterSuspense();

  const tableData = data?.records?.map((x) => {
    return {
      content: {
        studentID: x.studentID,
        fullName: x.fullName,
        schoolName: x?.school?.schoolName,
        class: x.class,
        gender: x.gender,
        mobileNumber: x.mobileNumber,
      },
      tableOptions: {
        rowKey: x._id,
        student: x,
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
