/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:09:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 17:43:52
 */

export default function(app, dynamicWrapper) {
  return {
    '/error/list': {
      component: dynamicWrapper(app, ['pagnationList'], () => import('../../routes/Error/List')),
    },
    '/error/detailList': {
      component: dynamicWrapper(app, ['pagnationList'], () =>
        import('../../routes/Error/DetailList')
      ),
    },
  };
}
