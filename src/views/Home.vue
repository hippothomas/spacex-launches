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
    const pageId = this.$route.params.numero;

    // Si pageId est un nombre
    if (pageId % 1 === 0) {
      this.page = pageId;
    }

    const query = {
      query: {},
      options: {
        page: this.page,
      },
    };

    this.$axios.post('https://api.spacexdata.com/v4/launches/query', query)
      .then((response) => {
        this.launches = response.data.docs;
        this.totalPages = response.data.totalPages;
        this.page = response.data.page;
        this.prevPage = response.data.prevPage;
        this.nextPage = response.data.nextPage;

        if (this.totalPages < this.page) {
          this.$router.push('/404');
        }
      })
      .catch((error) => console.log(error));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  .pagination {
    width: 80%;
    max-width: 1100px;
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
