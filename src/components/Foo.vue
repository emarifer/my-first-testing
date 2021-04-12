<template>
    <div>
        <h4>Componente Foo</h4>
        <button @click="fetchResults">Recuperar Usuarios</button>
        <h5>Lista de Usuarios</h5>
        <ul>
            <li v-for="(user, index) in users" :key="index">{{ user.name.first }}</li>
        </ul>
        <div :class="['errorMessage', {'hide': !showModal}]">
            Se ha producido un error al obtener los datos.
            <br />
            <strong>{{ errorMessage }}</strong>            
        </div>
    </div>
</template>

<style scoped>
    .errorMessage {
        margin: 10px;
        box-shadow: 0 0 10px 4px rgba(255, 0, 0, .5);
        padding: 10px;
        transition: 0.5s ease-in-out;
        opacity: 1;
        width: 400px;
        margin: auto;
    }

    .hide {
        opacity: 0;
        transition: 0.2s ease-in-out;
    }
</style>

<script> 
import axios from 'axios';
// import axios from '../../tests/__mocks__/axios'; // Para tests

    export default { 
        data () { 
            return {
                users: [],
                showModal: false,
                errorMessage: '',
            } 
        },
        // mounted() {
        //     this.fetchResults();
        // },
        methods: { 
            async fetchResults () { 
                try {
                    const response = await axios.get('https://randomuser.me/api/?results=10');
                    // const response = await axios.get('mock/api'); // Para tests
                    this.users = response.data.results;
                    // console.log(response);                    
                } catch (error) {
                    // console.log(error.message);
                    this.showModal = true;
                    this.errorMessage = error.message;
                    setTimeout(() => {
                        this.showModal = false;
                        this.errorMessage = '';
                    }, 3000);
                }
            }, 
        } 
    } 
</script>