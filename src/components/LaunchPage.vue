<template>
  <div id="launch">
    <div class="slider" v-if="launch.links.patch.large != null">
      <img :src="launch.links.patch.large" :alt="launch.name + ' Patch'">
    </div>
    <div class="slider" v-else>
      <img src="../assets/not_available.png" :alt="launch.name">
    </div>
    <div class="informations">
      <div class="title">{{launch.name}}</div>
      <div class="date">
        {{date.toLocaleString()}}
      </div>
      <div class="details">
        {{launch.details}}
      </div>
      <div class="rocket" v-if="rocket.name != null">
        Rocket : <a :href="rocket.wikipedia" target="_blank">{{rocket.name}}</a>
      </div>
      <div class="launchpad" v-if="launchpad != null">Launchpad : {{launchpad}}</div>
      <div class="links">
        <div class="article">
          <a :href="launch.links.article" target="_blank">Lire l'article</a>
        </div>
        <div class="wikipedia">
          <a :href="launch.links.wikipedia" target="_blank">Page Wikipédia</a>
        </div>
      </div>
      <div class="webcast" v-if="launch.links.youtube_id != null">
        <iframe width="560"
                height="315"
                :src="'https://www.youtube.com/embed/' + launch.links.youtube_id"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaunchPage',
  props: {
    launch: Object,
  },
  data() {
    return {
      rocket: {
        name: null,
        wikipedia: null,
      },
      launchpad: null,
      date: null,
    };
  },
  created() {
    this.date = new Date(this.launch.date_utc);

    if (this.launch.rocket != null) {
      this.$axios.get(`https://api.spacexdata.com/v4/rockets/${this.launch.rocket}`)
        .then((response) => {
          this.rocket.name = response.data.name;
          this.rocket.wikipedia = response.data.wikipedia;
        });
    }

    if (this.launch.launchpad != null) {
      this.$axios.get(`https://api.spacexdata.com/v4/launchpads/${this.launch.launchpad}`)
        .then((response) => {
          this.launchpad = response.data.name;
        });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#launch {
  width: 80%;
  max-width: 950px;
  margin: auto;
  margin-bottom: 30px;
  display: flex;
  align-items: flex-start;

  .slider {
    width: calc(50% - 10px);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .informations {
    width: 50%;
    text-align: left;
    padding-left: 15px;

    .title {
      font-weight: bold;
      font-size: 30px;
    }

    .date {
      color: grey;
      font-weight: lighter;
      margin-bottom: 25px;
    }

    .details {
      margin-bottom: 15px;
    }

    .rocket a  {
      color: inherit;
    }

    .links {
      margin-top: 30px;
      margin-bottom: 30px;
      display: flex;

      > div {
        margin-right: 10px;

        a {
          color: #fff;
          background-color: #1b1b1b;
          text-decoration: none;
          padding: 8px 13px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
