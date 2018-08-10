/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-03 14:49:39
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 17:38:22
 */

const defaultState = {
  pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`,
    current: 1,
    total: null,
  },
  dataSource: [],
  rt: null,
};

let currentRt = null;

export default {
  namespace: 'pagnationList',
  state: Object.assign({}, defaultState),
  effects: {
    /**
     * 初始化
     *
     * @param {*} {totalResConfig,lisResConfig}
     * @param {*} {put,all}
     */
    *fetchInit({ totalResConfig, lisResConfig, reqTimestamp }, { put, all }) {
      currentRt = reqTimestamp ? reqTimestamp.rt : null;
      yield put({ type: 'resetDefaultState', ...reqTimestamp });
      yield all([
        put(Object.assign({ type: 'getTotal' }, Object.assign(totalResConfig, reqTimestamp))),
        put(Object.assign({ type: 'getList' }, Object.assign(lisResConfig, reqTimestamp))),
      ]);
    },

    /**
     * 查询总条数
     *
     * @param {*} {apiParams,api}
     * @param {*} {call,put}
     */
    *getTotal({ apiParams, api, rt }, { call, put }) {
      if (api) {
        const res = yield call(api, apiParams);
        if (res && res.resultCode === 0 && currentRt === rt) {
          yield put({
            type: 'setPagnationListTotal',
            total: res.data,
            rt,
          });
        }
      }
    },

    /**
     *请求列表数据
     *
     * @param {*} { payload ,api}
     * @param {*} { call,put }
     */
    *getList({ apiParams, api, rt }, { call, put }) {
      if (api) {
        const res = yield call(api, apiParams);
        if (currentRt === rt) {
          if (res && res.resultCode === 0) {
            yield put({
              type: 'dispatchPagnationListDataSource',
              ...apiParams,
              rows: res.data,
              rt,
            });
          } else {
            yield put({
              type: 'dispatchPagnationListDataSource',
              ...apiParams,
              rows: [],
              rt,
            });
          }
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
        },
        rt: payload.rt,
      });
    },
  },

  reducers: {
    /**
     * @description 重置状态
     * @returns
     */
    resetDefaultState(state, payload) {
      return {
        ...defaultState,
        rt: payload ? payload.rt : null,
      };
    },

    /**
     * 设置总数
     *
     * @param {*} state
     * @param {*} {total}
     * @returns
     */
    setPagnationListTotal(state, { total, rt }) {
      if (currentRt === rt) {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            total,
          },
        };
      }

      return state;
    },

    /**
     * @description 更新state数据
     * @param {any} state
     * @param {any} { dataSource, pagination }
     * @returns
     */
    setPagnationListDataSource(state, { dataSource, pagination, rt }) {
      if (currentRt === rt) {
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
     * @param {*} cb
     * @returns
     */
    changePagnationListDataSource(state, cb) {
      let { dataSource } = state;
      if (cb && Object.prototype.toString.call(cb) === '[object Function]') {
        const res = cb(dataSource);
        if (res) dataSource = res;
      }
      return {
        ...state,
        dataSource,
      };
    },
  },
};
