import {HydrationTableWrapper} from '@src/components/table/tableSuspenseWrapper';
import {getSchoolsWithFiltersQueryOpts} from '@api/school/shared';
import {getQueryClient} from '@queryclient';
import {SuspendSchoolTable} from './_components/table';
import type {SearchParams} from '@src/types';

export default async function SchoolsPage({searchParams}: {searchParams: SearchParams}) {
  const params = await searchParams;
  const qc = getQueryClient();

  qc.prefetchQuery(getSchoolsWithFiltersQueryOpts(params));

  return (
    <div>
      <p>Placeholder</p>
      <HydrationTableWrapper queryClient={qc}>
        <SuspendSchoolTable />
      </HydrationTableWrapper>
    </div>
  );
}
