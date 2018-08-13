/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-10 09:15:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 09:51:04
 */

import { stringify } from 'qs';
import request from '../utils/request';
import { addPagnationParams } from '../utils/utils';

/**
 * 查询列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function querListByUrl(params) {
  return request(`slowPages/querListByUrl?${stringify(addPagnationParams(params))}`);
}

/**
 * 查询列表数量
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function querListCountByUrl(params) {
  return request(`slowPages/querListCountByUrl?${stringify(params)}`);
}
