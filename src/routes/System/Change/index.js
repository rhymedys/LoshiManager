/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 16:52:18
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-17 14:25:57
 */

import React, { Fragment, PureComponent } from 'react';
import { Card, Form, Input, Switch, InputNumber, Button, Modal } from 'antd';
import { BaseComponent } from '../../Base';
import { updateSystem, queryByAppId } from '../../../services/system';

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
    initLoadingData: false,
    initAppData: null,
  };

  async componentWillMount() {
    const res = await queryByAppId({
      appId: this.props.getRouteQuery().appId,
    });

    const extraState = {};
    if (res.resultCode === 0) {
      extraState.initAppData = res.data;
      extraState.isStatisiPages = res.data.isStatisiPages === 0;
      extraState.isStatisiResource = res.data.isStatisiResource === 0;
    }

    this.setState(
      Object.assign(
        {
          initLoadingData: true,
        },
        extraState
      )
    );
  }

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
        {getFieldDecorator('slowPageTime', {
          valuePropName: 'value',
          initialValue: this.state.initAppData ? this.state.initAppData.slowPageTime : null,
        })(
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
        {getFieldDecorator('slowJsTime', {
          valuePropName: 'value',
          initialValue: this.state.initAppData ? this.state.initAppData.slowJsTime : null,
        })(
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
        {getFieldDecorator('slowCssTime', {
          valuePropName: 'value',
          initialValue: this.state.initAppData ? this.state.initAppData.slowCssTime : null,
        })(
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
        {getFieldDecorator('slowImgTime', {
          valuePropName: 'value',
          initialValue: this.state.initAppData ? this.state.initAppData.slowImgTime : null,
        })(
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
          await updateSystem({
            body: Object.assign({ appId: this.props.getRouteQuery().appId }, values),
          }).then(res => {
            if (res && res.resultCode === 0) {
              window.history.back();
            }
          });
        },
      });
    });
  };

  generateDom = () => {
    const { form: { getFieldDecorator } } = this.props;
    const { initAppData } = this.state;
    if (initAppData) {
      return (
        <Form>
          <FormItem label="应用名称:" hasFeedback {...titleFormItemLayout}>
            {getFieldDecorator('systemName', {
              rules: [{ required: true, message: '请输入应用名称！' }],
              initialValue: initAppData.systemName,
            })(<Input placeholder="请输入应用名称" />)}
          </FormItem>
          <FormItem label="应用域名:" hasFeedback {...titleFormItemLayout}>
            {getFieldDecorator('systemDomain', {
              initialValue: initAppData.systemDomain,
            })(<Input placeholder="请输入应用域名" disabled />)}
          </FormItem>
          <FormItem label="统计页面加载" {...titleFormItemLayout}>
            {getFieldDecorator('isStatisiPages', {
              valuePropName: 'checked',
              initialValue: initAppData.isStatisiPages === 0,
            })(
              <Switch
                onChange={this.isStatisiPagesOnChange}
                checkedChildren="开"
                unCheckedChildren="关"
              />
            )}
          </FormItem>
          {this.generateSlowPageTimeInput()}
          <FormItem label="统计页面资源加载" {...titleFormItemLayout}>
            {getFieldDecorator('isStatisiResource', {
              valuePropName: 'checked',
              initialValue: initAppData.isStatisiPages === 0,
            })(
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
            {getFieldDecorator('isStatisiSystem', {
              valuePropName: 'checked',
              initialValue: initAppData.isStatisiSystem === 0,
            })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
          </FormItem>
          <FormItem label="统计Ajax" {...titleFormItemLayout}>
            {getFieldDecorator('isStatisiAjax', {
              valuePropName: 'checked',
              initialValue: initAppData.isStatisiAjax === 0,
            })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
          </FormItem>
          <FormItem label="统计错误信息" {...titleFormItemLayout}>
            {getFieldDecorator('isStatisiError', {
              valuePropName: 'checked',
              initialValue: initAppData.isStatisiError === 0,
            })(<Switch checkedChildren="开" unCheckedChildren="关" />)}
          </FormItem>
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="primary" onClick={this.handleSubmmit}>
              提交
            </Button>
          </FormItem>
        </Form>
      );
    }
  };

  render() {
    return (
      <Fragment>
        <Card
          style={{ height: '100%' }}
          loading={!this.state.initLoadingData && !this.state.initAppData}
        >
          {this.generateDom()}
        </Card>
      </Fragment>
    );
  }
}

export default Form.create()(BaseComponent(Index));
