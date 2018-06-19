<template>
<!-- <div class='card-wrap'> -->
    <div class="card">
        <div
            class="top-half w-25 h-25"
            v-if='draggable' @mouseover='toggleDrag' @mouseout="toggleDrag">
            <button class="btn btn-link btn-drag p-0" v-show='showDrag'>
                <icon name="ellipsis-v" color='grey'></icon>
                <icon name="ellipsis-v" color='grey'></icon>
            </button>
        </div>
        <div class="card-header" v-if='hasHeader'><slot name='header'></slot></div>
        <div class="card-body d-flex flex-column justify-content-between">
            <div class="card-title d-flex m-0"
                :class='{
                    "justify-content-center": !hasActions,
                    "justify-content-between": hasActions
                    }'
                v-if='hasTitle'>
                <slot name='title'></slot>
                <div class="actions d-flex justify-content-end">
                    <slot name="actions"></slot>
                </div>
            </div>
            <div class="card-subtitle d-flex"
                :class='{
                    "justify-content-center": !hasActions,
                    "justify-content-between": hasActions
                    }'
                v-if='hasSubtitle'>
                <h6 class='text-muted'><small><slot name='subtitle'></slot></small></h6>
            </div>
            <div class="card-text">
                <slot></slot>
            </div>
        </div>
        <div class="card-footer" v-if='hasFooter'><slot name='footer'></slot></div>
        <div id="drag-overlay" class='drag-overlay' v-if='hasDragOverlay'>
            <div class="drag-overlay-content drag-overlay
                d-flex justify-content-center align-items-center flex-column">
                <slot name="dragOverlay"></slot>
            </div>
        </div>
        <div id="card-info-overlay" v-if='hasInfoOverlay'>
            <div id="info" class='p-3'>
                <div class="top-bar d-flex align-items-center">
                    <button class="btn btn-link back-btn mr-3" @click='hideInfo'>
                        <icon name="angle-right" scale='2'></icon>
                    </button>
                    <slot name="infoTitle"></slot>
                </div>
                <div id="info-content" class=''>
                    <slot name="infoOverlay"></slot>
                </div>
            </div>
            <div class="blur" @click='hideInfo'></div>
        </div>
    </div>
<!-- </div> -->
</template>
<script>

export default {
  data() {
    return {
      showDrag: false,
    };
  },
  props: ['width', 'draggable'],
  methods: {
    toggleDrag() {
      this.showDrag = !this.showDrag;
    },
    hideInfo() {
      this.$el.classList.remove('info-active');
    },
  },
  computed: {
    hasHeader() { return this.$slots.header; },
    hasTitle() { return this.$slots.title; },
    hasSubtitle() { return this.$slots.subtitle; },
    hasFooter() { return this.$slots.footer; },
    hasActions() { return this.$slots.actions; },
    hasInfoOverlay() { return this.$slots.infoOverlay; },
    hasDragOverlay() { return this.$slots.dragOverlay; },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/vars.scss';

.card {
    overflow-x: hidden;
    box-shadow: 0 0 2px 0 rgba(43,49,63,.14), 0 3px 5px 0 rgba(43,49,63,.06);
    background-color: $light;
    border: none;
    border-radius: 0;
    .card-footer {
        border-top: none;
    }
}

#drag-overlay {
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;

    .drag-overlay-content {
        height: 100%;
        color: $white;
    }

    .sortable-chosen > & {
        // display: block;
        background-color: $green;
    }
}

#card-info-overlay {
    #info {
        height: 100%;
        transition: transform 0.3s ease-out;
        width: 80%;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateX(110%);
        background-color: $white;
        border-left: none;
        border-radius: 0.25rem;
        z-index: 10;
        overflow-y: auto;
        .info-active & {
            display: block;
            transform: translateX(0);
        }

        .back-btn.btn-link {
            display: block;
            padding: 0;
            margin-left: 0.3rem;
            color: $gray;
            transition: all 0.1s ease-in-out;
            &:hover {
                color: $black;
            }
        }
    }

    .blur {
        transform: translateX(110%);
        z-index: 9;
        background-color: transparent;
        transition: background-color 0.3s ease-out;
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        right: 0;
        border-radius: 0.25rem;

        .info-active & {
            background-color: $gray;
            opacity: 0.8;
            transform: translateX(0);
        }
    }

}

.top-half {
    position: absolute;
    top: 0;
    left: 0rem;

    .btn-drag {
        position: absolute;
        left: 0.3rem;
        top: 0.2rem;

        &:hover, &:active, &:focus {
            text-decoration: none;
        }

        svg:nth-child(2){
            position: relative;
            right: 0.2rem;
        }
    }


}
</style>

