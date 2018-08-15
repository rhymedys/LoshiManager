/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-25 15:01:56
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-15 15:19:00
 */
import React from 'react';
import qs from 'qs';

/**
 * 高阶组件 用于组件继承
 *
 * @param {any} ComponsedComponent
 * @returns
 */
export default ComponsedComponent =>
  class extends React.Component {
    /**
     * 表格发生改变时
     *
     * @param {*} pageParams
     */
    onTableChange = (pageParams, filters, sorter) => {
      const { pageSize = '10', page = '1' } = qs.parse(this.props.location.search.replace('?', ''));
      if (pageParams.pageSize.toString() !== pageSize || pageParams.current.toString() !== page) {
        this.props.onPageChange(pageParams);
      }

      const extraState = {};
      if (this.state && filters !== this.state.filteredInfo) {
        extraState.filteredInfo = filters;
      }
      if (this.state && sorter !== this.state.sortedInfo) {
        extraState.sortedInfo = sorter;
      }

      if (extraState.filteredInfo || extraState.sortedInfo) {
        this.setState(extraState);
      }
    };

    render() {
      return (
        <ComponsedComponent {...this.props} {...this.state} onTableChange={this.onTableChange} />
      );
    }
  };
