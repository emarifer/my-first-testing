import { mount, shallowMount } from "@vue/test-utils";
import TheHeader from '@/components/TheHeader';
import Child from '@/components/Child';
import Parent from '@/components/Parent';
import App from '@/App';
import Home from '@/views/Home'; // Al incluirlo se muestra en el "coverage"

describe('Componente App', () => {
    const wrapper = shallowMount(App);
    it("Comprobamos que se renderiza 'App'", () => {
        expect(wrapper.html().includes('<div id="app">')).toBeTruthy();
        expect(wrapper.find('#app')).not.toBeUndefined();
    }); // Se muestran 2 formas de comprobar la renderizacion de vistas
});

describe('Componente Home', () => {
    const wrapper = mount(Home);
    it('Comprobamos que se renderiza Home', () => {
        expect(wrapper).toBeTruthy();
    });
    it("Check que al recibirse un evento 'mock-event' se dispara 'dataReceived'", () => {
        wrapper.vm.$on('mock-event', wrapper.vm.dataReceived); // "dataReceived" sera un listener
        wrapper.vm.$emit('mock-event', { status: true, value: 'Texto de prueba' }); // VER NOTA(3)
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('.home').text()).toContain('Texto de prueba');
            console.log(wrapper.vm.valueParent);
        });
    });
});

describe('Componente TheHeader', () => {
    const wrapper = mount(TheHeader);
    it('Comprobamnos que test funciona', () => {
        expect(true).toBeTruthy(); // "true es true"
    });

    it('Comprobamnos que se renderiza el elemento referenciado', () => {        
        expect(wrapper.vm.$refs.menu).not.toBeUndefined(); // Con "not" se afirma que no es "undefined". Sobre "vm" VER: https://vuejs.org/v2/api/#Instance-Properties
    });

    it('Comprobamos que el título está en el html cuando se lo pasamos al componente como props',
        async () => { // Se tiene que esperar al siguiente ciclo de actualizacion del DOM
            await wrapper.setProps({ title: 'Menú APP' });
            expect(wrapper.html().includes('Menú APP')).toBeTruthy();
        }
    ); // VER:
    // https://vue-test-utils.vuejs.org/guides/#simulating-user-interaction
    // https://vue-test-utils.vuejs.org/guides/#updates-applied-by-vue
});

describe('Probamos las dos formas de montar componentes', () => {
    it('Comprobamos el componente hijo', () => {
        const wrapperMount = mount(Child);
        const wrapperShallowMount = shallowMount(Child);
        console.log('---- Mount Child ----');
        console.log(wrapperMount.html());
        console.log('---------------');
        console.log('---- shallowMount Child ----');
        console.log(wrapperShallowMount.html());
        console.log('----------------------');
    });
    it('Comprobamos el componente padre', () => {
        const wrapperMount = mount(Parent);
        const wrapperShallowMount = shallowMount(Parent);
        console.log('---- Mount Parent ----');
        console.log(wrapperMount.html());
        console.log('---------------');
        console.log('---- shallowMount Parent ----');
        console.log(wrapperShallowMount.html());
        console.log('----------------------');
    });
});

describe('Montamos los componentes modificando las propiedades', () => {
    it('Mount Parent con las nuevas propiedades usando propsData', () => {
        const wrapperMount = mount(Parent, {
            propsData: { // VER NOTA(2) ABAJ0:
                message: 'Mensaje prueba jest / vue-test-utils',
            },
        });
        expect(wrapperMount.find('ul li:nth-of-type(2)').text()).toBe('Message: Mensaje prueba jest / vue-test-utils'); // VER NOTA(1) ABAJ0:
        // expect(wrapperMount.find('ul li:nth-of-type(3)').text()).toBe('Enrique, el informatico');
    });
    it('Mount Parent usando setProps', async () => {
        const wrapperMount = mount(Parent); // VER NOTA(2) ABAJ0:
        await wrapperMount.setProps({ message: 'Mensaje prueba jest / vue-test-utils' });
        expect(wrapperMount.find('ul li:nth-of-type(2)').text()).toBe('Message: Mensaje prueba jest / vue-test-utils');
    });
});

