/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:09:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 14:12:09
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
    '/error/detail': {
      component: dynamicWrapper(app, [], () => import('../../routes/Error/Detail')),
    },
  };
}
