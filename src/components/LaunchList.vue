<template>
  <div class="launch">
    <div class="img">
        <img v-if="data.links.patch.small != null"
             :src="data.links.patch.small"
             :alt="data.name"/>
        <img v-else src="../assets/not_available.png" :alt="data.name"/>
    </div>
    <div class="details">
        <div class="title">
            {{data.name}}
        </div>
        <div class="description">
            {{data.details}}
        </div>
        <div class="favorite">
            <img src="../assets/star_empty.png" alt="Ajouter aux Favoris" />
        </div>
        <div class="read-more">
            <a :href="'/launch/' + data.name + '-' + data.id">Lire la suite...</a>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LaunchList',
  props: {
    data: Object,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.launch {
    width: 80%;
    max-width: 950px;
    margin: 20px auto;
    padding: 10px 0;
    background: #efefef;
    display: flex;
    justify-content: space-between;

    .img {
        width: 20%;
        height: 100%;
        padding: 10px;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .details {
        position: relative;
        width: 80%;
        padding: 10px 30px;

        .title {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 15px;
        }

        .description {
            max-height: 105px;
            overflow: hidden;
            text-align: left;
        }

        .favorite {
            position: absolute;
            top: 5px;
            right: 15px;

            img {
                width: 20px;
                height: 20px;
            }
        }

        .read-more {
            position: absolute;
            bottom: 15px;
            right: 15px;

            a {
                color: #fff;
                background: #1b1b1b;
                text-decoration: none;
                padding: 8px 13px;
                border-radius: 4px;
            }
        }
    }
}
</style>
