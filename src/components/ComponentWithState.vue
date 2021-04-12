<template>
    <div class="names">
        My Alias is: {{ myAlias }}
        <br />
        My First Name is: {{ firstName }}
        <br />
        My Last Name is: {{ lastName }}
    </div>
</template>

<script>
    import { mapState } from "vuex";

    export default {
        name: 'ComponentWithStore',
        data() {
            return {
                myAlias: this.$store.state.myAlias,
            }
        },
        computed: {
            firstName() {
                return this.$store.state.firstName
            },
            ...mapState(['lastName']),
        }
    }
</script>