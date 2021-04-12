import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from 'vuex';
import store from "@/store";
import ComponentWithState from '@/components/ComponentWithState';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('ComponentWithState -- Test State -- Some Testing Options', () => {
    
    it('Renders a alias using a real Vuex state', () => {
        const wrapper = mount(ComponentWithState, {
            store,
            localVue,
        });
        expect(wrapper.find('.names').text()).toContain('Smartass');
    });
    it('Renders a alias using a mock Vuex state', () => {
        const state = {
            myAlias: 'Bitch',
        };
        const store = new Vuex.Store({ state });
        const wrapper = mount(ComponentWithState, {
            store,
            localVue,
        });
        console.log(wrapper.find('.names').text());
        expect(wrapper.find('.names').text()).toContain('Bitch');
    });
    it('Renders a first name using a real Vuex state (computed property)', () => {
        const wrapper = mount(ComponentWithState, {
            store,
            localVue,
        });
        expect(wrapper.find('.names').text()).toContain('Alice');
    });
    it('Renders a last name using a real Vuex state (computed property with mapState helper)',
        () => {
            const wrapper = mount(ComponentWithState, {
                store,
                localVue,
            });
        expect(wrapper.find('.names').text()).toContain('Doe');
    });
    it('Renders a last name using a mock Vuex state (computed property with mapState helper)',
        () => {
            const wrapper = mount(ComponentWithState, {
                mocks: {
                    $store: {
                      state: {
                        lastName: 'Marin'
                      }
                    }
                  },
                localVue,
            });
        console.log(wrapper.find('.names').text());
        expect(wrapper.find('.names').text()).toContain('Marin');
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