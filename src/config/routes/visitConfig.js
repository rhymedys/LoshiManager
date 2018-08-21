/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:51:51
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-21 11:56:26
 */
export default function(app, dynamicWrapper) {
  return {
    '/visit/list': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Visit/List')
      ),
    },
    '/visit/detail': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Visit/Details')
      ),
    },
    '/visit/detail/performance': {
      component: dynamicWrapper(app, ['pagnationList', 'performance', 'login'], () =>
        import('../../routes/Visit/Details/Performance')
      ),
    },
    '/visit/detail/ajax': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Visit/Details/Ajax')
      ),
    },
    '/visit/detail/page': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Visit/Details/Page')
      ),
    },
    '/visit/detail/resource': {
      component: dynamicWrapper(app, ['pagnationList', 'login'], () =>
        import('../../routes/Visit/Details/Resource')
      ),
    },
  };
}
