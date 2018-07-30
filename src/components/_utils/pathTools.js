/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 10:42:07
 * @Last Modified by:   Rhymedys
 * @Last Modified time: 2018-05-30 10:42:07
 */

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => {
    return `/${urllist.slice(0, index + 1).join('/')}`;
  });
}
