import {isUserAuthenticated} from '@api/serverUtils';
import MainPageLayout from './_components/mainPageLayout';

export default async function PagesLayout({children}: {children: React.ReactNode}) {
  // this wil halt rendering of the whole page, so make sure any await here is super snappy
  // this will not rerun on client navigation but will on reload
  await isUserAuthenticated();
  return <MainPageLayout>{children}</MainPageLayout>;
}
