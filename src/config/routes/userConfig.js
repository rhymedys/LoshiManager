/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 14:19:19
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-05-30 14:27:13
 *
 * 注册模块
 */
export default function(app, dynamicWrapper) {
  return {
    // 以下为注册模块
    '/user': {
      component: dynamicWrapper(app, [], () => import('../../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../../routes/User/Login')),
    },
    '/user/register': {
      component: dynamicWrapper(app, ['register'], () => import('../../routes/User/Register')),
    },
    '/user/register-result': {
      component: dynamicWrapper(app, [], () => import('../../routes/User/RegisterResult')),
    },
  };
}
