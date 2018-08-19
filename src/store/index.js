import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import actions from './actions'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

export default store
