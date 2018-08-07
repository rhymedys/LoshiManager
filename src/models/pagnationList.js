/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-03 14:49:39
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-07 15:07:20
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
};

export default {
  namespace: 'pagnationList',
  state: Object.assign({}, defaultState),
  effects: {
    /**
     *请求列表数据
     *
     * @param {*} { payload ,api}
     * @param {*} { call,put }
     */
    *getList({ apiParams, api, resetState }, { call, put }) {
      if (resetState) yield put({ type: 'resetDefaultState' });

      if (api) {
        const res = yield call(api, apiParams);
        if (res && res.resultCode === 0) {
          yield put({
            type: 'dispatchPagnationListDataSource',
            ...apiParams,
            ...res.data,
          });
        } else {
          yield put({
            type: 'dispatchPagnationListDataSource',
            ...apiParams,
            rows: [],
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
    setPagnationListDataSource(state, { dataSource, pagination }) {
      return {
        ...state,
        dataSource,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      };
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
