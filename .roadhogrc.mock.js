import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import login from './mock/login';
import system from './mock/system';
import user from './mock/user';
import pages from './mock/pages';
import environment from './mock/environment';
import slowResource from './mock/slowResource';
import ajax from './mock/ajax';
import slowPages from './mock/slowPages';
import error from './mock/error';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  // ----------------------------login--------------------------------------
  'POST login': login.login,

  // ----------------------------system--------------------------------------
  'GET system/delete': system.delete,
  'GET system/queryByCurrentUser': system.queryByCurrentUser,
  'GET system/queryByAppId': system.queryByAppId,
  'POST system/update': system.update,
  'POST system/create': system.create,

  // ----------------------------user--------------------------------------
  'GET user/query': user.query,

  // ----------------------------pages--------------------------------------
  'GET pages/queryPagesByUrl': pages.queryPagesByUrl,
  'GET pages/queryAllPagesUrlByAppId': pages.queryAllPagesUrlByAppId,
  'GET pages/queryPagesSimpleInfoByUrlAndTime': pages.queryPagesSimpleInfoByUrlAndTime,
  'GET pages/queryAllPagesUrlCountByAppId': pages.queryAllPagesUrlCountByAppId,
  'GET pages/queryPagesCountByUrl': pages.queryPagesCountByUrl,

  // ----------------------------environment--------------------------------------
  // 'GET environment/queryUrlEnvironmentByType': (req, res) => {
  //   res.send(environment[`queryUrlEnvironmentByType${req.type}`]);
  // },
  'GET environment/queryUrlEnvironmentByType': environment.queryUrlEnvironmentByType,

  // ----------------------------slowResource--------------------------------------
  'GET slowResource/queryListByCallUrl': slowResource.queryListByCallUrl,
  'GET slowResource/queryListCountByCallUrl': slowResource.queryListCountByCallUrl,

  // ----------------------------ajax--------------------------------------
  'GET ajax/queryListGroupByNameByCallUrl': ajax.queryListGroupByNameByCallUrl,
  'GET ajax/queryListCountGroupByNameByCallUrl': ajax.queryListCountGroupByNameByCallUrl,

  // ----------------------------slowPages--------------------------------------
  'GET slowPages/querListByUrl': slowPages.querListByUrl,
  'GET slowPages/querListCountByUrl': slowPages.querListCountByUrl,

  // ----------------------------error--------------------------------------
  'GET error/getListCount': error.getListCount,
  'GET error/getList': error.getList,
  'GET error/getItemList': error.getItemList,
  'GET error/getItemListCount': error.getItemListCount,
  'GET error/getErrorDetail': error.getErrorDetail,
};

const res = {};
Object.keys(proxy).forEach(val => {
  const keySplit = val.split(/\s+/);
  res[`${keySplit[0]} /loshi/api/${keySplit[1]}`] = proxy[val];
});

export default (noProxy ? {} : delay(res, 1000));
