import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import store from "@/store";
import ComponentWithGetters from '@/components/ComponentWithGetters';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ComponentWithGetters -- Real Vuex Getters', () => {
  it('Renders a values from getters using a real Vuex getters', () => {
    const wrapper = mount(ComponentWithGetters, {
        store,
        localVue,
    });
    console.log(wrapper.find('.map-getters').text());
    console.log(wrapper.find('.computed-getters').text());
    expect(wrapper.find('.map-getters').text()).toEqual('Alice Doe');
    expect(wrapper.find('.computed-getters').text()).toEqual('value_2');
  });
});

describe('ComponentWithGetters', () => {
  describe('with a store within the test itself', () => {
    let store,
      getters;

    beforeEach(() => {
      getters = {
        getter_1: () => 'value_1',
        getter_2: () => (arg) => arg
      }
      store = new Vuex.Store({ getters })
    });

    it('Renders a values from getters', () => {
      const wrapper = mount(ComponentWithGetters, {
        store,
        localVue
      });

      expect(wrapper.find('.map-getters').text().trim()).toEqual('value_1');
      expect(wrapper.find('.computed-getters').text().trim()).toEqual('value_2');
    });

    // REEMPLAZO EN CALIENTE DE UN GETTER EN PARTICULAR, EN ESTE CASO "GETTER_1". VER:
    // https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
    // § "If you want to change the value of a getter for a particular test, you can use store.hotUpdate…"
    it('shows how to use store.hotUpdate', () => {
      store.hotUpdate({
        getters: {
          ...getters,
          getter_1: () => 'wrong_value'
        }
      });

      const wrapper = mount(ComponentWithGetters, {
        store,
        localVue
      });

      expect(wrapper.find('.map-getters').text().trim()).not.toEqual('value_1');
      expect(wrapper.find('.map-getters').text().trim()).toEqual('wrong_value');
      console.log(wrapper.find('.map-getters').text().trim());
      expect(wrapper.find('.computed-getters').text().trim()).toEqual('value_2');
    });

    it('Renders a values from mocks store with getters', () => {
      const wrapper = mount(ComponentWithGetters, {
        mocks: {
          $store: {
            getters: {
              getter_1: 'Enrique',
              getter_2: () => 'Marin'
            }
          }
        },
        localVue
      });

      expect(wrapper.find('.map-getters').text().trim()).toEqual('Enrique');
      expect(wrapper.find('.computed-getters').text().trim()).toEqual('Marin');
    });
  });

  // MOCKEO DEL STORE CON COMPUTED. VER:
  // https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components.html#mocking-getters-using-computed
  // https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
  // § "However… this is not always ideal, for a few reasons. We shouldn’t be testing whether the Vuex getters and mapGetters work — test your code, not the framework. There is another option…"
  describe('without a store -- as computed property', () => {
    it('renders a value from getters without a store', () => {
      const wrapper = mount(ComponentWithGetters, {
        localVue,
        computed: {
          getter_1: () => 'value_1',
          getter_2: () => 'value_2'
        }
      });

      expect(wrapper.find('.map-getters').text().trim()).toEqual('value_1');
      expect(wrapper.find('.computed-getters').text().trim()).toEqual('value_2');
    });
  });
});

/* 
    https://elabismodenull.wordpress.com/2018/04/09/vuejs-testeando-nuestros-stores/
    https://vue-test-utils.vuejs.org/guides/using-with-vuex.html
    https://vuex.vuejs.org/guide/testing.html#testing-mutations
    https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html#testing-with-a-real-vuex-store

    https://vuex.vuejs.org/guide/state.html#single-state-tree

    https://www.google.com/search?q=vue+test+vuex
    https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
    https://livebook.manning.com/book/testing-vue-js-applications/chapter-7/1

    https://vue-test-utils.vuejs.org/guides/testing-async-components.html
    https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/
    https://vue-test-utils.vuejs.org/api/wrapper/
*/