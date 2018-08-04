/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-03 14:49:39
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-04 22:47:42
 */
import queryString from 'qs';
import { generatePathName } from '../utils/router';
import { routePagnationListConfigs } from '../config';

const defaultState = {
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    current: 1,
    total: null,
  },
  dataSource: [],
  accoutData: [],
};

// 历史记录
let currentHistoryLocation = null;

export default {
  namespace: 'pagnationList',
  state: Object.assign({}, defaultState),
  subscriptions: {
    /**
     * @description 初始化
     * @param {any} {dispatch,history}
     */
    setup({ dispatch, history }) {
      // 监听location变化
      history.listen(location => {
        if (
          !currentHistoryLocation ||
          (currentHistoryLocation && currentHistoryLocation !== location)
        ) {
          // 防止第二页的时候清空第一页的数据
          if (currentHistoryLocation && currentHistoryLocation.pathname !== location.pathname) {
            dispatch({
              type: 'resetDefaultState',
            });
          }

          currentHistoryLocation = location;

          const { pathname, search } = location;
          const payload = queryString.parse(search.replace('?', ''));

          // 分发action事件
          const dispatchAction = ({ type = 'getList', extraPayload, api }) => {
            dispatch({
              type,
              payload: Object.assign({}, payload, extraPayload),
              api,
              stateLocationKey: location.key,
            });
          };

          // 根据pathname 分发业务
          for (const [k, v] of Object.entries(routePagnationListConfigs)) {
            if (pathname === generatePathName(k.substring(1))) {
              dispatchAction({
                api: v,
              });
              break;
            }
          }
        }
      });
    },
  },
  effects: {
    /**
     *请求列表数据
     *
     * @param {*} { payload , stateLocationKey,api}
     * @param {*} { call,put }
     */
    *getList({ payload, stateLocationKey, api }, { call, put }) {
      if (api) {
        const res = yield call(api, payload);
        if (res.resultCode === 0) {
          yield put({
            type: 'dispatchPagnationListDataSource',
            ...payload,
            ...res,
            stateLocationKey,
          });
        }
      }
    },

    /**
     * @description 分发分页列表数据
     * @param {any} payload
     * @param {any} {put}
     */
    *dispatchPagnationListDataSource(payload, { put }) {
      yield put({
        type: 'setPagnationListDataSource',
        dataSource: payload.rows || null,
        pagination: {
          current: Number(payload.page) || 1,
          pageSize: Number(payload.pageSize) || 10,
          total: payload.results,
        },
        stateLocationKey: payload.stateLocationKey,
      });
    },
  },

  reducers: {
    /**
     * @description 重置状态
     * @returns
     */
    resetDefaultState() {
      return defaultState;
    },

    /**
     * @description 更新state数据
     * @param {any} state
     * @param {any} { dataSource, pagination }
     * @returns
     */
    setPagnationListDataSource(state, { dataSource, pagination, stateLocationKey }) {
      if (stateLocationKey === currentHistoryLocation.key) {
        return {
          ...state,
          dataSource,
          pagination: {
            ...state.pagination,
            ...pagination,
          },
        };
      }
      return state;
    },

    /**
     *修改分页的某个数据
     *
     * @param {*} state
     * @param {*} payload
     * @returns
     */
    changePagnationListDataSource(state = {}, payload) {
      let { dataSource } = state;
      if (payload) {
        if (payload.index !== undefined) {
          dataSource[payload.index] = payload.data;
        } else if (Object.prototype.toString.call(payload.data) === '[object Array]') {
          dataSource = payload.data;
        }
      }
      return {
        ...state,
        dataSource,
      };
    },
  },
};
