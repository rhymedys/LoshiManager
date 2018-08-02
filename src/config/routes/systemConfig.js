/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-02 09:59:17
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-02 14:38:57
 */
export default function (app, dynamicWrapper) {
  return {
    // 以下为应用模块
    '/system': {
      component: dynamicWrapper(app, ['user'], () =>
        import ('../../layouts/SystemLayout')),
    },
    '/system/list': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
    },
    '/system/create': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
    },
    '/system/403': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
    },
    '/system/404': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/404')),
    },
    '/system/500': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/500')),
    },
    '/system/trigger': {
      component: dynamicWrapper(app, ['error'], () =>import('../../routes/Exception/triggerException')),
    },
  }
}
