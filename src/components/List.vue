<template>
  <div class="list">
    <ul>
      <li v-for="launch in launches" :key="launch.id">
        {{launch.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    launches: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
