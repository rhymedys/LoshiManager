/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 16:11:29
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 11:21:44
 */

const selectedAppK = 'lm_SAID';

export function getSeletedAppId() {
  return localStorage.getItem(selectedAppK);
}

export function setSelectedAppId(appId) {
  localStorage.setItem(selectedAppK, appId);
}

export function clearSelectedAppId() {
  localStorage.removeItem(selectedAppK);
}
