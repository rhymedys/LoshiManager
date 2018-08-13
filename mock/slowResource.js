/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-10 09:11:58
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 10:21:14
 */

export default {
  queryListByCallUrl: {
    resultCode: 0,
    resultDesc: 'success',
    data: [
      {
        name: 'http://127.0.0.1:8000/favicon.ico',
        duration: 12,
        decodedBodySize: 1150,
        createTime: '2018-01-23 10:40:42',
        callUrl: 'http://127.0.0.1:8000/withdrawals',
      },
      {
        name: 'http://127.0.0.1:8000/favicon.ico',
        duration: 13,
        decodedBodySize: 1150,
        createTime: '2018-01-23 10:41:59',
        callUrl: 'http://127.0.0.1:8000/withdrawals',
      },
      {
        name: 'http://127.0.0.1:8000/favicon.ico',
        duration: 13,
        decodedBodySize: 1150,
        createTime: '2018-01-23 12:08:44',
        callUrl: 'http://127.0.0.1:8000/withdrawals',
      },
    ],
  },
  queryListCountByCallUrl: {
    resultCode: 0,
    resultDesc: 'success',
    data: 3,
  },
};
