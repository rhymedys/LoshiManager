/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-10 09:15:30
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 09:16:13
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
export async function queryList(params) {
  return request(`slowResource/queryList?${stringify(addPagnationParams(params))}`);
}
