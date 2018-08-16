/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 16:18:59
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-16 20:17:23
 */

import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import 'echarts/lib/chart/pie';
import echarts, { macaronsTheme } from '../../../../utils/eChart';

const EnvironmentInfoCharRootDiv = ({ colProps, divProps, nullDiv, showNull }) => (
  <Col span={colProps && colProps.span ? colProps.span : 12}>
    {showNull ? (
      nullDiv
    ) : (
      <div
        {...divProps}
        style={{
          height: 380,
          width: 'auto',
          overflow: 'hidden',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    )}
  </Col>
);

class EnvironmentInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.browserChartDom = React.createRef();
    this.osChartDom = React.createRef();
  }

  componentDidMount() {
    this.reloadAllChart();
  }

  reloadAllChart = () => {
    this.loadBrowserChart();
    this.loadOsChart();
  };

  loadBrowserChart = () => {
    const { environmentInfo } = this.props;
    if (environmentInfo.length && this.browserChartDom.current) {
      let browserData = environmentInfo[0];

      if (!browserData.length) return;

      if (browserData.length > 4) {
        const overBrowser = browserData.splice(4, browserData.length);
        browserData.push({
          browser: '其他',
          count: overBrowser.reduce(
            (beforeVal, val) => beforeVal + val.count,
            overBrowser[0].count
          ),
        });
      }

      browserData = browserData.map(val => ({
        name: `${val.browser}${val.borwserVersion ? `(${val.borwserVersion})` : ''}`,
        value: val.count,
      }));

      echarts.init(this.browserChartDom.current, macaronsTheme).setOption({
        title: {
          text: '浏览器分类统计',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '浏览器：{b}<br/> 用户量：{c}<br/> 占比：{d}%',
        },
        legend: {
          bottom: 0,
          data: browserData.map(val => val.name),
        },
        series: [
          {
            name: '用户量',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: browserData,
          },
        ],
      });
    }
  };

  loadOsChart() {
    const { environmentInfo } = this.props;
    if (environmentInfo.length && this.osChartDom.current) {
      let osData = environmentInfo[1];

      if (!osData.length) return;

      if (osData.length > 4) {
        const overOS = osData.splice(4, osData.length);
        osData.push({
          system: '其他',
          count: overOS.reduce((beforeVal, val) => beforeVal + val.count, overOS[0].count),
        });
      }

      osData = osData.map(val => ({
        name: `${val.system}${val.systemVersion ? `(${val.systemVersion})` : ''}`,
        value: val.count,
      }));

      echarts.init(this.osChartDom.current, macaronsTheme).setOption({
        title: {
          text: '系统分类统计',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '系统：{b}<br/> 用户量：{c}<br/> 占比：{d}%',
        },
        legend: {
          bottom: 0,
          data: osData.map(val => val.name),
        },
        series: [
          {
            name: '用户量',
            type: 'pie',
            radius: ['40%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: osData,
          },
        ],
      });
    }
  }

  render() {
    let res = '';
    const { environmentInfo, nullDiv } = this.props;
    if (environmentInfo.length && (environmentInfo[0].length || environmentInfo[1].length)) {
      res = (
        <Row gutter={48}>
          <EnvironmentInfoCharRootDiv
            divProps={{
              ref: this.browserChartDom,
              nullDiv,
              showNull: !environmentInfo[0].length,
            }}
          />
          <EnvironmentInfoCharRootDiv
            divProps={{
              ref: this.osChartDom,
              nullDiv,
              showNull: !environmentInfo[1].length,
            }}
          />
        </Row>
      );
    } else {
      res = nullDiv || '暂无信息';
    }
    return res;
  }
}

export default EnvironmentInfo;
