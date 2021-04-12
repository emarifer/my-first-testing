import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import flushPromises from 'flush-promises'; // => npm i -D flush-promises
import Foo from '@/components/Foo';
import axios from 'axios';

// jest.mock('axios');

// describe('Component Foo', () => {
//     it('Fetches async when the button is clicked', async (/* done */) => {
//         const wrapper = shallowMount(Foo);
//         wrapper.find('button').trigger('click');
//         await flushPromises();
//         expect(wrapper.find('span').text()).toBe('value');
//         // wrapper.vm.$nextTick(() => {
//         //     expect(wrapper.vm.value).toBe('value');
//         //     done();
//         // }); // Es mejor testear el resultado que se renderiza en pantalla, que la implementacion "interna", en este caso la data del componente

//         // await flushPromises();
//         // expect(wrapper.vm.value).toBe('value');
//     });
// });

jest.useFakeTimers(); // Se usara un mock de setTimout
// IMPORTANTE: JEST NO CONSIDERA POR DEFAULT LOS TEMPORIZADORES. SI NO LOS VERIFICA LOS CONSIDERA FUNCIONES Y LINEAS NO CHECKEADAS, Y, POR TANTO, UN COVERAGE IMCOMPLETO.

describe('Component Foo', () => {
    it('Fetches users asynchronously when the button is clicked', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve().then(() => {
                return { data: { results: [ { name: { first: 'Enrique '} }, ] } };
            })
        );
        const wrapper = shallowMount(Foo);
        wrapper.find('button').trigger('click');
        await flushPromises(); 
        expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=10'); // Verifica que se llama a Axios (con la API correcta) con la implementacion mockeada, pero, en realidad, es una linea innecesaria
        console.log(wrapper.find('ul li:nth-of-type(1)').text());
        expect(wrapper.find('ul li:nth-of-type(1)').text()).toBe('Enrique');
    });
    // VER NOTA (1), SOBRE EL RECHAZO DE PROMESAS:
    it('Get users asynchronously when button is clicked, but there is an error', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject({ message: 'Error:' }));
        const wrapper = shallowMount(Foo);
        wrapper.find('button').trigger('click');
        await flushPromises(); 
        expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=10'); // Verifica que se llama a Axios (con la API correcta) con la implementacion mockeada, pero, en realidad, es una linea innecesaria
        // console.log(wrapper.find('.errorMessage').text());
        expect(wrapper.find('.errorMessage').text()).toContain('Error:');
        // expect(wrapper.vm.showModal).toBeFalsy(); // Verifica que showModal esta en true antes de ejecutar el temporizador
        jest.runAllTimers(); // Ejecuta los temporizadores mocks
        // expect(wrapper.vm.showModal).toBeFalsy(); // Verifica que showModal ha pasado a false
        // wrapper.vm.$nextTick(() => console.log(wrapper.find('.errorMessage').text()));
        wrapper.vm.$nextTick(() => { // Una vez que showModal esta en false…
            expect(wrapper.find('.errorMessage').text()).not.toContain('Error:');
        }); // …se comprueba que el modal "errorMessage" no contiene "Error:"
    }); // VER NOTA (3)

    // VER NOTA (2), SOBRE OTRA FORMA DE MANEJAR LAS PROMESAS RECHAZADAS    
    it('get fails', async () => { 
        jest.mock('axios', () => ({
            get: jest.fn().mockReturnValue(Promise.reject({ message: 'Error:' })),
        }));
        const wrapper = shallowMount(Foo);
        wrapper.find('button').trigger('click');
        await flushPromises();
        expect(axios.get('mock/api')).rejects.toEqual({ 
            message: 'Error:' // Verifica que "axios.get()" rechaza la promesa con el…
        }); // …objeto "{ message: 'Error:' }"
        // expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=10'); // Verifica que se llama a Axios (con la API correcta) con la implementacion mockeada, pero, en realidad, es una linea innecesaria
        console.log(wrapper.find('.errorMessage').text());
        expect(wrapper.find('.errorMessage').text()).toContain('Error:');
        jest.runAllTimers();
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.errorMessage').text()).not.toContain('Error:');
        });
    });
    /* it('Gets users asynchronously when component is mounted', async () => {
        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve().then(() => {
                return { data: { results: [ { name: { first: 'Enrique '} }, ] } };
            })
        );
        // const localVue = createLocalVue();
        // const wrapper = mount(Foo, {
        //     localVue,
        // }); // No es necesario
        const wrapper = mount(Foo);
        await flushPromises(); 
        expect(axios.get).toHaveBeenCalledWith('https://randomuser.me/api/?results=10'); // Verifica que se llama a Axios con la implementacion mockeada, pero, en realidad, es una linea innecesaria
        console.log(wrapper.find('ul li:nth-of-type(1)').text());
        expect(wrapper.find('ul li:nth-of-type(1)').text()).toBe('Enrique');
    }); */
});

/* 
    IMPORTANTE: VER CUANDO SE LLAMA A UNA FUNCION ASINCRONA AL MONTAR EL COMPONENTE:
    https://stackoverflow.com/questions/63994825/how-to-wait-for-an-async-call-to-finish-in-components-mount-callback-before-uni#63997432
    https://stackoverflow.com/questions/43879536/alternative-to-spyon-and-callfake-in-jestjs/43879623
    https://jestjs.io/docs/jest-object#jestspyonobject-methodname

    NOTA (1) SOBRE EL "MOCKEO" DE METODOS CON RECHAZO DE PROMESAS. VER:
    https://stackoverflow.com/questions/57704755/jest-how-to-mock-a-promise-on-the-same-file-for-resolve-and-reject-options#65825591

    NOTA (2). OTRA FORMA DE EFECTUAR Y TESTEAR METODOS CON RECHAZO DE PROMESAS. VER:
    https://stackoverflow.com/questions/63201827/how-to-mock-and-test-axios-rejected-promise#63202320    

    NOTA(3).- POR DEFECTO, JEST NO ENTRA EN EL CALLBACK DE LOS TEMPORIZADORES, PORQUE, EN REALIDAD, NO LOS EJECUTA, CON LO QUE LAS DECLARACIONES DEL CALLBACK QUEDAN SIN TESTEAR (NO APARECEN EN EL "COVERAGE"). SOBRE EL MANEJO DE LOS TEMPORIZADORES EN JEST VER:
    https://jestjs.io/docs/timer-mocks
    https://stackoverflow.com/questions/52633843/jest-unit-test-settimeout-not-firing-in-async-test#52638566
    https://stackoverflow.com/questions/56942805/how-to-get-inside-a-settimeout-function-using-jest
*/