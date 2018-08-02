/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-02 09:59:17
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-02 10:48:03
 */
export default function (app, dynamicWrapper) {
  return {
    // 以下为应用模块
    '/system': {
      component: dynamicWrapper(app, ['user'], () =>
        import ('../../layouts/SystemLayout')),
    },
  }
}
