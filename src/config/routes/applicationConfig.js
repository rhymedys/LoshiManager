/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-06 09:52:10
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 11:52:49
 */
export default function(app, dynamicWrapper) {
  return {
    '/dashboard': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
    '/script_error': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
    '/ajax_performance': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
    '/page_follow': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
    '/resource_follow': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
    '/page_performance': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../../routes/Exception/403')),
    },
  };
}
