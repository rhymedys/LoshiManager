/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-16 14:09:28
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-19 19:19:35
 */

import React,{PureComponent} from 'react'
import { Card } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import Message from './Message'
import {consultOrder} from '../../common/orderType'
import styles from './styles.less'

const { Description } = DescriptionList;


const descriptionListItem=[
  {
    k:'doctorName',
    l:'咨询医生',
  },
  {
    k:'deptName',
    l:'科室名称',
  },
  {
    k:'hospitalName',
    l:'医院名称',
  },
  {
    k:'cloudUserName',
    l:'咨询患者',
  },
  {
    k:'gender',
    l:'患者性别',
  },
  {
    k:'age',
    l:'患者年龄',
  },
]

class Index extends PureComponent{

  /**
   * 渲染消息列表
   *
   * @memberof Index
   */
  renderMessage=()=>{
    if(this.props.imgConsultInfo){
      return (
        <div className={styles.chatMessageList}>
          {
           this.props.imgConsultInfo.consultMsgs.length && this.props.imgConsultInfo.consultMsgs.map(message => <Message key={message.msgId} {...message} doctorName={this.props.imgConsultInfo.doctorName} userName={this.props.imgConsultInfo.cloudUserName} />) || ''
          }
          {
            !this.props.imgConsultInfo.consultMsgs || !this.props.imgConsultInfo.consultMsgs.length ?<div>无</div>:''
          }
        </div>
      )
    }
  }

  renderDescriptionItem = ()=>{
    if(this.props.imgConsultInfo){
      const content =  descriptionListItem.filter(val=>!!this.props.imgConsultInfo[val.k]).map(val=>{
        let text = this.props.imgConsultInfo[val.k]
        if(val.k==='gender'){
          if(text === 'M'){
            text ='男'
          }else if (text=== 'F'){
            text ='女'
          }
        }
         return <Description key={val.k} term={val.l} >{text}</Description>
      })

      return (
        <DescriptionList size='small' style={{ marginBottom: 10 }}>
          {content}
        </DescriptionList>

      )
    }
  }

  /**
   * 疾病信息
   *
   * @memberof Index
   */
  renderTextInfo=()=>{
    if(this.props.imgConsultInfo){
      return (
        <DescriptionList size='small' style={{ marginBottom: 10 }}  col={1} >
          <Description term="疾病信息">{this.props.imgConsultInfo.textInfo}</Description>
        </DescriptionList>
      )
    }
  }

  /**
   * 图片信息
   *
   * @memberof Index
   */
  renderImgInfoList=()=>{
    if(this.props.imgConsultInfo){
    return (
      <DescriptionList size='small' style={{ marginBottom: 10 }}  col={1}>
        <Description term="图片信息">
          {
           this.props.imgConsultInfo.imgInfoList && this.props.imgConsultInfo.imgInfoList.length && this.props.imgConsultInfo.imgInfoList.map(val=><img key={val} src={val} style={{maxWidth:80,maxHeight:80,marginRight:10}} onClick={window.open.bind(null,val)}  alt="点击查看原图"  />) || ''
          }
          {
            !this.props.imgConsultInfo.imgConsultInfo || !this.props.imgConsultInfo.imgInfoList.length ?<div>无</div>:''
          }
        </Description>
      </DescriptionList>
    )
    }
  }



  render() {
    if(this.props.loading || this.props.orderType!==consultOrder || !this.props.imgConsultInfo || !this.props.imgConsultInfo.consultMsgs) return ''

    return  (
      <Card
        title="会话信息"
        bodyStyle={Object.assign({
          overflow:'hidden',
          display:'flex',
          flexDirection:'column',
        },!!this.props.imgConsultInfo.consultMsgs.length && {
          maxHeight:700,
        })}
        style={{
          marginTop:20,
          marginBottom:20,
        }}
      >
        {this.renderDescriptionItem()}
        {this.renderTextInfo()}
        {this.renderImgInfoList()}
        <div style={{color:'rgba(0, 0, 0, 0.85)'}}>会话记录：</div>
        {this.renderMessage()}
      </Card>
    )
  }
}


export default Index
