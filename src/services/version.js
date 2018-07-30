/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-12 16:45:27
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-06-22 15:27:28
 */


import { stringify } from 'qs';
import request from '../utils/request';
import {addPagnationParams} from '../utils/utils'

/**
 *获取app版本列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function getVersionList(params) {
  return request(`manager/version/getVersionList?${stringify(addPagnationParams(params))}`);
}

/**
 *获取上个版本号
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function getLatestVersionNum(params) {
  return request(`manager/version/getLatestVersionNum?${stringify(addPagnationParams(params))}`);
}


/**
 *查看版本详情
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function getVersionDetail(params) {
  return request(`manager/version/getVersionDetail?${stringify(params)}`);
}

/**
 *新建版本
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function createNewVersion(params) {
  return request('manager/version/createNewVersion',{
    method:'POST',
    ...params,
  });
}

/**
 *删除草稿状态的版本
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function deleteDraftVersion(params) {
  return request(`manager/version/deleteVersion`,{
    method:'POST',
    ...params,
  });
}

/**
 *安卓上传安装包系统文件
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateAndroidApk(params) {
  return request(`manager/version/updateAndroidApk`,{
    method:'POST',
    ...params,
  });
}

/**
 * 更新版本状态
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateVersionStatus(params) {
  return request(`manager/version/updateVersionStatus`,{
    method:'POST',
    ...params,
  });
}

/**
 *编辑版本
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function updateVersionDetail(params) {
  return request(`manager/version/updateVersionDetail`,{
    method:'POST',
    ...params,
  });
}

/**
 * 检查是否已经存在一个草稿
 *
 * @export
 * @param {*} params
 * @returns
 */
export async function checkDraftVersionExist(params) {
  return request(`manager/version/checkDraftVersionExist?${stringify(params)}`);
}
