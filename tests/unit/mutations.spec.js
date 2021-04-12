import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import ComponentWithMutation from '@/components/ComponentWithMutation';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Mutations Tests', () => {
    let store,
        mutations;

    beforeEach(() => {
        mutations = {
            MUTATION: jest.fn(),
        }

        store = new Vuex.Store({ mutations })
    });

    it('commits a MUTATION type mutation when a button is clicked', () => {
        const wrapper = mount(ComponentWithMutation, {
            store,
            localVue
        });

        wrapper.find('button').trigger('click');

        // commit the correct mutation
        // with the correct payload
        expect(mutations.MUTATION).toHaveBeenCalledWith({}, { val: 'val' });
        // La mutacion "MUTATION" (que esta mockeada), como cualquier mutacion, se llama en el store con el estado, que como no lo hemos declarado, le ponemos un objeto vacio. El segundo argumento es el "payload", o carga util, que en este caso hemo elegido que sera la data del componente (pudiera ser cualquier cosa). Para una mutacion el test consiste que se llama a la mutacion correcta con el payload correcto. VER NOTA(1) ABAJO.

        expect(mutations.MUTATION.mock.calls).toHaveLength(1);
        expect(mutations.MUTATION.mock.calls[0][1]).toEqual({ val: 'val' });
        // Otra forma de hacer la verificacion. "mock.calls" es "Una matriz que contiene los argumentos de llamada de todas las llamadas que se han realizado a esta función mockeada. Cada elemento de la matriz es una matriz de argumentos que se pasaron durante la llamada". Como tiene longitud 1 (en la segunda asercion) quiere decir que la mutacion se llamo una vez. "mock.calls[0][1]" (en la tercera asercion) corresponde al payload pasado a la mutacion mockeada. VER NOTA(2) ABAJO.
    });
});

/* 
    NOTA(1);
    https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html#mutations-and-actions
    https://lmiller1990.github.io/vue-testing-handbook/vuex-in-components-mutations-and-actions.html#testing-with-a-real-vuex-store
    https://jestjs.io/es-ES/docs/expect#tohavebeencalledwitharg1-arg2-

    NOTA(2);
    https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301
    § "It’s better to use a real store when asserts mutations are committed, so you can not only asserts the method is called correctly, but the correct payload is passed. Note you have to do calls[0][1] — mutations always receive the state as the first argument, and the payload as the second"
    https://jestjs.io/es-ES/docs/mock-function-api#mockfnmockcalls
*/