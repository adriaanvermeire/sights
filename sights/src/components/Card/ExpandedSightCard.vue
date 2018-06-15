<template>
<div class="card p-0">
    <div class="card-body">
        <div class="card-title d-flex justify-content-between">
            <router-link :to="{ name: 'SightDetail', params: { id }}" class='text-dark'>
            <h5 class="m-0 text-left">{{ title }}</h5>
            </router-link>
            <div class="actions d-flex align-items-center">
                <span id="likes" :title='`${likes} Like(s)`'>{{ likes }} <icon name="heart"></icon></span>
                <span id="views" :title='`${views} View(s)`'>{{ views }} <icon name="eye"></icon></span>
                <router-link
                  title='Edit'
                  :to="{ name: 'EditSight', params: { id }}"
                ><icon name="pencil-alt"></icon></router-link>
            </div>
        </div>
        <div class="card-text text-left">
          <ul id="metadata">
            <li><b>Category: </b>{{ category }}</li>
            <li><b># Charts: </b>{{ charts }}</li>
            <li>
              <b>Dataset: </b>
              <a :href="downloadLink.link" :download='downloadLink.name'>{{downloadLink.name}}</a> ({{ (+dataset.size) | bytes }})</li>
          </ul>
        </div>
    </div>
    <div class="card-footer p-1 px-3 d-flex justify-content-between">
      <span id="createdAt">Date created: {{ createdAt | moment('LL') }}</span>
      <router-link
        :to="{ name: 'SightDetail', params: { id }}"
        class='text-dark'>
        <small>Visit Sight >></small>
      </router-link>
    </div>
</div>
</template>

<script>
import Notify from '@/mixins/Notifications';

export default {
  mixins: [Notify],
  data() {
    return {
      id: '',
      liked: false,
      title: '',
      author: '',
      category: '',
      likes: 0,
      createdAt: '',
      dataset: {},
      charts: 0,
      views: 0,
    };
  },
  props: ['sight'],
  computed: {
    user() {
      return this.$store.getters.getProfile.username;
    },
    userId() {
      return this.$store.getters.getProfile._id;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    downloadLink() {
      return {
        link: this.dataset.path,
        name: this.dataset.name,
      };
    },
  },
  mounted() {
    this.title = this.sight.name;
    this.author = this.sight.author;
    this.category = this.sight.category;
    this.liked = this.sight.likes.includes(this.userId);
    this.likes = this.sight.likes.length;
    this.id = this.sight.objectID;
    this.createdAt = this.sight.createdAt;
    this.dataset = this.sight.dataset;
    this.charts = this.sight.charts;
    this.views = this.sight.views;
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';

.card {
  box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
  background-color: $light;
  border: none;
  border-radius: 0;
  .card-footer {
    border-top: none;
  }
}

#metadata {
  padding: 0;
  list-style-type: none;
}

#links {
  a {
    color: lighten($gray, 50%);
    &:hover {
      color: $gray;

    }
  }
}
.actions {
  & > * {
    display: flex;
    align-items: center;
    margin: 0 0.3em;
    svg {
      margin-left: 0.3em;
    }
  }
  #likes {
    color: $red;
  }
  #views {
    color: $blue;
  }

  a {
    color: $black;
  }
}
</style>
