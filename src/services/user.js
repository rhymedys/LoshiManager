import request from '../utils/request';

export async function query() {
  return request('api/users');
}

/**
 * 查询当前用户信息
 *
 * @export
 * @returns
 */
export async function queryCurrent() {
  return request('user/query');
}
