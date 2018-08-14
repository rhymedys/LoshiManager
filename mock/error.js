/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:12:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 15:13:10
 */

export default {
  getListCount: {
    resultCode: 0,
    resultDesc: 'success',
    data: 7,
  },
  getList: {
    resultCode: 0,
    resultDesc: 'success',
    data: [
      {
        resourceUrl: '/apidata/666',
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-02-01 11:04:39',
        count: 4,
      },
      {
        resourceUrl: 'http://127.0.0.1:8000/00',
        msg: 'img is load error',
        category: 'resource',
        createTime: '2018-02-02 05:16:12',
        count: 6,
      },
      {
        resourceUrl: 'http://127.0.0.1:8000/124.png',
        msg: 'img is load error',
        category: 'resource',
        createTime: '2018-02-01 11:05:46',
        count: 2,
      },
      {
        resourceUrl: 'http://127.0.0.1:8000/551.png',
        msg: 'img is load error',
        category: 'resource',
        createTime: '2018-01-31 07:38:18',
        count: 2,
      },
      {
        resourceUrl: 'http://127.0.0.1:8000/pt-agent/api/agent/queryJsApiTicket',
        msg: 'SyntaxError: Unexpected token <',
        category: 'js',
        createTime: '2018-01-31 07:38:21',
        count: 25,
      },
      {
        resourceUrl: 'wefwef?_=1517398700993',
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-01-31 07:38:21',
        count: 1,
      },
      {
        resourceUrl: 'wefwef?_=1517398794052',
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-01-31 07:39:54',
        count: 1,
      },
    ],
  },
};
