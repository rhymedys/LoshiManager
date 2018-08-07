/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-07 11:46:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 11:51:17
 */
import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { BaseComponent } from '../../Base';

class Index extends PureComponent {
  render() {
    return (
      <Fragment>
        <div>Details</div>
      </Fragment>
    );
  }
}

export default connect(({ pagnationList, loading, routing }) => ({
  pagnationList,
  loading: loading.models.pagnationList,
  $route: routing.location,
}))(BaseComponent(Index));
