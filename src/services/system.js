/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-01 11:23:38
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-01 13:42:22
 */
import {stringify} from 'qs';
import request from '../utils/request';

/**
 * 创建应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function createSystem(params) {
  return request('system/create',{
    method:'POST',
    params,
  })
}


/**
 * 更新应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateSystem(params){
  return request('system/update',{
    method:'POST',
    params,
  })
}


/**
 * 删除应用
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function deleteSystem(params){
  return request(`system/delete?${stringify(params)}`)
}
