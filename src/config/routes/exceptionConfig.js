/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 14:26:13
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-05-30 14:26:47
 * 错误模块
 */

export default function (app, dynamicWrapper) {
  return {
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>import('../../routes/Exception/triggerException')),
    },
  }
}
