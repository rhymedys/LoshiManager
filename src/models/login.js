import { routerRedux } from 'dva/router';
import qs from 'qs';
import { fakeAccountLogin, fakeAccountLogout } from '../services/login';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import appConfig from '../config/app';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const params = {
        passWord: payload.password,
        userName: payload.userName,
      };
      const response = yield call(fakeAccountLogin, params);
      if (response) {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: response.resultCode === 0,
            currentAuthority: 'admin',
          },
        });
        // Login successfully
        if (response.resultCode === 0) {
          reloadAuthorized();
          const query = qs.parse(window.location.search.replace('?', ''));
          if (query && query.redirect_uri) {
            window.location.replace(decodeURIComponent(query.redirect_uri));
          } else {
            yield put(routerRedux.push(`${appConfig.appRootPath}system`));
          }
        }
      }
    },
    *logout(_, { put, select, call }) {
      yield call(fakeAccountLogout);
      try {
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set('redirect_uri', pathname);
        window.history.replaceState(null, 'admin/user/login', urlParams.href);
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        yield put(routerRedux.push('admin/user/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
