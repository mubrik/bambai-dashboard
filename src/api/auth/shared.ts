import {queryOptsFactory} from '../shared/queryOptionsFactory';
import {API_ENDPOINTS} from '@endpoints';
import {QUERY_KEYS} from '@src/constants/queryKeys';
import type {User} from '@src/types';

export function getAuthUserQueryOpts() {
  return queryOptsFactory<User>({
    queryKey: QUERY_KEYS.AUTH.ME,
    url: API_ENDPOINTS.AUTH.ME,
  });
}
