import Vue from 'vue';
import Vuex from 'vuex';
import { mount } from '@vue/test-utils';
import ComponentWithAction from '@/components/ComponentWithAction';

Vue.use(Vuex);

describe('ComponentWithAction', () => {
  let store,
    actions,
    state;

  beforeEach(() => {
    state = {
      data: {},
    }

    actions = {
      getAsync: jest.fn(), // Mockeamos la action
    }

    store = new Vuex.Store({
      state,
      actions,
    })
  });

  it('dispatches an getAsync action', () => {
    const wrapper = mount(ComponentWithAction, {
      store,
    });

    wrapper.find('button').trigger('click');

    expect(actions.getAsync.mock.calls).toHaveLength(1);
  }); // Nos aseguramos que el array de llamadas a la action simulada "getAsync" tenga una longitud de 1, lo que quiere decir que se le llamo un vez, es decir, probamos que el componente realizo la action. VER NOTA(1) ABAJO. 

  it('displays data from the state', () => {
    store.replaceState({
      data: 'Mock with replaceState' 
    });

    const wrapper = mount(ComponentWithAction, {
      store,
    })

    expect(wrapper.text().trim().includes('Mock with replaceState'))
      .toBe(true);
  });
});

/* 
    CODIGO DE LOS TEST DE MUTACIONES Y ACCIONES:
    https://github.com/lmiller1990/vuex-jest-mocking-examples

    NOTA(1):
    https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255
    § "We don’t really care what the action does, or the result — that is outside the responsibility of the component. We already tested getAsync earlier, so we know if it is dispatched, it does indeed work".
    § "We expect that the calls array has a length of 1; that the action was called once […] The rest of getAsync is already tested, so this is all we need to do here".

    NOTA(2). BUENAS PRACTICAS. RESUMEN IMPORTANTE:
    Las principales cosas que hay que recordar al realizar pruebas unitarias de aplicaciones Vue con Vuex son:
    1.- Las mutaciones son captadores (mas bien "setters" del store) que son simplemente objetos y funciones de JavaScript. Ni siquiera hay que crear un store para probarlos, ni hay que hacerlo. Prueba la unidad más pequeña posible y simula cualquier dependencia (mocks de axios, p.ej.).
    2.- Lo mismo ocurre con las acciones: pruébalas sin un store siempre que sea posible y simule cualquiera commit o mutations.
    3.- Cuando realices pruebas unitarias de componentes, simula cualquier acción y elimina las dependencias. Cada prueba solo debe probar una característica o funcionalidad única. Probar componentes consiste en asegurarse de que la interfaz de usuario refleje correctamente el estado actual, no sobre una mutación o modificación del estado existente. Eso debe hacerse en en el store y probarse de forma aislada.

    MAS INFORMACION:
    https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
    https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html#mutations-and-actions
    https://elabismodenull.wordpress.com/2018/04/09/vuejs-testeando-nuestros-stores/
*/