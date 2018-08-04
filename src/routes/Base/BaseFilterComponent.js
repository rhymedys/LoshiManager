/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 15:29:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-04 22:11:18
 */

import React from 'react';
import moment from 'moment';
import { Select } from 'antd';

export default ComposedComponent =>
  class extends React.Component {
    getBaseRangeDate = () => {
      return {
        今天: [moment(), moment()],
        近3天: [moment().add(-3, 'day'), moment()],
        近7天: [moment().add(-7, 'day'), moment()],
        近1月: [moment().add(-1, 'month'), moment()],
        当月: [moment().startOf('month'), moment().endOf('month')],
      };
    };

    /**
     * 设置额外的数据
     *
     * @param {*} obj
     */
    setExtraSubmitValues(obj) {
      if (obj && obj.key) {
        this.extraSubmitValues[obj.key] = obj.value;
      }
    }

    /**
   *生成 <Select.Option value={val.value}>{val.label}</Select.Option >
   *
  * @param {any} list [{
          value: '4',
          label: '已失败'
        }....]
   * @memberof Header
   */
    generateSelectOption = list => {
      let res = [];
      if (list && list.length) {
        res = list.map(val => {
          return (
            <Select.Option key={val.value} value={val.value}>
              {val.label}
            </Select.Option>
          );
        });
      }
      return res;
    };

    handleGetRangePickDefaultValue = (startDate, endDate) => {
      if (startDate && endDate) {
        return [moment(startDate), moment(endDate)];
      } else {
        return [null, null];
      }
    };

    handRestForm = () => {
      const { handleSearchReset, form } = this.props;
      if (handleSearchReset) {
        handleSearchReset();
      }

      if (form.resetFields) {
        form.resetFields();
      }

      if (form.getFieldValue('rangeDate') && form.setFieldsValue) {
        form.setFieldsValue({
          rangeDate: [null, null],
        });
      }
    };

    /**
     *
     * 提交表i单
     *
     * @memberof AudioOrderFilter
     */
    handleSubmit = e => {
      const that = this;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (err) return;

        if (that.props.handleSearch) {
          that.props.handleSearch(Object.assign(that.extraSubmitValues, values));
        }
      });
    };

    // 额外提交的数据
    extraSubmitValues = {};

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          setExtraSubmitValues={this.setExtraSubmitValues.bind(this)}
          handleSubmit={this.handleSubmit.bind(this)}
          handRestForm={this.handRestForm.bind(this)}
          handleGetRangePickDefaultValue={this.handleGetRangePickDefaultValue.bind(this)}
          getBaseRangeDate={this.getBaseRangeDate.bind(this)}
          generateSelectOption={this.generateSelectOption.bind(this)}
        />
      );
    }
  };
