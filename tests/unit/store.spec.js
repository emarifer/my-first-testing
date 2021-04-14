import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import flushPromises from 'flush-promises'; // => npm i -D flush-promises
Vue.use(Vuex);

import { actions, mutations } from '@/store';

// jest.mock('axios'); // Jest ya detecta mock de axios; no es necesario

// AQUI PROBAMOS EL STORE, INDEPENDIENTEMENTE DE CUALQUIER COMPONENTE/UI.

describe('Test actions -- store', () => {
    let store,
        setDataMock;

    beforeEach(() => {
        setDataMock = jest.fn()

        store = new Vuex.Store({
            state: { data: {} },
            mutations,
            actions
        })
    });

    it('Test with a mock commit (mutation)', () => {
        let count = 0,
            data;

        let mockCommit = (state, payload) => { // Asi mockeamos la mutacion
            count += 1;
            data = payload;
        };

        actions.getAsync({ commit: mockCommit }) // "getAsync" devuelve una promesa
            .then(() => {
                expect(count).toBe(1);
                expect(data).toEqual({ title: 'Mock with Jest' }); // El resultado esperado en el mock de axios.get. VER NOTA(1) ABAJO.
        });
    });

    it('Test using a mock mutation but real store', () => {
        store.hotUpdate({
            mutations: { SET_DATA: setDataMock }
        }); // Reemplazamos las mutaciones "en caliente" por la mutacion mock

        return store.dispatch('getAsync')
            .then((res) => {
                expect(setDataMock.mock.calls[0][1]).toEqual({ title: 'Mock with Jest' })
                expect(setDataMock.mock.calls).toHaveLength(1);
                expect(setDataMock).toHaveBeenCalledWith({ data: {} }, { title: 'Mock with Jest' }); // Esta ultima asercion es equivalente a las 2 anteriores
        }); // Usamos el "getAsync" real del store, pero le pasamos un mutacion mock. Se sigue usando el mock de axios. VER NOTA(2) ABAJO.
    }); // VER EXPLICACIONES EL FICHERO "mutations.spec.js"

    it('Tests using a mock axios and full store', () => {
        store.dispatch('getAsync')
            .then(() => expect(store.state.data).toEqual({ title: 'Mock with Jest' }));
    }); //  VER NOTA(3) ABAJO.

    it('Tests using a mock axios and full store but get fails', () => {        
        store.hotUpdate({
            actions: { getAsync: jest.fn().mockRejectedValueOnce({ message: 'Error:' }) }
        }); // Reemplazamos las actions "en caliente" por la action mock
        
        store.dispatch('getAsync')
            .then(() => console.log('Hola, Enrique'))
            .catch(err => expect(err).toEqual({ message: 'Error:' }));
        // expect(store.dispatch('getAsync')).rejects.toEqual({ message: 'Error:' });
    });
});

/* 
    NOTA(1):
    https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255
    § "We check that the correct payload is committed, and the mutation was committed by incrementing a counter. Pretty minimal, but it checks that getAsync is returning the right value, and commit the right value".

    NOTA(2):
    https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255
    § "Another way, which is a bit more effort, is actually make a store and mock the mutation. This is what I usually do when unit testing components that rely on the store"
    § "In the above example, I create an actual Vuex store, but mock the mutation, and then just assert the mutation was called once, with the right payload".

    NOTA(3);
    https://codeburst.io/a-pattern-for-mocking-and-unit-testing-vuex-actions-8f6672bdb255
    § "The above example uses the real mutation too, and verify the state changes — no mocking at all. However, this is not really a unit test any more — it’s doing too much.
    All three of the above tests verify the same things — the correct value is returned from the action, and then committed to the store.
    Ideally, we should best testing the smallest units of work. In this case, the first example, which mocks the commit. The mutation can be tested easily in another test, isolated from the rest of the store, since it’s just a plain old JavaScript function."
*/