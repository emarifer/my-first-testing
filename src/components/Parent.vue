<template>
    <div>
        Padre
        <ul>
            <li>PROPS</li>
            <li>Message: {{ message }}</li>
            <!-- <li>Enrique, el informatico</li> -->
            <li v-text="propComputed" />
            <!-- https://012.vuejs.org/api/directives.html#v-text -->
        </ul>
        <hr />
        <Child />
    </div>
</template>

<script>
    import Child from './Child';

    export default {
        name: 'Parent',
        components: {
            Child,
        },
        props: {
            message: {
                type: String,
                default: '',
            },
        },
        computed: {
            propComputed() {
                return `Propiedad Computada: ${this.message}`;
            },
        },
        data() {
            return {
                
            }
        },
    }
</script>