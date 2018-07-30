/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-05-30 15:24:48
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-06-13 11:37:07
 */
import React from 'react';
import  queryString from 'qs'
import router from '../../utils/router';


/**
 * 高阶组件 用于组件继承
 *
 * @param {any} ComponsedComponent
 * @returns
 */
export default ComponsedComponent => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryString,
      replaceRouter: this
        .replaceRouter
        .bind(this),
      pushRouter: this
        .pushRouter
        .bind(this),
      el: null,
      getRouteQuery: this
      .getRouteQuery
      .bind(this),
    };
  }

  /**
 * 获取url上Query 参数（优先取$route对象）
   *
   * @returns
   */
  getRouteQuery(){
    if(this.props.$route){
      return queryString.parse(this.props.$route.search.replace('?',''))
    }
    return queryString.parse(this.props.location.search.replace('?',''))
  }

  /**
   * 替换当前路由
   *
   * @param {any} obj
   * @param {any} pathname
   * @returns
   */
  replaceRouter = (obj, newPathName) => {
    const context = this;
    router.replaceRouter({
      context,
      data: obj || null,
      newPathName,
    });
  }

  /**
   * 加载新路由
   *
   * @param {any} pushRouteInfo 新路由配置信息
   * @returns
   */
  pushRouter = (pushRouteInfo) => {
    const context = this;
    router.pushRouter({
      context,
      ...pushRouteInfo,
    });
  }


  render() {
    return (
      <ComponsedComponent
        ref={(el) => {this.currentEl = el}}
        {...this.props}
        {...this.state}
      />
    );
  }
};
