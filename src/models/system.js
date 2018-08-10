/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-08-03 10:59:50
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-10 13:50:13
 */
import { queryByCurrentUser } from '../services/system';

export default {
  namespace: 'system',

  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: null,
    },
  },

  effects: {
    /**
     * 获取当前用户的应用列表
     *
     * @param {*} payload
     * @param {*} {call,put}
     */
    *fetchSystemListByCurrentUser({ payload, cb }, { call, put }) {
      const res = yield call(queryByCurrentUser, payload);
      yield put({
        type: 'save',
        list: res && res.resultCode === 0 ? res.data.rows : [],
        pagination: {
          current: payload ? Number(payload.page) : 1,
          pageSize: payload ? Number(payload.pageSize) : 10,
          total: res.data.results,
        },
      });
      if (cb) cb(res);
    },
  },

  reducers: {
    /**
     * 保存列表
     *
     * @param {*} state
     * @param {*} payload
     * @returns
     */
    save(state, payload) {
      return {
        ...state,
        list: payload.list,
        pagination: {
          ...state.pagination,
          ...payload.pagination,
        },
      };
    },
  },
};
