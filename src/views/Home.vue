<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Lancements de SpaceX</h1>
    <List data="{{launches}}"/>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue';

export default {
  name: 'Accueil',
  components: {
    List,
  },
};
</script>
