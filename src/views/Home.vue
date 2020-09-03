<template>
  <div class="home">
    <img alt="Logo" src="../assets/logo.png">
    <h1>Lancements de SpaceX</h1>
    <List :launches="launches"/>
    <div class="pagination">
        <div class="links">
          <a :href="'/page/' + prevPage" v-if="prevPage != null">
            &lt; Page précedente
          </a>
        </div>
        <div class="actual">
          Page {{page}}
        </div>
        <div class="links">
          <a :href="'/page/' + nextPage" v-if="nextPage != null">
            Page Suivante &gt;
          </a>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import List from '@/components/List.vue';

export default {
  name: 'Accueil',
  data() {
    return {
      launches: [],
      totalPages: 1,
      page: 1,
      prevPage: null,
      nextPage: null,
    };
  },
  components: {
    List,
  },
  created() {
    // On récupère l'id de la page passé en paramètre d'url
    const pageId = this.$route.params.numero;

    // Si pageId est un nombre
    if (pageId % 1 === 0) {
      this.page = pageId;
    }

    // Préparation de la requete à envoyer
    const query = {
      query: {},
      options: {
        page: this.page,
      },
    };

    // On recupère les informations en passant par un query pour avoir un pagination
    this.$axios.post('https://api.spacexdata.com/v4/launches/query', query)
      .then((response) => {
        this.launches = response.data.docs;
        this.totalPages = response.data.totalPages;
        this.page = response.data.page;
        this.prevPage = response.data.prevPage;
        this.nextPage = response.data.nextPage;

        // Si le numéro de page n'est pas dans la bonne fourchette de page
        if (this.totalPages < this.page) {
          this.$router.push('/404');
        }
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  .pagination {
    width: 80%;
    max-width: 950px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 25px;

    a, .actual {
      color: #fff;
      background-color: #1b1b1b;
      text-decoration: none;
      padding: 8px 13px;
      border-radius: 4px;
    }

    .links {
      width: 180px;
    }
  }
}
</style>
