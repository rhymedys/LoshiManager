/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-15 14:06:09
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 15:05:37
 */

import React, { PureComponent, Fragment } from 'react';
import { Card, Row, Col } from 'antd';
import { BaseComponent } from '../../Base';
import { getErrorDetail } from '../../../services/error';
import styles from './styles.less';

const dataMap = [
  {
    l: '错误请求URL',
    k: 'resourceUrl',
  },
  {
    l: '错误信息',
    k: 'msg',
  },
  {
    l: '浏览器UA',
    k: 'useragent',
  },
  {
    l: '错误类型',
    k: 'category',
  },
  {
    l: '生成时间',
    k: 'createTime',
  },
  {
    l: '所属URL',
    k: 'pageUrl',
  },
  {
    l: '错误资源',
    k: 'target',
    t: 'resource',
  },
  {
    l: '资源类型',
    k: 'type',
    t: 'resource',
  },
  {
    l: '错误行',
    k: 'line',
    t: 'js',
  },
  {
    l: '错误列',
    k: 'col',
    t: 'js',
  },
  {
    l: '状态码',
    k: 'status',
    t: 'ajax',
  },
  {
    l: '类型详情',
    k: 'text',
    t: 'ajax',
  },
  {
    l: '完整URL',
    k: 'fullurl',
  },
  {
    l: '请求方式',
    k: 'method',
  },
  {
    l: '请求参数',
    k: 'querydata',
  },
];

const DetailsItem = ({ key, label, text }) => (
  <Row key={key} className={styles.label} gutter={16}>
    <Col span={18} push={6}>
      {text}
    </Col>
    <Col span={6} pull={18} style={{ textAlign: 'right' }}>
      {label}：
    </Col>
  </Row>
);

class Index extends PureComponent {
  state = {
    data: null,
    initing: true,
  };

  componentWillMount() {
    this.init();
  }

  init = async () => {
    const res = await getErrorDetail(this.props.getRouteQuery());
    let extraState = null;
    if (res && res.resultCode === 0) {
      extraState = {
        data: res.data,
      };
    }
    this.setState(Object.assign({ initing: false }, extraState));
  };

  generateDetailDom = () => {
    const { data } = this.state;
    if (data) {
      return dataMap
        .filter(val => !val.t && val.t !== data.category)
        .map(val => <DetailsItem key={val.k} label={val.l} text={data[val.k]} />);
    }
    return null;
  };
  render() {
    return (
      <Card loading={this.state.initing}>
        <Fragment>{this.generateDetailDom()}</Fragment>
      </Card>
    );
  }
}

export default BaseComponent(Index);
