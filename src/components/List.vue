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
    launches: Array,
  },
  components: {
    LaunchList,
  },
};
</script>
