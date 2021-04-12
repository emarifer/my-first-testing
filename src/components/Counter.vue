<template>
    <div>
        <span>{{ myCount }}</span>
        <button @click="increment">Increment</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                myCount: this.count,
            }
        },
        props: {
            count: {
                type: Number,
                default: 1,
            },
        },
        methods: {
            increment() {
                this.myCount++;
                this.$emit('increment', this.myCount);
            },
        },
    }
</script>