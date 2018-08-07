/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:39:35
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 15:08:05
 */

import { stringify } from 'qs';
import request from '../utils/request';
import { addPagnationParams } from '../utils/utils';

/**
 * 通过url查询情况
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function queryPagesByUrl(params) {
  return request(`pages/queryPagesByUrl?${stringify(addPagnationParams(params))}`);
}

/**
 * 根据AppId查询受访地址信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function queryAllPagesUrlByAppId(params) {
  return request(`pages/queryAllPagesUrlByAppId?${stringify(addPagnationParams(params))}`);
}
