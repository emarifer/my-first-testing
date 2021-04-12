import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const mutations = {
  SET_DATA (state, data) {
    state.data = data;
  }
};

export const actions = {
  getAsync ({ commit }) { // Resuelto con promesas, que es lo que realmente devuelve "get"
    return axios.get('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => {
      commit('SET_DATA', response.data);
    })
    // .catch(err => console.log(err)); // No vamos a considerar errores.
  }
};

export default new Vuex.Store({
  state: {
    myAlias: 'Smartass',
    firstName: "Alice",
    lastName: "Doe",
    data: {},
  },
  mutations,
  actions,
  modules: {
  },
  getters: {
    getter_1: (state) => `${state.firstName} ${state.lastName}`,
    getter_2: () => (arg) => arg,
  },
});