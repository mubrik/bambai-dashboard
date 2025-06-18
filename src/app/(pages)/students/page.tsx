import {getStudentsWithFiltersQueryOpts} from '@api/student/shared';
import {HydrationTableWrapper} from '@src/components/table/tableSuspenseWrapper';
import {getQueryClient} from '@queryclient';
import {filterParamsToUrlQuery} from '@src/utils/helpers';
import {SuspenseStudentTable} from './_components/table';

export default async function StudentsPage({
  searchParams,
}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}) {
  const params = await searchParams;
  const keyString = filterParamsToUrlQuery(params);
  // prefetch the query on server side
  const qc = getQueryClient();
  qc.prefetchQuery(getStudentsWithFiltersQueryOpts(params));

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <div className="flex flex-row gap-2">
        <p>hello students</p>
      </div>
      {/* prefetched query and pending promise from server side is dehdrated on client */}
      <HydrationTableWrapper key={keyString} queryClient={qc}>
        <SuspenseStudentTable />
      </HydrationTableWrapper>
    </div>
  );
}
