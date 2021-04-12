<template>
    <div>
      <button @click="getAsync">Get Async</button>
      {{ $store.state.data }}
    </div>
</template>

<script>
    export default {
        name: 'ComponentWithAction',  
        methods: {
            getAsync () {
                this.$store.dispatch('getAsync')
            },
        },
    }
</script>