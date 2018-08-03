import React, { Fragment } from 'react';
import pathToRegexp from 'path-to-regexp';
import DocumentTitle from 'react-document-title';
import { Layout, Icon, message } from 'antd';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { connect } from 'dva';
import GlobalHeader from '../components/GlobalHeader';
import GlobalFooter from '../components/GlobalFooter';
import appConfig from '../config/app'
import NotFound from '../routes/Exception/404';
import logo from '../assets/logo.svg';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';



const { AuthorizedRoute, check } = Authorized;
const { Content, Header, Footer } = Layout;
const redirectData = [];

class SystemLayout extends React.PureComponent{
  static GobalHeaderTitle = (
    <h3 style={{
      marginBottom:'.2em',
    }}
    >{appConfig.title}
    </h3>
  )

  async componentDidMount(){
   await this.props.dispatch({
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

  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get('redirect');
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete('redirect');
      window.history.replaceState(null, 'redirect', urlParams.href);
    } else {
      const { routerData,match } = this.props;

      // get the first authorized route path in routerData
      const {path} = getRoutes(match.path,routerData).find(
        item => check(item.authority, item.path) && item.path !== '/'
      )||{};


      return path;
    }
    return redirect;
  };



  render(){
    const {
      currentUser,
      fetchingNotices,
      notices,
      routerData,
      match,
    } = this.props;
    const bashRedirect = this.getBashRedirect();

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
            title={SystemLayout.GobalHeaderTitle}
            showTitle
          />
        </Header>
        <Content style={{ margin: '24px 24px 0', height: '100%' }}>
          <Switch>
            {redirectData.map(item => (
              <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
            {getRoutes(match.path, routerData).map(item => (
              <AuthorizedRoute
                key={item.key}
                path={item.path}
                component={item.component}
                exact={item.exact}
                authority={item.authority}
                redirectPath="/system/exception/403"
              />
              ))}
            <Redirect exact from={`${appConfig.appRootPath}system/`} to={bashRedirect} />
            <Route render={NotFound} />
          </Switch>
        </Content>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter />
        </Footer>
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
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
})) (SystemLayout)


