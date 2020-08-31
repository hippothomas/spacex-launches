<template>
  <div class="list">
    <LaunchList :data="launch" v-for="launch in launches" :key="launch.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LaunchList from '@/components/LaunchList.vue';

export default {
  name: 'List',
  props: {
    launches: Object,
  },
  components: {
    LaunchList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
