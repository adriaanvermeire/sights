<template>
<input ref="input" type="text" :value="value" @input="updateValue()">
</template>

<script>

export default {
  props: ['value'],
  methods: {
    updateValue() {
      this.$emit('input', this.$refs.input.value);
    },
  },
};
</script>

<style scoped lang='scss'>
input{
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    background-color: #fdfdfd;
    border: 1px solid transparent;
    padding:  0.375rem;
    width: 100%;

    &:focus, &:active {
        outline: none;
    }

    &::placeholder {
        text-transform: lowercase;
        color: lighten(lightgray, 1%);
    }
}
</style>