describe('Probando las propiedades computadas', () => {
    it('Probamos las propiedades computadas', async () => {
        const wrapperMount = mount(Parent);
        expect(wrapperMount.find('ul li:nth-of-type(3)').text()).toBe('Propiedad Computada:');
        await wrapperMount.setProps({ message: 'vue-test-utils' });
        expect(wrapperMount.find('ul li:nth-of-type(2)').text()).toBe('Message: vue-test-utils');
        expect(wrapperMount.find('ul li:nth-of-type(3)').text()).toBe('Propiedad Computada: vue-test-utils');
        // Otra forma de obtner la Propiedad Computada
        expect(wrapperMount.vm.propComputed).toBe('Propiedad Computada: vue-test-utils');
    });
});

jest.useFakeTimers(); // Se usara un mock de setTimout

describe('Probando la interacción del usuario', () => {
    it('Comprobamos que si añadimos algún valor, muestre un mensaje', async () => {
        const wrapper = mount(TheHeader);
        wrapper.find('input[type=text]').setValue('11111111111111');
        await wrapper.find('button').trigger('click'); // Poner el "await" en el "trigger"
        // await wrapper.vm.$nextTick(); // o poner esta linea es equivalente
        // expect(wrapper.find('.msnSendData').text()).toBe('Datos enviados'); // No es correcto, porque el contenido del div con la clase "msnSendData" siempre es "Datos enviados"
        expect(wrapper.find('.msnSendData').classes()).not.toContain('hide'); // Como la clase "hide" esta en "false", quiere decir que el modal esta visible (2s) y que, por tanto, el mensaje se muestra
        // expect(wrapper.vm.showModal).toBeTruthy(); // Es equivaLente, pero seria un detalle de "implementacion interna" del componente.
        jest.runAllTimers(); // Ejecutamos los temporizadores. VER NOTA (4)
        wrapper.vm.$nextTick(() => { // Al siguiente ciclo de actualizacion del DOM…
            expect(wrapper.find('.msnSendData').classes()).toContain('hide');
        }); // …ya contiene la clase "hide", es decir, que el modal ya no se ve
    });
    it('Check que si el input no tiene texto y enviamos, cambia su aspecto', async () => {
        const wrapper = mount(TheHeader);
        wrapper.find('input[type=text]').setValue('');
        await wrapper.find('button').trigger('click');
        wrapper.vm.$nextTick(() => {
            expect(wrapper.find('input[type=text]').classes()).toContain('error');
        });
    });
});

