import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';
import {REGEX_PATTERNS} from '@constantsDir/index';
import {QueryFilterParams} from '@types';

/**
 * tailwind merge utility
 */
export function cn(...inputs: unknown[]) {
  return twMerge(clsx(inputs));
}

/**
 * Function returns a wellformatted string from url params
 */
export function filterParamsToUrlQuery(params: QueryFilterParams) {
  const queryParams = new URLSearchParams();

  if (params?.tags?.length) {
    queryParams.append('tags', params.tags.join(','));
  }
  if (params?.region) {
    queryParams.append('region', params.region);
  }
  if (params?.district) {
    queryParams.append('district', params.district);
  }
  if (params?.page) {
    queryParams.append('page', params.page.toString());
  }
  if (params?.perPage) {
    queryParams.append('perPage', params.perPage.toString());
  }
  if (params.sortColumn) {
    queryParams.append('sortColumn', params.sortColumn);
  }
  if (params.sortDirection) {
    queryParams.append('sortDirection', params.sortDirection);
  }
  if (params.gender) {
    queryParams.append('gender', params.gender);
  }

  return queryParams.toString();
}

/**
 * Function returns a wellformatted id for inputs using their name and label
 */
export function getTestIdFromNameLabel(type: string, label: React.ReactNode | string): string {
  const fmtName = type.toLocaleLowerCase().replace(REGEX_PATTERNS.notALetterOrNumGlobal, '').trim() || 'test-name';

  let fmtLabel = 'test-label';
  if (typeof label === 'string') {
    fmtLabel = label.toLocaleLowerCase().replace(REGEX_PATTERNS.notALetterOrNumGlobal, '').trim();
  }

  return `${fmtName}_${fmtLabel}`;
}
