import {getFilteredSchools} from '@src/api/stream/school';
import {SchoolTable} from './_components/table';

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}) {
  const schools = await getFilteredSchools({searchParams});

  if (schools.error || !schools.data) {
    return <div>An Error Occured</div>;
  }

  return <SchoolTable data={schools.data} />;
}
