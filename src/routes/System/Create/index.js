/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 16:52:18
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-04 22:37:43
 */

import React, { Fragment, PureComponent } from 'react';
import { Card, Form, Input, Switch, InputNumber, Button, Modal } from 'antd';
import { BaseComponent } from '../../Base';
import { createSystem } from '../../../services/system';

const FormItem = Form.Item;

const titleFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 4 },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: { span: 4, offset: 8 },
};

class Index extends PureComponent {
  state = {
    isStatisiPages: false,
    isStatisiResource: false,
  };

  isStatisiPagesOnChange = isStatisiPages => {
    this.setState({
      isStatisiPages,
    });
  };

  isStatisiResourceOnChange = isStatisiResource => {
    this.setState({
      isStatisiResource,
    });
  };

  generateSlowPageTimeInput = () => {
    const { getFieldDecorator } = this.props.form;
    return this.state.isStatisiPages ? (
      <FormItem {...formItemLayoutWithOutLabel}>
        {getFieldDecorator('slowPageTime', { valuePropName: 'slowPageTime' })(
          <InputNumber
            style={{ width: '100%' }}
            step={0.1}
            min={1}
            placeholder="请输入页面加载阀值(默认为8s)"
          />
        )}
      </FormItem>
    ) : null;
  };

  generateSlowJsTimeTimeInput = () => {
    const { getFieldDecorator } = this.props.form;
    return this.state.isStatisiResource ? (
      <FormItem {...formItemLayoutWithOutLabel}>
        {getFieldDecorator('slowJsTime', { valuePropName: 'slowJsTime' })(
          <InputNumber
            style={{ width: '100%' }}
            step={0.1}
            min={1}
            placeholder="请输入Js加载阀值(默认为2s)"
          />
        )}
      </FormItem>
    ) : null;
  };
  generateSlowCssTimeTimeTimeInput = () => {
    const { getFieldDecorator } = this.props.form;
    return this.state.isStatisiResource ? (
      <FormItem {...formItemLayoutWithOutLabel}>
        {getFieldDecorator('slowCssTime', { valuePropName: 'slowCssTime' })(
          <InputNumber
            style={{ width: '100%' }}
            step={0.1}
            min={1}
            placeholder="请输入Css加载阀值(默认为1s)"
          />
        )}
      </FormItem>
    ) : null;
  };

  generateSlowImgTimeTimeInput = () => {
    const { getFieldDecorator } = this.props.form;
    return this.state.isStatisiResource ? (
      <FormItem {...formItemLayoutWithOutLabel}>
        {getFieldDecorator('slowImgTime', { valuePropName: 'slowImgTime' })(
          <InputNumber
            style={{ width: '100%' }}
            step={0.1}
            min={1}
            placeholder="请输入Img加载阀值(默认为2s)"
          />
        )}
      </FormItem>
    ) : null;
  };

  handleSubmmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) return;
      Modal.confirm({
        title: '提示',
        content: '确认保存？',
        okText: '确认',
        cancelText: '取消',
        onOk: async () => {
          await createSystem({
            body: values,
          }).then(window.history.back);
        },
      });
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Fragment>
        <Card style={{ height: '100%' }}>
          <Form>
            <FormItem label="应用名称:" hasFeedback {...titleFormItemLayout}>
              {getFieldDecorator('systemName', {
                rules: [{ required: true, message: '请输入应用名称！' }],
              })(<Input placeholder="请输入应用名称" />)}
            </FormItem>
            <FormItem label="应用域名:" hasFeedback {...titleFormItemLayout}>
              {getFieldDecorator('systemDomain', {
                rules: [{ required: true, message: '请输入应用域名！' }],
              })(<Input placeholder="请输入应用域名" />)}
            </FormItem>
            <FormItem label="统计页面加载" {...titleFormItemLayout}>
              {getFieldDecorator('isStatisiPages', { valuePropName: 'checked' })(
                <Switch
                  onChange={this.isStatisiPagesOnChange}
                  checkedChildren="开"
                  unCheckedChildren="关"
                />
              )}
            </FormItem>
            {this.generateSlowPageTimeInput()}
            <FormItem label="统计页面资源加载" {...titleFormItemLayout}>
              {getFieldDecorator('isStatisiResource', { valuePropName: 'checked' })(
                <Switch
                  onChange={this.isStatisiResourceOnChange}
                  checkedChildren="开"
                  unCheckedChildren="关"
                />
              )}
            </FormItem>
            {this.generateSlowJsTimeTimeInput()}
            {this.generateSlowCssTimeTimeTimeInput()}
            {this.generateSlowImgTimeTimeInput()}
            <FormItem label="统计用户系统信息" {...titleFormItemLayout}>
              {getFieldDecorator('isStatisiSystem', { valuePropName: 'checked' })(
                <Switch checkedChildren="开" unCheckedChildren="关" />
              )}
            </FormItem>
            <FormItem label="统计Ajax" {...titleFormItemLayout}>
              {getFieldDecorator('isStatisiAjax', { valuePropName: 'checked' })(
                <Switch checkedChildren="开" unCheckedChildren="关" />
              )}
            </FormItem>
            <FormItem label="统计错误信息" {...titleFormItemLayout}>
              {getFieldDecorator('isStatisiError', { valuePropName: 'checked' })(
                <Switch checkedChildren="开" unCheckedChildren="关" />
              )}
            </FormItem>
          </Form>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" onClick={this.handleSubmmit}>
              提交
            </Button>
          </FormItem>
        </Card>
      </Fragment>
    );
  }
}

export default Form.create()(BaseComponent(Index));
