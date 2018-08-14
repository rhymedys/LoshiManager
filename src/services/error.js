/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:14:37
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 16:06:46
 */

import { stringify } from 'qs';
import request from '../utils/request';
import { addPagnationParams } from '../utils/utils';

export async function query(code) {
  return request(`/api/${code}`);
}

/**
 * 查询列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function getList(params) {
  return request(`error/getList?${stringify(addPagnationParams(params))}`);
}

/**
 * 查询列表数量
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function getListCount(params) {
  return request(`error/getListCount?${stringify(params)}`);
}
