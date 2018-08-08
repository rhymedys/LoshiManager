/*
 * @Author: Rhymedys/Rhymedys@gmail.com
 * @Date: 2018-06-03 14:49:39
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-08-08 14:15:00
 */

import { queryPagesSimpleInfoByUrlAndTime } from '../services/pages';
import { queryUrlEnvironmentByType } from '../services/environment';

const defaultState = {
  simpleInfo: null,
  environment: [],
};

export default {
  namespace: 'performance',
  state: Object.assign({}, defaultState),
  effects: {
    *fetchSimpleInfo(payload, { call, put }) {
      const res = yield call(queryPagesSimpleInfoByUrlAndTime, payload.body);
      yield put({
        type: 'setSimpleInfo',
        simpleInfo: res && res.resultCode === 0 ? res.data : null,
      });
    },

    *fetchEnvironmentInfo(payload, { call, put }) {
      const res = yield call(queryUrlEnvironmentByType, payload.body);
      yield put({
        type: 'setEnvironmentInfo',
        environment: res && res.resultCode === 0 ? res.data : [],
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

    setSimpleInfo(state, { simpleInfo }) {
      return {
        ...state,
        simpleInfo,
      };
    },

    setEnvironmentInfo(state, { environment }) {
      return {
        ...state,
        environment,
      };
    },
  },
};
