/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 16:11:29
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 16:21:04
 */

const selectedAppK = 'lm_SAID';

export function getSeletedAppId() {
  return sessionStorage.getItem(selectedAppK);
}

export function setSelectedAppId(appId) {
  sessionStorage.setItem(selectedAppK, appId);
}

export function clearSelectedAppId() {
  sessionStorage.removeItem(selectedAppK);
}
