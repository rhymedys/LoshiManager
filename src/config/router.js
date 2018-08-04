/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 14:00:54
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-06-27 09:43:04
 */

import routes from './routes';
import { appConfig } from '../config';

const routePagnationListConfigs = {};

function getRouter(app, dynamicWrapper) {
  const res = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
  };

  // 合并路由对象以及增加项目pathname
  Object.values(routes).forEach(route => {
    const routeObj = route(app, dynamicWrapper);
    Object.keys(routeObj).forEach(routeKey => {
      res[`${appConfig.appRootPath.slice(0, appConfig.appRootPath.length - 1)}${routeKey}`] =
        routeObj[routeKey];

      if (routeObj[routeKey].pagnationListApi) {
        routePagnationListConfigs[routeKey] = routeObj[routeKey].pagnationListApi;
      }
    });
  });
  return res;
}

export { routePagnationListConfigs };
export default getRouter;
