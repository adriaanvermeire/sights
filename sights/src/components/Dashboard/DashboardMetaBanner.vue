<template>
    <div id="dashboard-meta-banner" class='px-4 py-2'>
    <div id="top" class='d-flex d-lg-none'>
        <h5 class='m-0 d-flex d-lg-none' v-if='name'>{{ name }}</h5>
        <div id="likes">
            <span>{{ likes }}</span>
            <like-button :sight='{ author, liked, likes, id }'/>
        </div>
        <button class='btn btn-link d-md-none d-flex' @click='toggleSidebar'>
            <icon name="bars" scale='2'></icon>
        </button>
    </div>
        <div id="dashboard-meta-content">
            <div id="creationTime">
                Created on:
                <b>{{ createdAt | moment("LL") }}</b>
            </div>
            <div id="category">
                Category:
                <router-link :to="{ name: 'Explore', query: { category }}">
                    <b>{{ category ||''}}</b>
                </router-link>
            </div>
            <div id="right">
                <div id="likes" class='d-lg-flex d-none'>
                    <span>{{ likes }}</span>
                    <like-button :sight='{ author, liked, likes, id }'/>
                </div>
                <div id="profile-data">
                    Made by
                    <router-link :to="{ name: 'PublicProfile', params: { username: author }}">
                        <b>{{ author || ''}}</b>
                    </router-link>
                </div>
                <button class='btn btn-link d-none d-md-flex' @click='toggleSidebar'>
                    <icon name="bars"></icon>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
import LikeButton from '@/components/Inputs/LikeButton';
import { DETAIL_SIDEBAR } from '@/store/actions/detail';

export default {
  methods: {
    toggleSidebar() {
      this.$store.commit(DETAIL_SIDEBAR);
    },
  },
  computed: {
    createdAt() { return this.$store.getters.sightCreation; },
    author() { return this.$store.getters.sightAuthor; },
    name() { return this.$store.getters.sightName; },
    category() { return this.$store.getters.sightCategory; },
    liked() { return this.$store.state.sight.liked; },
    likes() { return this.$store.state.sight.likes.length; },
    id() { return this.$store.state.sight.id; },
  },
  components: { LikeButton },
};
</script>

<style lang='scss' scoped>
@import '@/assets/scss/vars.scss';

#dashboard-meta-banner {
    flex: 1;

    #top {
        text-align: left;
        align-items: center;
        justify-content: space-between;
        #likes {
            margin-left: 1em;
            display: flex;
            flex-direction: row-reverse;
            button {
                margin-right: 0.5em;
            }
        }
    }

    #dashboard-meta-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        @media only screen and (max-width: 576px) {
            flex-direction: column;
            align-items: flex-start;
        }

        a {
            color: $black;
        }

        #right {
            display: flex;
            align-items: center;
            & + button {
                margin-left: 1em;
            }
            @media only screen and (max-width: 576px) {
                flex-direction: column-reverse;
                align-items: flex-start;

                // & > *:first-child {
                    // margin-left: 1em;
                // }
            }
         }
    }
}
</style>
