/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-30 11:55:37
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-30 11:56:12
 */


import { stringify } from 'qs';
import request from '../utils/request';

export async function fakeAccountLogin(params) {
  return request('login', {
    method: 'POST',
    body: params,
  });
}
