/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:09:12
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 11:57:30
 */

export default function(app, dynamicWrapper) {
  return {
    '/error/list': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Error/List')
      ),
    },
    '/error/detailList': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Error/DetailList')
      ),
    },
    '/error/detail': {
      component: dynamicWrapper(app, ['login'], () => import('../../routes/Error/Detail')),
    },
  };
}
