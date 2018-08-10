/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-05-30 15:24:48
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 17:30:26
 */
import React from 'react';
import queryString from 'qs';
import router from '../../utils/router';

/**
 * 高阶组件 用于组件继承
 *
 * @param {any} ComponsedComponent
 * @returns
 */
export default ComponsedComponent =>
  class BaseComponent extends React.Component {
    static rt = ''; // 页面页面状态

    constructor(props) {
      super(props);
      this.refreshRt();
    }

    /**
     * 获取url上Query 参数（优先取$route对象）
     *
     * @returns
     */
    getRouteQuery = () => {
      if (this.props.$route) {
        return queryString.parse(this.props.$route.search.replace('?', ''));
      }
      return queryString.parse(this.props.location.search.replace('?', ''));
    };

    /**
     * 分页初始化
     *
     */
    dispatchFetchInit = params => {
      this.props.dispatch({
        type: 'pagnationList/fetchInit',
        reqTimestamp: {
          rt: BaseComponent.rt,
        },
        ...params,
      });
    };

    /**
     * 分页请求
     *
     */
    dispatchGetList = params => {
      this.props.dispatch({
        type: 'pagnationList/getList',
        rt: BaseComponent.rt,
        ...params,
      });
    };

    /**
     * 重置分页State
     *
     */
    dispatchPagnationList2DefaultState = () => {
      this.props.dispatch({
        type: 'pagnationList/resetDefaultState',
      });
    };

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
    };

    /**
     * 加载新路由
     *
     * @param {any} pushRouteInfo 新路由配置信息
     * @returns
     */
    pushRouter = pushRouteInfo => {
      const context = this;
      router.pushRouter({
        context,
        ...pushRouteInfo,
      });
    };

    /**
     * 刷新页面状态唯一标志
     *
     */
    refreshRt = () => {
      BaseComponent.rt = new Date().getTime();
    };

    render() {
      return (
        <ComponsedComponent
          rt={BaseComponent.rt}
          replaceRouter={this.replaceRouter}
          pushRouter={this.pushRouter}
          getRouteQuery={this.getRouteQuery}
          dispatchGetList={this.dispatchGetList}
          dispatchFetchInit={this.dispatchFetchInit}
          dispatchPagnationList2DefaultState={this.dispatchPagnationList2DefaultState}
          {...this.props}
          {...this.state}
        />
      );
    }
  };
