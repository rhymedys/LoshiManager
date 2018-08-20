/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2017-05-15 13:50:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-20 21:17:32
 */

import classnames from 'classnames';
import React from 'react';
import { Form, Button, Select, Col, Row, DatePicker } from 'antd';
import styles from '../../../css/formFilter.less';
import { BaseFilterComponent, headerTheme } from '../../Base';

const FormItem = Form.Item;

const category = [
  {
    l: '全部',
    v: '',
  },
  {
    v: 'resource',
  },
  {
    v: 'ajax',
  },
  {
    v: 'js',
  },
];

class Header extends React.Component {
  render() {
    const that = this;
    const { colProps, formItemLayout } = headerTheme;
    const { routeQuery = {}, form: { getFieldDecorator } } = that.props;

    return (
      <Form
        className={classnames({
          [styles['ant-advanced-search-form']]: true,
        })}
        onSubmit={this.props.handleSubmit.bind(this)}
        style={{
          marginBottom: 16,
        }}
      >
        <Row gutter={16}>
          <Col {...colProps}>
            <FormItem label="业务类型:" {...formItemLayout}>
              {getFieldDecorator('category', {
                initialValue: routeQuery.category || category[0].v,
              })(
                <Select
                  getPopupContainer={triggerNode => triggerNode}
                  dropdownStyle={{
                    lineHeight: 1.5,
                  }}
                >
                  {this.props.generateSelectOption(category)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colProps}>
            <FormItem label="记录时间:" {...formItemLayout}>
              {getFieldDecorator('rangeDate', {
                initialValue: this.props.handleGetRangePickDefaultValue(
                  routeQuery.startDate,
                  routeQuery.endDate
                ),
                rules: [
                  {
                    type: 'array',
                  },
                ],
              })(
                <DatePicker.RangePicker
                  getCalendarContainer={triggerNode => triggerNode}
                  ranges={this.props.getBaseRangeDate()}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row
          style={{
            textAlign: 'right',
            paddingBottom: '20px',
          }}
        >
          <Button type="primary" htmlType="submit" icon="search">
            搜索
          </Button>
          <Button
            style={{
              marginLeft: 10,
            }}
            onClick={this.props.handRestForm.bind(this)}
          >
            重置
          </Button>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(BaseFilterComponent(Header));
