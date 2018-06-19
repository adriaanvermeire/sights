<template>
    <univariate-card
        @remove-chart="$emit('remove-chart', $event)"
        :chart='chart' v-if='chart.univariate' />
    <bivariate-card
        @remove-chart="$emit('remove-chart', $event)"
        v-else :chart='chart' />
</template>

<script>
import UnivariateCard from '@/components/Card/UnivariateCard';
import BivariateCard from '@/components/Card/BivariateCard';

export default {
  props: ['chart'],
  components: { UnivariateCard, BivariateCard },
};
</script>

<style scoped>

</style>
