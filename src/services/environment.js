/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:42:51
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 11:43:46
 */

import { stringify } from 'querystring';
import request from '../utils/request';

/**
 * 查询当前url访问的环境配置
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function queryUrlEnvironmentByType(params) {
  return request(`environment/queryUrlEnvironmentByType?${stringify(params)}`);
}
