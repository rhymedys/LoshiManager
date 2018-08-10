/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-10 09:12:21
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 14:28:26
 */

export default {
  queryListGroupByNameByCallUrl: {
    resultCode: 0,
    resultDesc: 'success',
    data: [
      {
        name: 'http://127.0.0.1:8000/apidata/pt-agent/api/agent/index/pageQueryIndexData',
        callUrl: 'http://127.0.0.1:8000/',
        duration: 280,
        decodedBodySize: 132,
        createTime: '2018-08-10 02:28:07',
      },
      {
        name: 'http://127.0.0.1:8000/apidata/pt-agent/api/agent/index/queryIndexData',
        callUrl: 'http://127.0.0.1:8000/',
        duration: 77,
        decodedBodySize: 158,
        createTime: '2018-08-10 02:28:07',
      },
      {
        name: 'http://127.0.0.1:8000/apidata/pt-agent/api/agent/index/querySellStatistics',
        callUrl: 'http://127.0.0.1:8000/',
        duration: 88,
        decodedBodySize: 152,
        createTime: '2018-08-10 02:28:07',
      },
      {
        name: 'http://localhost:8000/sockjs-node/info',
        callUrl: 'http://127.0.0.1:8000/',
        duration: 66,
        decodedBodySize: 0,
        createTime: '2018-08-10 02:28:07',
      },
    ],
  },
  queryListCountGroupByNameByCallUrl: {
    resultCode: 0,
    resultDesc: 'success',
    data: 4,
  },
};
