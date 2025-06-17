import {TableSkeleton} from '@src/components/table/tableSkeleton';
import {StudentTableSection} from './_components/table';
import {TableAsync} from './_components/suspendTable';
import {getFilteredStudents} from '@serverStream/students';
import {Suspense} from 'react';

/* export const experimental_ppr = true */

/* async function TableSuspense({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const getter2 = await getFilteredStudents({ searchParams });

  if (getter2.error) {
    return <div> an error occured</div>
  }

  return (
      <StudentTableSection data={getter2.data!} />
  );
} */

export default function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}) {
  /* const params = await searchParams */
  /* console.log("params", params); */
  const getter2 = getFilteredStudents({searchParams});

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <p>hello students</p>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <StudentTableSection searchParams={searchParams} getData={getter2} />
      </Suspense>
    </div>
  );
}
