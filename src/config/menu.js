/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 13:54:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 15:11:31
 */

const menuData = [
  {
    name: '概况',
    icon: 'dashboard',
    path: 'admin/dashboard',
  },
  {
    name: '受访页面',
    icon: 'dashboard',
    path: 'admin/visit',
    children: [
      {
        path: 'list',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
      {
        path: 'detail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
    ],
  },
  {
    name: '脚本错误',
    icon: 'dashboard',
    path: 'admin/error',
    children: [
      {
        path: 'list',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
      {
        path: 'detail',
        hideInMenu: true,
        hideInBreadcrumb: true,
      },
    ],
  },
  {
    name: '页面载入跟踪',
    icon: 'dashboard',
    path: 'admin/page_follow',
  },
  {
    name: '页面资源载入跟踪',
    icon: 'dashboard',
    path: 'admin/resource_follow',
  },
  {
    name: '页面性能',
    icon: 'dashboard',
    path: 'admin/page_performance',
  },
  {
    name: 'Ajax性能',
    icon: 'dashboard',
    path: 'admin/ajax_performance',
  },
];

export default menuData;
