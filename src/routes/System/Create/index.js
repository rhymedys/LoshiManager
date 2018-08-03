/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 16:52:18
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-03 17:23:50
 */

import React, { Fragment, PureComponent } from 'react';
import { Card,Form ,Input,Switch} from 'antd';
import {BaseComponent} from '../../Base'


const FormItem = Form.Item;

const titleFormItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 4 },
};

class Index extends PureComponent{
  render(){
    const {form:{
      getFieldDecorator,
    }} =this.props
    return (
      <Fragment>
        <Card style={{height:'100%'}}>
          <Form>
            <FormItem
              label="应用名称:"
              hasFeedback
              {...titleFormItemLayout}
            >
              {getFieldDecorator('systemName',{
                rules:[{ required: true, message: '请输入应用名称！' }],
              })(
                <Input placeholder="请输入应用名称" />
                )}
            </FormItem>
            <FormItem
              label="应用域名:"
              hasFeedback
              {...titleFormItemLayout}
            >
              {getFieldDecorator('systemDomain',{
                rules:[{ required: true, message: '请输入应用域名！' }],
              })(
                <Input placeholder="请输入应用域名" />
                )}
            </FormItem>
            <FormItem
              label="Switch"
              {...titleFormItemLayout}
            >
              {getFieldDecorator('switch', { valuePropName: 'checked' })(
                <div>
                  <Switch checkedChildren="开" unCheckedChildren="关" />
                  <Input  placeholder="请输入阀值" />
                </div>
            )}
            </FormItem>

          </Form>
        </Card>
      </Fragment>
    )
  }
}

export default Form.create()(BaseComponent(Index))
