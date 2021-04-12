<template>
    <div>
        <button @click="handleCommit">Commit</button>
    </div>
</template>

<script>
    export default {
        name: 'ComponentWithMutation',
        data() {
            return {
                val: 'val',
            }
        },
        methods: {
            handleCommit() {
                this.$store.commit('MUTATION', { val: this.val });
            }
        },
        
    }
</script>