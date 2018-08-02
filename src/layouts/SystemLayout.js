import React, { Fragment } from 'react';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'react-document-title';
import { Layout, Icon, message } from 'antd';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import appConfig from '../config/app'
import NotFound from '../routes/Exception/404';
import logo from '../assets/logo.svg';


const { Content, Header, Footer } = Layout;


class SystemLayout extends React.PureComponent{

  componentDidMount(){
    this.props.dispatch({
      type: 'user/fetchCurrent',
    });
  }

  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = Array.of(appConfig.title).join('')
    let currRouterData = null;
    // match params path
    Object.keys(routerData).forEach(key => {
      if (pathToRegexp(key).test(pathname)) {
        currRouterData = routerData[key];
      }
    });
    if (currRouterData && currRouterData.name) {
      title = `${currRouterData.name} - ${title}`;
    }
    return title;
  }




  render(){
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location,
    } = this.props;
    const layout=(
      <Layout>
        <Header style={{ padding: 0 }}>
          <GlobalHeader
            showCollapsed={false}
            showHeaderSearch={false}
            logo={logo}
            currentUser={currentUser}
            fetchingNotices={fetchingNotices}
            notices={notices}
            onNoticeClear={this.handleNoticeClear}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
        </Header>
      </Layout>
    )
    return (
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    )
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
})) (SystemLayout)


