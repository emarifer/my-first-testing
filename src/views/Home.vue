<template>
  <div>
    <TheHeader title="Ensayando el Testing en VueJS" @send-data="dataReceived" />
    <div class="home">Valor emitdo por "TheHeader": <strong v-text="dataHeader" /></div>
    <img alt="Vue logo" src="../assets/logo.png">
    <hr />
    <Parent :message="valueParent" />
    <hr />
    <Foo />
  </div>
</template>

<style scoped>
  .home {
    margin-bottom: 1rem;
  }
</style>

<script>
  // @ is an alias to /src
  import TheHeader from '@/components/TheHeader';
  import Parent from '@/components/Parent';
  import Foo from '@/components/Foo';

  export default {
    name: 'Home',
    data() {
      return {        
        valueParent: '',
        dataHeader: '',
      }
    },
    components: {
      TheHeader,
      Parent,
      Foo,
    },
    methods: {
      dataReceived(status) {
        this.dataHeader = status;
        this.valueParent = status.value;
      },
    },
  }
</script>
