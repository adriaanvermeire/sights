<template>
<div :class="{ 'col': !width, 'col-3': width == 1, 'col-6': width == 2 }" class='mb-4'>
    <div class="card">
        <div class="card-header" v-if='hasHeader'><slot name='header'></slot></div>
        <div class="card-body">
            <div class="card-title d-flex"
                :class='{"justify-content-center": !hasActions, "justify-content-between": hasActions}'
                v-if='hasTitle'>
                <slot name='title'></slot>
                <slot name="actions"></slot>
            </div>
            <div class="card-subtitle"  v-if='hasSubtitle'>
                <h3 class='text-muted'><slot name='subtitle'></slot></h3>
            </div>
            <div class="card-text">
                <slot></slot>
            </div>
        </div>
        <div class="card-footer" v-if='hasFooter'><slot name='footer'></slot></div>
    </div>
</div>
</template>
<script>
export default {
  props: ['width'],
  computed: {
    hasHeader() { return this.$slots.header; },
    hasTitle() { return this.$slots.title; },
    hasSubtitle() { return this.$slots.subtitle; },
    hasFooter() { return this.$slots.footer; },
    hasActions() { return this.$slots.actions; },
  },
};
</script>
<style lang="scss" scoped>

</style>

