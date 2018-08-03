/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 10:55:35
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-03 12:35:20
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card} from'antd'
import List from './List'


class Index extends Component{

  componentDidMount(){
    this.fetchSystemListByCurrentUser()
  }


  /**
   * 请求当前用户应用列表
   *
   * @memberof Index
   */
  fetchSystemListByCurrentUser=(config)=>{
    this.props.dispatch(Object.assign({},config,{
      type:'system/fetchSystemListByCurrentUser',
    }))
  }

  render(){
    const listPros= {
      pagination:this.props.pagination,
      dataSource:this.props.appList,
      loading:this.props.loading,
    }
    return (
      <Fragment>
        <Card>
          <List {...listPros} />
        </Card>
      </Fragment>
    )
  }
}


export default connect(({system,loading})=>({appList:system.list,
  pagination:system.pagination,
  loading:loading.effects['system/fetchSystemListByCurrentUser']}))(Index)
