/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-07-16 16:05:26
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-07-19 19:01:50
 */
import React,{PureComponent} from 'react'
import { Avatar } from 'antd'
import styles from './styles.less'


class Message extends PureComponent{
  static openUrl(url){
    window.open(url)
  }

  state={
    messageRef:React.createRef(),
  }

  /**
   * 根据类型分发渲染
   *
   * @returns
   * @memberof Message
   */
  dispatchRenderContent=()=> {
    switch (this.props.contentType.toUpperCase()) {
    case 'TEXT': {
        return this.renderText();
    }
    case 'IMG': {
        return this.renderImage();
    }
    case 'VOICE':{
      return this.renderVoice()
    }
    case 'PACS_REPORT':{
      return this.renderPacsOrLisReport()
    }
    case 'LIS_REPORT':{
      return this.renderPacsOrLisReport()
    }
    case 'TEMPLATE':{
      return this.renderTemplate()
    }
    case 'PRESCRIPTION':{
      return this.renderPerscription()
    }
    case 'PHONE':{
      return this.renderPhone()
    }
    default:
        return (
          <div className="unknown">不支持的消息类型</div>
        );
    }
  }

  renderPhone=()=>{
    return <div>{this.props.content}</div>
  }


  /**
   *处方渲染
   *
   * @memberof Message
   */
  renderPerscription=()=>{
    return <div>[诊断与处方消息]</div>
  }


  /**
   * 模版消息渲染
   *
   * @memberof Message
   */
  renderTemplate=()=>{
    let {content}=this.props
    if(Object.prototype.toString.call(content) === '[object String]'){
      content = JSON.parse(content)
    }

    return <div>{`[${content.productType==='VOICE'?'音频':"文章"}] ${content.productName}`}</div>
  }

  /**
   * 检验检查报告渲染
   *
   * @memberof Message
   */
  renderPacsOrLisReport=()=>{
    const {content,contentType} = this.props
    return <div>{content||contentType==='PACS_REPORT'&&' [检验报告消息]'||contentType==='LIS_REPORT'&&'[检查报告消息]'}</div>
  }



  /**
   * 渲染音频类型
   *
   * @memberof Message
   */
  renderVoice=()=>{
    const { content } = this.props;
    return (
      <a onClick={Message.openUrl.bind(this,content)}>语音消息(点击查看)</a>
    );
  }


  /**
   * 渲染文本类型
   *
   * @returns
   * @memberof Message
   */
  renderText=()=> {
    let { content } = this.props;
    content = content.replace(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
        r => (
            `<a href="${r}" rel="noopener noreferrer" target="_blank">${r}</a>`
        ),
    );
    return (
      <div className={styles.text} dangerouslySetInnerHTML={{ __html:content }} />
    );
  }


  /**
   *渲染图片类型
   *
   * @memberof Message
   */
  renderImage=()=> {
    const { content, loading } = this.props;
    let src = content;
    if (src.startsWith('blob')) {
        [src] = src.split('?');
    }
    // 设置高度宽度为1防止被原图撑起来
    return (
      <div className={styles.image}>
        <img className={styles.img} src={src} onClick={window.open.bind(null,src)} alt="点击查看原图"  />
      </div>
    );
  }




  render(){
    const {
      msgType, date, contentType,doctorName,userName,content,
    } = this.props;
    const isSelf = msgType==='doctor'
    const isUser = msgType === 'self'
    const isSystem = msgType === 'sys'

    const nickname=isSelf?doctorName:userName

    return (
      <div className={`${styles.chatMessage} ${isSelf ? styles.self : ''} ${contentType} ${isSystem?styles.sys:''}`}  ref={this.state.messageRef}>
        {(isSelf || isUser) && <Avatar>{nickname.substring(0,1)}</Avatar>}
        {(isSelf || isUser) && (
        <div className={styles.right}>
          <div className={styles.nicknameTime}>
            <span className={styles.nickname}>{nickname}</span>
            <span className={styles.time}>{date}</span>
          </div>
          <div className={styles.content}>{this.dispatchRenderContent()}</div>
          <div className={styles.arrow} />
        </div>
        )}
        {isSystem && <div className={`${styles.content} ${styles.sys}`}>系统消息：{content}</div>}

      </div>
    )
  }

}

export default Message
