<template>
  <div id="launch">
    <div class="slider" v-if="launch.links.patch.large != null">
      <img :src="launch.links.patch.large" :alt="launch.name + ' Patch'">
    </div>
    <div class="slider" v-else>
      <img src="../assets/not_available.png" :alt="launch.name">
    </div>
    <div class="informations">
      <div class="header-wrapper">
        <div class="title-wrapper">
          <div class="title">{{launch.name}}</div>
          <div class="favorite" v-on:click="addtofav">
              <img src="../assets/star_empty.png"
                  alt="Ajouter aux Favoris"
                  v-if="favorite === false"/>
              <img src="../assets/star.png"
                  alt="Retirer des Favoris"
                  v-if="favorite === true"/>
          </div>
        </div>
        <router-link to="/">Retour à la Liste</router-link>
      </div>
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
import store from '@/store/FavoritesStore';

export default {
  name: 'LaunchPage',
  props: {
    launch: Object,
  },
  store: {
    store,
  },
  data() {
    return {
      rocket: {
        name: null,
        wikipedia: null,
      },
      launchpad: null,
      date: null,
      favorite: false,
    };
  },
  created() {
    // On check si le lancement est en favoris
    if (store.getters.launch(this.launch.id) !== undefined) {
      this.favorite = true;
    }

    // On crée un objet Date pour ensuite l'affichée formattée
    this.date = new Date(this.launch.date_utc);

    // On récupère les informations sur la fusée
    if (this.launch.rocket != null) {
      this.$axios.get(`https://api.spacexdata.com/v4/rockets/${this.launch.rocket}`)
        .then((response) => {
          this.rocket.name = response.data.name;
          this.rocket.wikipedia = response.data.wikipedia;
        });
    }

    // On récupère les informations sur le site lancements
    if (this.launch.launchpad != null) {
      this.$axios.get(`https://api.spacexdata.com/v4/launchpads/${this.launch.launchpad}`)
        .then((response) => {
          this.launchpad = response.data.name;
        });
    }
  },
  methods: {
    addtofav() {
      if (this.favorite === false) {
        // Ajout du lancement en favoris
        store.commit('ADD_FAV', this.launch.id);
        this.favorite = true;
      } else {
        // Suppression du lancement des favoris
        store.commit('REMOVE_FAV', this.launch.id);
        this.favorite = false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#launch {
  width: 80%;
  max-width: 1100px;
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

    .header-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      a {
        color: #fff;
        background-color: #1b1b1b;
        text-decoration: none;
        padding: 8px 13px;
        border-radius: 4px;
      }

      .title-wrapper {
        display: flex;
        align-items: center;

        .title {
          font-weight: bold;
          font-size: 30px;
        }

        .favorite {
          margin-left: 10px;
          cursor: pointer;

          img {
            width: 23px;
            object-fit: contain;
          }
        }
      }
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
