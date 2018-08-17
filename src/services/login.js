/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 11:55:37
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 10:53:12
 */

import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('login', {
    method: 'POST',
    body: params,
  });
}

export async function fakeAccountLogout() {
  return request('logout');
}
