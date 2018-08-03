/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 10:55:35
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-03 16:52:30
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import {Card,message, Button} from'antd'
import List from './List'
import {BaseComponent} from '../../Base'
import {deleteSystem} from '../../../services/system'
import styles from './styles.less'


class Index extends Component{

  componentDidMount(){
    this.fetchSystemListByCurrentUser(this.props.getRouteQuery())
  }


  /**
   * 请求当前用户应用列表
   *
   * @memberof Index
   */
  fetchSystemListByCurrentUser=(payload)=>{
    this.props.dispatch({
      type:'system/fetchSystemListByCurrentUser',
      payload,
    })
  }


  /**
   *添加应用
   *
   * @memberof Index
   */
  addApplication=()=>{
    this.props.pushRouter({
      context:this,
      pathname:'create',
    })
  }

  render(){
    const listPros= {
      pagination:this.props.pagination,
      dataSource:this.props.appList,
      loading:this.props.loading,
      location:this.props.$route,
      onPageChange:(res)=>{
        const params = {
          page:res.current,
          pageSize:res.pageSize,
        }
        this.props.replaceRouter(params)
        this.fetchSystemListByCurrentUser(params)
      },
      deleteApplication:async ({appId})=>{
        const res =await deleteSystem({appId})
        if(res.resultCode===0) {
          message.success(res.resultDesc)
          this.fetchSystemListByCurrentUser(this.props.getRouteQuery())
        }
      },
    }
    return (
      <Fragment>
        <Card style={{
          height:'100%',
        }}
        >
          <Button type="primary" className={styles.addButton}  onClick={this.addApplication}>添加</Button>
          <List {...listPros} />
        </Card>
      </Fragment>
    )
  }
}


export default connect(({system,loading,routing})=>({
  appList:system.list,
  pagination:system.pagination,
  loading:loading.effects['system/fetchSystemListByCurrentUser'],
  $route:routing.location,
}))(BaseComponent(Index))
