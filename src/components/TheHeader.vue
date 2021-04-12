<template>
    <div>
        <nav class="menu" ref="menu">
            <ul>
                <li><span v-text="title" /></li>
                <!-- https://012.vuejs.org/api/directives.html#v-text -->
                <li class="selected"><a href="#">Home</a></li>
                <li class="selected"><a href="#">About</a></li>
                <li class="selected"><a href="#">Contact</a></li>
            </ul>
        </nav>
        <hr />
        <input
          type="text"
          v-model="valueParent"
          placeholder="Texto padre"
          :class="{'error': showError}"
        >
        <button @click="sendData">Enviar</button>
        <div :class="['msnSendData', {'hide': !showModal}]">Datos enviados</div>
    </div>
</template>
  
<script>
    export default {
        name: 'the-header',
        props: {
            title: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                valueParent: '',
                showModal: false,
                showError: false,
            };
        },
        methods: {
            sendData() {
                if (this.valueParent.length > 0) {
                    this.$emit('send-data', { status: true, value: this.valueParent });
                    this.showError = false;
                    this.showModal = true;
                    setTimeout(() => {
                        this.showModal = false;
                        this.valueParent = '';
                        this.$emit('send-data', { status: false, value: this.valueParent });
                    }, 2000);
                } else {
                    this.showError = true;
                }
            },
        },
    };
</script>
  
<style scoped>
    .msnSendData {
        margin: 10px;
        box-shadow: 0 0 10px 1px rgba(0,0,0,.2);
        padding: 10px;
        transition: 180ms ease-in-out;
        opacity: 1;
        width: 200px;
        margin: auto;
    }
    .hide {
        opacity: 0;
        transition: 180ms ease-in-out;
    }
    .error {
        box-shadow: 0 0 10px 4px rgba(255,0,0,.2);
        border: 0;
        padding: 5px;
        margin-right: 10px;
    }
    input {
        margin: 1rem;
    }
    .menu {
        box-shadow: 2px 2px 5px rgb(70, 70, 70);
    }
    ul {
        list-style: none;
        background: #333;
        display: flex;
        color: white;
    }
    li {
        padding: 10px;
        cursor: pointer;
    }
    li a {
        color: white;
        display: block;
        text-decoration: none;
    }
    li a:hover {
        background: cadetblue;
        color: white;
        transition: ease-in-out 0.5s;
    }
    li span {
        margin-right: 10rem;
    }
</style>

<!-- 
    NOTA IMPORTANTE: Jest Coverage requiere codigo ejecutable (p,ej. la "data()") en la etiqueta <script> de los ficheros .vue, de lo contrario no se muestra en en el coverage. VER:
    https://stackoverflow.com/questions/56018030/code-coverage-ignoring-vuejs-component-files-despite-tests-being-successfully-ru
    https://youtrack.jetbrains.com/issue/WEB-38769
 -->

<!-- 
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
  https://leanpub.com/testingvuejscomponentswithjest

  https://www.paradigmadigital.com/dev/cypress-un-framework-de-pruebas-todo-en-uno/

  https://www.youtube.com/watch?v=rS_xxvwtfRw&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=5
  https://www.youtube.com/watch?v=f8kLwBYcmpE&list=PLhUgIC9rBjML2LcWuneSuEQxL28GQQV4i&index=6
  https://www.youtube.com/watch?v=z-DVMgomVqk
  https://www.youtube.com/watch?v=gZBdAJP2g0Y

-->