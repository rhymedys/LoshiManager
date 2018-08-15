/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 15:12:34
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 11:02:16
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
  getItemListCount: {
    resultCode: 0,
    resultDesc: 'success',
    data: 7,
  },
  getItemList: {
    resultCode: 0,
    resultDesc: 'success',
    data: [
      {
        id: 8,
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-02-01 11:04:39',
        pageUrl: 'http://127.0.0.1:8000/',
        resourceUrl: '/apidata/666',
        text: 'Not Allowed',
        status: '405',
        querydata: '{"_":"1517454279932"}',
        method: '',
      },
      {
        id: 9,
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-02-01 11:05:06',
        pageUrl: 'http://127.0.0.1:8000/',
        resourceUrl: '/apidata/666',
        text: 'Not Allowed',
        status: '405',
        querydata: '{"_":"1517454306678"}',
        method: '',
      },
      {
        id: 11,
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-02-01 11:05:48',
        pageUrl: 'http://127.0.0.1:8000/',
        resourceUrl: '/apidata/666',
        text: 'Not Allowed',
        status: '405',
        querydata: '{"_":"1517454348087"}',
        method: '',
      },
      {
        id: 13,
        msg: 'ajax请求错误',
        category: 'ajax',
        createTime: '2018-02-01 11:06:18',
        pageUrl: 'http://127.0.0.1:8000/',
        resourceUrl: '/apidata/666',
        text: 'Not Allowed',
        status: '405',
        querydata: '{"_":"1517454378709"}',
        method: '',
      },
    ],
  },
};
