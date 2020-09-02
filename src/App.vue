<template>
  <div id="app">
    <div id="nav">
      <div class="title">
        <router-link to="/">SpaceX Launches</router-link>
      </div>
      <div class="links-router">
        <router-link to="/">Accueil</router-link>
        <router-link to="/favorites">Favoris</router-link>
      </div>
    </div>
    <div id="wrapper">
      <router-view/>
    </div>
    <div id="footer">
      &copy; SpaceX Launches - 2020
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #wrapper {
    min-height: calc(100vh - 120px);
  }

  #nav {
    background: #1b1b1b;
    color: #fff;
    padding: 20px;
    margin-bottom: 25px;
    display: flex;
    justify-content: space-between;

    .title {
      font-weight: bold;
      a {
        text-decoration: none !important;
      }
    }

    a {
      color: #fff;
      margin-left: 15px;
      text-decoration: none;

      &.router-link-exact-active {
        text-decoration: underline;
      }
    }
  }

  #footer {
    margin-bottom: 10px;
  }
}
</style>
