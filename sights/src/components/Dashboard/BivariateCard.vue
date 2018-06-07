<template>
<card :width='1' :id="`card-${chart._id}`" class='draggable align-items-stretch d-flex'>
    <template slot="title">
        <h5 class='m-0'>Relation between {{ fields.join(' and ') }}.</h5>
    </template>
    <template slot="actions">
        <div class="action">
            <button @click='toggleCardInfo(chart._id)' class='btn btn-link info-btn py-0'>
                <icon name='info-circle'/>
            </button>
        </div>
    </template>
    <pick-chart :chart='chart'/>
    <template slot="dragOverlay">
        <icon name='regular/chart-bar' scale='4'></icon>
        <h5>Move chart</h5>
    </template>
    <template slot="infoTitle">
        <h6>More info on the <i>{{ chart.fields.join(' and ') }}</i> fields</h6>
    </template>
    <template slot="infoOverlay">
        <div id="number-info" class='d-flex justify-content-center flex-column'>

        </div>
    </template>
</card>
</template>

<script>
import DashboardCard from './DashboardCard';

export default {
  extends: DashboardCard,
};
</script>

<style scoped lang='scss'>

</style>
