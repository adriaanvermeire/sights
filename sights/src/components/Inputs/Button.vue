<template>
<button :class='pickClass'>
    <slot></slot>
</button>
</template>

<script>
export default {
  data() {
    return {
      variants: {
        dark: { dark: true },
        light: { light: true },
        success: { success: true },
        default: { default: true },
      },
    };
  },
  props: {
    variant: { type: String, default: 'default' },
  },
  computed: {
    pickClass() {
      try {
        return this.variants[this.variant];
      } catch (error) {
        console.error(error);
        return this.variants.default;
      }
    },
  },
};
</script>

<style scoped lang='scss'>
button {
    cursor: pointer;
    padding: 0.375em 1em;
    position: relative;
    border: none;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    transition: all 0.1s;
    &:hover {
        box-shadow: 0 0 4px 0 rgba(43,49,63,.14), 0 8px 10px 0 rgba(43,49,63,.06);
        &:active {
            box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
        }
    }

    &:focus, &:active {
        outline: none;
    }

    &.default {
        background-color: #E8E8E8;
    }

    &.dark {
        background-color: #565656;
        color: white;
    }

    &.success {
        background-color: #09eba7;
    }

    &.light {
        background-color: #fdfdfd;
    }
}
</style>
