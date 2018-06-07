<template>
    <div id="dashboard-meta-banner" class='px-4'>
        <div id="dashboard-meta-content">
            <div id="category">
                Category: {{ category ||''}}
            </div>
            <div id="profile-data">
                Made by {{ author || ''}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    author() { return this.$store.getters.sightAuthor; },
    category() { return this.$store.getters.sightCategory; },
  },
  created() {
    console.log('Getters', this.$store.getters);
  },
};
</script>

<style lang='scss' scoped>
#dashboard-meta-banner {
    height: 50px;
    #dashboard-meta-content {
        display: flex;
        justify-content:space-between;
    }
}
</style>
