/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 15:23:45
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 10:03:38
 */

import { routerRedux } from 'dva/router';
import queryString from 'qs';
import { appConfig } from '../config';

/**
 *
 * 替换当前路由
 * @param {any} { context, data,newPathName}
 */
function replaceRouter({ context, data, newPathName }) {
  if (context) {
    const { dispatch, $route } = context.props;
    const { search, pathname } = $route;
    const query = {
      ...queryString.parse(search.replace('?', '')),
      ...data,
    };
    dispatch(
      routerRedux.replace({
        ...$route,
        pathname: newPathName || pathname,
        search: queryString.stringify(query),
      })
    );
  }
}

/**
 * 加载新路由
 *
 * @param {any} { context, query, params, pathName }
 */
function pushRouter({ context, query, params, pathname }) {
  if (context) {
    const { dispatch, $route } = context.props;
    dispatch(
      routerRedux.push({
        ...$route,
        pathname,
        search: queryString.stringify(query),
        params,
      })
    );
  }
}

/**
 *生成项目pathname +具体路径的path
 *
 * @param {*} afterDetailsPath
 * @returns
 */
function generatePathName(afterDetailsPath) {
  return `${appConfig.appRootPath}${afterDetailsPath}`;
}

export { generatePathName };
export default {
  replaceRouter,
  pushRouter,
};
