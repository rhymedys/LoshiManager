/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 11:07:49
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 11:13:33
 */

import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

import echarts from 'echarts/lib/echarts';

import echartTheme from '../config/macarons.project.json';

const macaronsTheme = echartTheme.themeName;
echarts.registerTheme(macaronsTheme, echartTheme.theme);

export { macaronsTheme };
export default echarts;
