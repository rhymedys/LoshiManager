/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-09 16:12:17
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-09 16:16:49
 */
import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import styles from './styles.less';
import { toFixed } from '../../../../utils/utils';

const simpleInfoLayout = {
  span: 6,
};

const SimpleInfoItem = ({ title, titleClassName, headingClassName, subTitle }) => (
  <Col {...simpleInfoLayout}>
    <div className={titleClassName || styles.textSecondary}>{title}</div>
    <div className={headingClassName || styles.heading}>{subTitle}</div>
  </Col>
);
class SimpleInfo extends PureComponent {
  render() {
    let res = '';
    const { simpleInfo, nullDiv } = this.props;
    if (simpleInfo) {
      res = (
        <Row gutter={16}>
          <SimpleInfoItem title="平均加载耗时" subTitle={toFixed(simpleInfo.loadTime, true)} />
          <SimpleInfoItem title="平均白屏耗时" subTitle={toFixed(simpleInfo.whiteTime)} />
          <SimpleInfoItem
            title="平均资源加载耗时"
            subTitle={toFixed(simpleInfo.resourceTime, true)}
          />
          <SimpleInfoItem title="平均DOM构建耗时" subTitle={toFixed(simpleInfo.domTime, true)} />
          <SimpleInfoItem
            title="平均解析DOM耗时"
            subTitle={toFixed(simpleInfo.analysisDomTime, true)}
          />
          <SimpleInfoItem title="调用次数" subTitle={simpleInfo.count} />
          <SimpleInfoItem title="平均DNS解析耗时" subTitle={toFixed(simpleInfo.dnsTime)} />
          <SimpleInfoItem title="平均TCP连接耗时" subTitle={toFixed(simpleInfo.tcpTime)} />
          <SimpleInfoItem title="平均页面重定向耗时" subTitle={toFixed(simpleInfo.redirectTime)} />
          <SimpleInfoItem title="平均unload耗时" subTitle={toFixed(simpleInfo.unloadTime)} />
          <SimpleInfoItem title="平均request请求耗时" subTitle={toFixed(simpleInfo.requestTime)} />
          <SimpleInfoItem title="平均页面ready耗时" subTitle={toFixed(simpleInfo.readyTime)} />
        </Row>
      );
    } else {
      res = nullDiv || '暂无信息';
    }

    return res;
  }
}

export default SimpleInfo;
