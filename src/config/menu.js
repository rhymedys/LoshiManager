/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 13:54:32
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-05-30 14:11:02
 */

const  menuData = [
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
        // authority:'user',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
];

export default menuData