describe('Probando la emisión de eventos', () => {
    it('Check que se emite el evento con un objeto y luego otro evento con otro objeto',
        async () => {
            const wrapper = mount(TheHeader);
            wrapper.setData({ valueParent: 'Texto de prueba' });
            // wrapper.vm.sendData(); // Es equivalente a lo de abajo pero estamos operando sobre un detalle de la implementacion, y debemos hacerlo sobre la UI
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted()['send-data'][0]).toEqual([{ status: true, value: 'Texto de prueba' }]);
            jest.runAllTimers(); // Ejecutamos los temporizadores
            expect(wrapper.emitted()['send-data'][1]).toEqual([{ status: false, value: '' }]);
        }
    );
});

  /* 
    NOTA(1).- VER:
    https://developer.mozilla.org/es/docs/Web/CSS/:nth-of-type
    https://stackoverflow.com/questions/56576957/find-the-nth-element-in-vue-test-utils

    NOTA(2).- LA DIFENCIA ENTRE "propsData" y "setProps" ES QUE LA PRIMERA FORMA PARTE DE LA API DE VUE, NO DE VUE TEST UTILS. ADEMAS LA PROPIEDAD SE INYECTA CON EL COMPONENTE AL MONTARSE. EN CAMBIO "setProps", REQUIERE UN NUEVO CICLO DE ACTUALIZACION DEL DOM Y, POR TANTO, ES UN METODO ASINCRONO, YA QUE SE AGREGA EL VALOR DE LA PROPS CUANDO EL DOM ESTA MONTADO (ES UN METODO DE VUE TEST UTILS). VER:
    https://vue-test-utils.vuejs.org/api/options.html#propsdata
    https://vuejs.org/v2/api/#propsData
    https://vue-test-utils.vuejs.org/api/wrapper/setdata.html

    NOTA(3).- SE DISPARA EL MOCK-EVENT (QUE ES UN MOCK DE "SEND-DATA") PORQUE NO HAY QUE COMPROBAR UNA FUNCIONALIDAD PROPIA DE VUE, ES DECIR, QUE CUANDO UN COMPONENTE HIJO EMITE UN "CUSTOM EVENT" HACIA EL PADRE, ESTE LO RECIBE. VER;
    https://github.com/vuejs/vue-test-utils/issues/150#issuecomment-341888494
    https://github.com/vuejs/vue-test-utils/issues/145#issuecomment-341882376
    https://lmiller1990.github.io/vue-testing-handbook/

    NOTA(4).- POR DEFECTO, JEST NO ENTRA EN EL CALLBACK DE LOS TEMPORIZADORES, PORQUE, EN REALIDAD, NO LOS EJECUTA, CON LO QUE LAS DECLARACIONES DEL CALLBACK QUEDAN SIN TESTEAR (NO APARECEN EN EL "COVERAGE"). SOBRE EL MANEJO DE LOS TEMPORIZADORES EN JEST VER:
    https://jestjs.io/docs/timer-mocks
    https://stackoverflow.com/questions/52633843/jest-unit-test-settimeout-not-firing-in-async-test#52638566
    https://stackoverflow.com/questions/56942805/how-to-get-inside-a-settimeout-function-using-jest
  */

  /* 
    NOTA IMPORTANTE: Jest Coverage requiere codigo ejecutable (p,ej. la "data()") en la etiqueta <script> de los ficheros .vue, de lo contrario no se muestra en en el coverage. VER:
    https://stackoverflow.com/questions/56018030/code-coverage-ignoring-vuejs-component-files-despite-tests-being-successfully-ru
    https://youtrack.jetbrains.com/issue/WEB-38769
  */

  /* 
    https://tecnops.es/testing-en-javascript-con-jest-parte-1-de-2/
    https://tecnops.es/testing-en-javascript-con-jest-parte-2-de-2/
    https://stackoverflow.com/questions/25472665/watch-and-rerun-jest-js-tests#30013127

    https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-1/
    https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-2/
    https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-3/
    https://github.com/kimagure44/vue-test-utils

    https://vuejs.org/v2/api/#Instance-Properties

    https://jestjs.io/
    https://jestjs.io/docs/using-matchers

    https://elabismodenull.wordpress.com/2018/03/28/vuejs-testeando-nuestras-aplicaciones/
    https://elabismodenull.wordpress.com/2018/04/04/vuejs-testeando-nuestros-componentes/
    https://elabismodenull.wordpress.com/2018/04/09/vuejs-testeando-nuestros-stores/
    https://vue-test-utils.vuejs.org/api/wrapper/#wrapper

    https://vuejs.org/v2/guide/testing.html
    https://vue-test-utils.vuejs.org/
    https://es.vuejs.org/v2/cookbook/unit-testing-vue-components.html
    https://lmiller1990.github.io/vue-testing-handbook/

    https://learntdd.in/vue/
    https://outsidein.dev/
    https://livebook.manning.com/book/testing-vue-js-applications/about-this-book/
    https://leanpub.com/testingvuejscomponentswithjest

    https://www.paradigmadigital.com/dev/cypress-un-framework-de-pruebas-todo-en-uno/

    https://www.youtube.com/watch?v=rS_xxvwtfRw&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=5
    https://www.youtube.com/watch?v=f8kLwBYcmpE&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=6
    https://www.youtube.com/watch?v=z-DVMgomVqk
    https://www.youtube.com/watch?v=gZBdAJP2g0Y
  */