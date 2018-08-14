/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-14 10:12:26
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-14 11:31:07
 */
import React, { PureComponent } from 'react';
import 'echarts/lib/chart/line';
import eChart, { macaronsTheme } from '../../../../utils/eChart';

class DetaiLineChart extends PureComponent {
  constructor(props) {
    super(props);
    this.chartDomRef = React.createRef();
  }

  componentDidMount() {
    if (this.chartDomRef.current) {
      eChart.init(this.chartDomRef.current, macaronsTheme).setOption({
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 111, 234, 290, 330, 310],
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      });
    }
  }

  render() {
    return (
      <div
        ref={this.chartDomRef}
        style={{
          width: '100%',
          height: 500,
        }}
      />
    );
  }
}

export default DetaiLineChart;
