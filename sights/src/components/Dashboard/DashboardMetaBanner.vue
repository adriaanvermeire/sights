<template>
    <div id="dashboard-meta-banner" class='px-4'>
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
            <div id="profile-data">
                <span>{{ likes }}</span>
                <like-button :sight='{ author, liked, likes, id }'/>
                Made by
                <router-link :to="{ name: 'Home'}">
                    <b>{{ author || ''}}</b>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import LikeButton from '@/components/Inputs/LikeButton';

export default {
  computed: {
    createdAt() { return this.$store.getters.sightCreation; },
    author() { return this.$store.getters.sightAuthor; },
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
    height: 50px;
    #dashboard-meta-content {
        display: flex;
        justify-content:space-between;

        a {
            color: $black;
        }
    }
}
</style>
