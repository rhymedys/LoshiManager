/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-08 10:37:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 17:06:55
 */
import React, { PureComponent, Fragment } from 'react';
import { Card, Row, Col, Icon } from 'antd';
// import G2 from '@antv/g2';
import { connect } from 'dva';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { queryPagesByUrl } from '../../../../services/pages';
import { BaseComponent } from '../../../Base';
import { toFixed } from '../../../../utils/utils';
import List from './List';
import styles from './styles.less';

const simpleInfoLayout = {
  span: 6,
};

const nullInfo = (
  <div>
    <Icon type="frown" style={{ marginRight: 10 }} />
    暂无信息
  </div>
);
class Index extends PureComponent {
  state = {
    browserChartDom: React.createRef(),
    osChartDom: React.createRef(),
    cityChartDom: React.createRef(),
  };

  componentWillMount() {
    Promise.all([
      this.getList(this.props.getRouteQuery(), true),
      this.getSimpleInfo(),
      this.getEnvironmentInfo(),
    ]);
  }

  componentDidUpdate() {
    this.reloadAllChart();
  }

  getList = (apiParams, resetState) => {
    this.props.dispatch({
      type: 'pagnationList/getList',
      apiParams,
      api: queryPagesByUrl,
      resetState,
    });
  };

  getSimpleInfo = async body => {
    this.props.dispatch({
      type: 'performance/fetchSimpleInfo',
      body,
    });
  };

  getEnvironmentInfo = async body => {
    this.props.dispatch({
      type: 'performance/fetchEnvironmentInfo',
      body,
    });
  };

  generateSimpleInfo = () => {
    const { simpleInfo } = this.props;
    if (simpleInfo) {
      return (
        <Row gutter={16}>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均加载耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.loadTime, true)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均白屏耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.whiteTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均资源加载耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.resourceTime, true)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均DOM构建耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.domTime, true)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均解析DOM耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.analysisDomTime, true)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>调用次数</div>
            <div className={styles.heading}>{simpleInfo.count}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均DNS解析耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.dnsTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均TCP连接耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.tcpTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均页面重定向耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.redirectTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均unload耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.unloadTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均request请求耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.requestTime)}</div>
          </Col>
          <Col {...simpleInfoLayout}>
            <div className={styles.textSecondary}>平均页面ready耗时</div>
            <div className={styles.heading}>{toFixed(simpleInfo.readyTime)}</div>
          </Col>
        </Row>
      );
    } else {
      return nullInfo;
    }
  };

  generateEnvirontmentInfo = () => {
    const { environmentInfo } = this.props;
    if (environmentInfo.length) {
      return (
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false} ref={this.state.browserChartDom} />
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              <div ref={this.state.osChartDom} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              <div ref={this.state.cityChartDom} />
            </Card>
          </Col>
        </Row>
      );
    } else {
      return nullInfo;
    }
  };

  @Bind()
  @Debounce(400)
  reloadAllChart() {
    this.loadBrowserChart();
  }

  loadBrowserChart = () => {
    const { environmentInfo } = this.props;
    if (
      environmentInfo.length &&
      this.state.browserChartDom.current &&
      this.state.browserChartDom.current.container
    ) {
      // const totalBrowserCount = environmentInfo[0].reduce(
      //   (beforeCount, val) => beforeCount + val.count,
      //   0
      // );
      // const browserData = environmentInfo[0].map(val => ({
      //   item: `${val.browser}(${val.borwserVersion})`,
      //   count: val.count,
      //   percent: Number((val.count / totalBrowserCount).toFixed(4)),
      // }));
      // console.log(browserData,this.state.browserChartDom.current)
    }
  };

  render() {
    const listProps = {
      loading: this.props.loading,
      ...this.props.pagnationList,
      location: this.props.$route,
      onPageChange: val => {
        const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
          page: val.current,
          pageSize: val.pageSize,
        });
        this.props.replaceRouter(newQueryParams);
        this.getList(newQueryParams);
      },
    };
    return (
      <Fragment>
        <Card
          title="概况"
          loading={this.props.fetchingSimpleInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
        >
          {this.generateSimpleInfo()}
        </Card>
        <Card
          loading={this.props.fecthingEnvironmentInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
        >
          {this.generateEnvirontmentInfo()}
        </Card>
        <Card title="详情" bordered={false}>
          <List {...listProps} />
        </Card>
      </Fragment>
    );
  }
}

export default connect(({ pagnationList, performance, loading, routing }) => ({
  simpleInfo: performance.simpleInfo,
  environmentInfo: performance.environment,
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
  fetchingSimpleInfo: loading.effects['performance/fetchSimpleInfo'],
  fecthingEnvironmentInfo: loading.effects['performance/fetchEnvironmentInfo'],
}))(BaseComponent(Index));
