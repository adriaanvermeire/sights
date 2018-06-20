<template>
<div id="dropdown-wrapper">
    <a href='#' @click.prevent='toggleDropdown'>
        <slot></slot>
    </a>
    <transition name='slide-fade'>
        <div id="dropdown" class='bg-light' v-if="show">
            <div id="dropdown-arrow"></div>
            <ul id='dropdown-list'>
                <li v-for='action of actions' :key='action.id' class='dropdown-item'>
                    <router-link :to="action.route">{{ action.name }}</router-link>
                </li>
                <li v-if='hasBelow' class="dropdown-divider"></li>
                <li v-if='hasBelow' class='dropdown-item'>
                    <slot name="below"></slot>
                </li>
            </ul>
        </div>
    </transition>
</div>
</template>

<script>

export default {
  data() {
    return {
      show: false,
    };
  },
  props: ['text', 'actions'],
  methods: {
    toggleDropdown(e, state) {
      this.show = typeof state === 'undefined' ? !this.show : state;
    },
  },
  computed: {
    hasBelow() { return this.$slots.below; },
  },
};
</script>

<style scoped lang='scss'>
@import '@/assets/scss/vars.scss';

#dropdown-arrow {
    position: absolute;
    top: 0;
    right: 12px;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid darken($light, 2.5%);
    transform: translateY(-8px);
}

#dropdown {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: absolute;
    right: 0;
    border-radius: 0.25rem;
    margin-top: 0.7rem;
    z-index: 1001;
    ul {
        padding: 0.5rem 0;
        li {
            text-align: left;
            font-weight: normal;
            cursor: pointer;

            &:hover{
                background-color: darken($light, 2.5%);
            }
        }
    }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .2s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
    transform-origin: top center;
  transform: scale(0.7);
  opacity: 0;
}
</style>

<style lang='scss'>
@import '@/assets/scss/vars.scss';

#dropdown-list >  .dropdown-item a:hover, a:hover {
    text-decoration: none !important;
}
#dropdown-list > .dropdown-item > a {
    padding-left: 1rem;
    padding-right: 3rem;
    font-family: $text-font ;
    color: $black !important;
}
</style>

