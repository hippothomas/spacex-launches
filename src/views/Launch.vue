<template>
  <div class="launch-wrap">
    <LaunchPage v-if="launch.links != undefined" :launch="launch"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LaunchPage from '@/components/LaunchPage.vue';

export default {
  name: 'Launch',
  props: ['launchPath'],
  data() {
    return {
      launch: {},
    };
  },
  components: {
    LaunchPage,
  },
  mounted() {
    let id = this.$route.path.split('-');
    id = id[id.length - 1];

    this.$axios.get(`https://api.spacexdata.com/v4/launches/${id}`)
      .then((response) => {
        this.launch = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.$router.push('/launch/404');
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
