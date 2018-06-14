<template lang="html">
<div id="homepage" class='container-fluid mx-auto px-5'>
  <div id="top" class='d-flex justify-content-center mb-3'>
    <div id="left" v-if='!isAuthenticated'>
      <vue-tabs id="loginRegister" class='w-100'>
          <v-tab title="Sign Up">
            <h2 class="register-title">Sign Up</h2>
            <div class="register-text">
              <p>
                Making an account at Sights enables you to share your own Sights and like others'
              </p>
            </div>
            <register-form />
          </v-tab>
          <v-tab title="Login">
            <h2 class="login-title">Login</h2>
            <div class="login-text">
              <p>Log in to your account to see your Sights, your favorites and more</p>
            </div>
            <login-form :register-link="false"/>
          </v-tab>
      </vue-tabs>
    </div>
    <div id="right" :class='{ "authenticated": isAuthenticated }'>
      <div id="sights-logo" class='d-flex justify-content-center align-items-center'>
        <img class='img-fluid' src="@/assets/graphics/logo-sights-notext-crop.png" alt="Sights">
        <h1 class='text-success'>Sights</h1>
      </div>
      <div id="about">
        <h4>With Sights you can...</h4>
        <ul>
          <li><h5>Upload, find, analyze and share datasets</h5></li>
          <li><h5>Easily upload a file and everything will be done for you</h5></li>
          <li><h5>Forget about trying to figure your spreadsheet programma</h5></li>
        </ul>
        <h4>And most of all...</h4>
        <ul>
          <li><h5>Enjoy the data!</h5></li>
        </ul>
        <a-button class='mt-5' variant="success">
          <h5 class='m-0'><router-link :to="{ name: 'Explore' }">Explore Sights now</router-link></h5>
        </a-button>
      </div>
    </div>
  </div>
  <div id="featured">
    <h2>Most popular of the week:</h2>
    <div class="sights-grid">
      <sight-card v-for="sight of sights" :key="sight._id" :sight="sight" />
    </div>
    <router-link :to="{ name: 'Explore' }">Check out more >></router-link>
  </div>
</div>
</template>

<script>
import SightService from '@/services/SightService';
import SightCard from '@/components/Card/SightCard';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';

export default {
  data() {
    return {
      sights: [],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  async mounted() {
    const response = await SightService.getFeatured();
    this.sights = response.data.map(d => ({
      name: d.name,
      author: d.author[0].username,
      category: d.category[0].name,
      likes: d.likes,
      likeCount: d.likeCount,
      objectID: d._id,
    }));
  },
  components: {
    SightCard, LoginForm, RegisterForm,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';
@import 'vue-nav-tabs/themes/vue-tabs.css';

#top {
  & > * {
    width: 33%;
  }
  #left {

  }

  #right {
    // flex-column py-5 pl-4 align-items-start
    display: flex;
    flex-direction: column;
    padding-left: 1.3em;
    align-items: flex-start;

    #sights-logo {
      img {
      color: $green;
      font-family: $heading;
      font-size: 10em;
      font-weight: bold;
      height: 0.5em;
      }
        h1 {
          font-size: 5em;
          margin-left: 0.3em;
        }
    }

    #about {
      margin-top: 1.8em;
      text-align: left;
      ul {
        list-style-type: none;
        h5 {
          font-weight: 300;
        }
      }
    }

    &.authenticated {
      align-items: center;
      #about {
        text-align: center;
        ul {
          padding: 0;
        }
      }
    }
  }
}

#featured {
  margin-top: 3em;
  display: flex;
  flex-direction: column;

  h2 {
    text-align: left;
  }

  a {
    margin-top: 1em;

    color: $black;
    font-family: $heading;
    font-size: 1.1em;
    font-weight: bold;
    align-self: flex-end;
  }
}
</style>

<style lang="scss">
@import '@/assets/scss/vars.scss';
#loginRegister.vue-tabs {
  .tab-content {
    background-color: $light;
    padding: 1em;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    border: none;
    border-radius: 0;
  }
  .nav-tabs {
    display: flex;

    .tab {
      width: 50%;
      border: none;
      .tabs__link {
        background-color: $light;
        border: none;
        border-radius: 0;
        box-shadow: inset 0 -2px 5px rgba(0,0,0,.08);
        &.active_tab {
          // box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 0 5px 0 rgba(43,49,63,.06);;
          box-shadow: none;
        }
      }
    }
  }
}
</style>

