<template>
    <div id="dashboard-meta-banner" class='px-4'>
        <div id="dashboard-meta-content">
            <div id="creationTime">
                Created on:
                <b>{{ createdAt | moment("LL") }}</b>
            </div>
            <div id="category">
                Category:
                <router-link :to="{ name: 'Home'}">
                    <b>{{ category ||''}}</b>
                </router-link>
            </div>
            <div id="profile-data">
                Made by
                <router-link :to="{ name: 'Home'}">
                    <b>{{ author || ''}}</b>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    createdAt() { return this.$store.getters.sightCreation; },
    author() { return this.$store.getters.sightAuthor; },
    category() { return this.$store.getters.sightCategory; },
  },
  created() {
    console.log('Getters', this.$store.getters);
  },
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
