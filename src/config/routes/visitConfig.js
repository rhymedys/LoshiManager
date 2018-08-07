/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:51:51
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 16:34:38
 */
export default function(app, dynamicWrapper) {
  return {
    '/visit/list': {
      component: dynamicWrapper(app, ['pagnationList'], () => import('../../routes/Visit/List')),
    },
    '/visit/detail': {
      component: dynamicWrapper(app, ['pagnationList'], () => import('../../routes/Visit/Details')),
    },
  };
}
