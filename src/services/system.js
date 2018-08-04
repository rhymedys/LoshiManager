/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-01 11:23:38
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-04 22:19:16
 */
import { stringify } from 'qs';
import request from '../utils/request';
import { addPagnationParams } from '../utils/utils';

/**
 * 创建应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function createSystem(params) {
  return request('system/create', {
    method: 'POST',
    ...params,
  });
}

/**
 * 更新应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateSystem(params) {
  return request('system/update', {
    method: 'POST',
    ...params,
  });
}

/**
 * 删除应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function deleteSystem(params) {
  return request(`system/delete?${stringify(params)}`);
}

/**
 * 查询当前用户所有应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function queryByCurrentUser(params) {
  return request(`system/queryByCurrentUser?${stringify(addPagnationParams(params))}`);
}
