<template>
    <div id="search">
        <icon name='search'></icon>
        <input @focus='focus' @blur='focus(false)' :placeholder='placeholder' type="text">
    </div>
</template>

<script>
export default {
  props: ['placeholder'],
  methods: {
    focus(state = true) {
      if (state) { this.$el.classList.add('active'); } else { this.$el.classList.remove('active'); }
    },
  },
};
</script>

<style scoped lang='scss'>
#search {
    position: relative;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);

    &:hover, &.active {
        box-shadow: 0 0 4px 0 rgba(43,49,63,.14), 0 8px 10px 0 rgba(43,49,63,.06);
    }
    input[type=text]{
        background-color: #fdfdfd;
        border: 1px solid transparent;
        padding:  0.375rem 0.5rem;
        padding-left: 2rem;

        &:focus, &:active {
            outline: none;
        }

        &::placeholder {
            text-transform: lowercase;
            color: lighten(lightgray, 1%);
        }
    }
    svg {
        position: absolute;
        transform: translate(50%, 75%);
        color: lighten(lightgray, 1%);
        transition: all 0.6s;
    }

    &.active svg {
        color: #2c3e50;
    }

}
</style>
