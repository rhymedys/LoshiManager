import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';
import login from './mock/login';
import system from './mock/system';
import user from './mock/user';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'POST login': login.login,

  'GET system/delete': system.delete,
  'GET system/queryByCurrentUser': system.queryByCurrentUser,
  'GET system/queryByAppId': system.queryByAppId,
  'GET user/query': user.query,
  'POST system/update': system.update,
  'POST system/create': system.create,
};

const res = {};
Object.keys(proxy).forEach(val => {
  const keySplit = val.split(/\s+/);
  res[`${keySplit[0]} /loshi/api/${keySplit[1]}`] = proxy[val];
});

export default (noProxy ? {} : delay(res, 1000));
