/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-05-30 15:29:02
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-27 14:17:25
 */

import React from 'react';
import moment from 'moment';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import { Select } from 'antd';
import { formatMomentObj2YYYYMMDDHHmmss } from '../../utils/utils';

export default ComposedComponent =>
  class extends React.Component {
    getBaseRangeDate = () => {
      const yesterdayEnd = moment()
        .add('-1', 'day')
        .endOf('day');
      return {
        今天: [moment().startOf('day'), moment().endOf('day')],
        昨天: [
          moment()
            .add(-1, 'day')
            .startOf('day'),
          yesterdayEnd,
        ],
        近3天: [
          moment()
            .add(-3, 'day')
            .startOf('day'),
          yesterdayEnd,
        ],
        近7天: [
          moment()
            .add(-7, 'day')
            .startOf('day'),
          yesterdayEnd,
        ],
        近1月: [
          moment()
            .add(-1, 'month')
            .startOf('day'),
          yesterdayEnd,
        ],
        当月: [moment().startOf('month'), moment().endOf('month')],
      };
    };

    /**
     * 设置额外的数据
     *
     * @param {*} obj
     */
    setExtraSubmitValues = obj => {
      if (obj && obj.key) {
        this.extraSubmitValues[obj.key] = obj.value;
      }
    };

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
            <Select.Option key={val.v} value={val.v}>
              {val.l ? val.l : val.v}
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

    @Bind()
    @Debounce(200)
    handRestForm() {
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
    }

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
          setExtraSubmitValues={this.setExtraSubmitValues}
          handleSubmit={this.handleSubmit}
          handRestForm={this.handRestForm}
          handleGetRangePickDefaultValue={this.handleGetRangePickDefaultValue}
          getBaseRangeDate={this.getBaseRangeDate}
          generateSelectOption={this.generateSelectOption}
          formatMomentObj2YYYYMMDDHHmmss={formatMomentObj2YYYYMMDDHHmmss}
        />
      );
    }
  };
