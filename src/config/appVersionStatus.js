/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-12 17:13:13
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-06-21 15:25:11
 */

const normal = 'NORMAL';
const draft = 'DRAFT';
const forbidden = 'FORBIDDEN';

const statusType = [
  {
    value: '',
    label: '全部',
  },
  {
    value: normal,
    label: '正常',
  },
  {
    value: draft,
    label: '草稿',
  },
  {
    value: forbidden,
    label: '禁用',
  },
];

export { normal, draft, forbidden };
export default statusType;
