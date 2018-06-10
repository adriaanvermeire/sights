<script>
import Card from './CardBase';
import PickChart from '../Charts/PickChart';

export default {
  props: ['chart'],
  methods: {
    toggleCardInfo(id) {
      const card = document.getElementById(`card-${id}`);
      card.classList.toggle('info-active');
    },
  },
  components: {
    Card, PickChart,
  },
};
</script>

<style lang='scss'>
@import '@/assets/scss/vars.scss';

.btn-drag {
    cursor:move;
}

.sortable-chosen .card-body {
    opacity: 0.5;
    border: 3px solid $green;
}

.card-drag-move{
  transition: transform 0.5s;
}

.action .btn-link {
    color: $gray;
    transition: all 0.1s ease-in-out;
    &:hover {
        color: $black;
    }
}

table {
    thead {
        background-color: $green;
    }
    th, td {
        border: none;
        text-align: left;
    }
}

td:first-child{
    width: 50%;
}
</style>
