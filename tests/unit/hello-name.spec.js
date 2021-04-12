import helloName from '@/hello-name';

describe('Test File hello-name.js', () => {
    it("Should get 'Hello Enrique'", () => {
        const name = 'Enrique';
        const message = helloName(name);
        expect(message).toBe(`Hello ${name}`);
    });

    it("Should get 'Hello undefined'", () => {
        const message = helloName();
        expect(message).toEqual(`Hello undefined`);
    });
});

/* 

https://tecnops.es/testing-en-javascript-con-jest-parte-1-de-2/
https://tecnops.es/testing-en-javascript-con-jest-parte-2-de-2/
https://stackoverflow.com/questions/25472665/watch-and-rerun-jest-js-tests#30013127

https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-1/
https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-2/
https://tecnops.es/test-unitarios-en-vue-jest-vue-test-utils-parte-3/
https://github.com/kimagure44/vue-test-utils

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
https://leanpub.com/testingvuejscomponentswithjest

https://www.paradigmadigital.com/dev/cypress-un-framework-de-pruebas-todo-en-uno/

https://www.youtube.com/watch?v=rS_xxvwtfRw&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=5
https://www.youtube.com/watch?v=f8kLwBYcmpE&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=6
https://www.youtube.com/watch?v=z-DVMgomVqk
https://www.youtube.com/watch?v=gZBdAJP2g0Y

*/