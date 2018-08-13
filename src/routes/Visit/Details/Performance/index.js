/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-08 10:37:52
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-13 17:08:58
 */
import React, { PureComponent, Fragment } from 'react';
import { Card, Icon, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import { queryPagesByUrl, queryPagesCountByUrl } from '../../../../services/pages';
import { BaseComponent } from '../../../Base';
import List from './List';
import SimpleInfo from './SimpleInfo';
import EnvironmentInfo from './EnvironmentInfo';
import { getTimeDistance } from '../../../../utils/utils';
import styles from './styles.less';

const nullInfo = (
  <div>
    <Icon type="frown" style={{ marginRight: 10 }} />
    暂无信息
  </div>
);

const { RangePicker } = DatePicker;

class Index extends PureComponent {
  componentWillMount() {
    const query = this.props.getRouteQuery();
    Promise.all([this.init(query), this.getSimpleInfo(query), this.getEnvironmentInfo(query)]);
  }

  componentWillUnmount() {
    this.props.dispatchPagnationList2DefaultState();
  }

  getList = apiParams => {
    this.props.dispatchGetList({
      apiParams,
      api: queryPagesByUrl,
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

  getRangeDateValue = () => {
    const { startDate, endDate } = this.props.getRouteQuery();
    if (startDate && endDate) {
      return [moment(startDate), moment(endDate)];
    } else {
      return getTimeDistance('month');
    }
  };

  init = apiParams => {
    this.props.dispatchFetchInit({
      totalResConfig: {
        apiParams,
        api: queryPagesCountByUrl,
      },
      lisResConfig: {
        apiParams,
        api: queryPagesByUrl,
      },
    });
  };

  isActive(type) {
    const rangePickerValue = this.getRangeDateValue();
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      return styles.currentDate;
    }
  }

  selectDate = type => {
    this.changeRangePickerValueCb(getTimeDistance(type));
  };

  handleRangePickerChange = rangePickerValue => {
    this.changeRangePickerValueCb(rangePickerValue);
  };

  changeRangePickerValueCb = rangePickerValue => {
    const startDate = rangePickerValue[0] || '';
    const endDate = rangePickerValue[1] || '';
    const newQueryParams = Object.assign({}, this.props.getRouteQuery(), {
      page: 1,
      startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
      endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
    });

    this.props.replaceRouter(newQueryParams);
    Promise.all([
      this.init(newQueryParams),
      this.getSimpleInfo(newQueryParams),
      this.getEnvironmentInfo(newQueryParams),
    ]);
  };

  render() {
    const dateExtra = (
      <div className={styles.dashboardExtraWrap}>
        <div className={styles.left}>概况</div>
        <div className={styles.right}>
          <div className={styles.rightContent}>
            <a className={this.isActive('today')} onClick={() => this.selectDate('today')}>
              今日
            </a>
            <a className={this.isActive('week')} onClick={() => this.selectDate('week')}>
              本周
            </a>
            <a className={this.isActive('month')} onClick={() => this.selectDate('month')}>
              本月
            </a>
          </div>
          <RangePicker
            value={this.getRangeDateValue()}
            onChange={this.handleRangePickerChange}
            style={{ width: 230 }}
          />
        </div>
      </div>
    );

    const listProps = {
      loading: this.props.loading,
      ...this.props.pagnationList,
      location: this.props.$route,
      onPageChange: async val => {
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
          title={dateExtra}
          loading={this.props.fetchingSimpleInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
          headStyle={{
            alignItems: 'center',
          }}
        >
          <SimpleInfo simpleInfo={this.props.simpleInfo} nullDiv={nullInfo} />
        </Card>
        <Card
          loading={this.props.fecthingEnvironmentInfo}
          style={{ marginBottom: 20 }}
          bordered={false}
        >
          <EnvironmentInfo environmentInfo={this.props.environmentInfo} nullDiv={nullInfo} />
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
