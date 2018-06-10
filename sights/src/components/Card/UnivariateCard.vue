<template>
<card :width='1' :id="`card-${chart._id}`" class='draggable align-items-stretch d-flex'>
    <template slot="title">
        <h5 class='m-0'
            v-if='/bar|column/.test(chart.type)'>
            Top of {{ chart.fields[0] || 'No title' }}
        </h5>
        <h5 class='m-0' v-else>{{ chart.fields[0] || 'No title' }}</h5>
    </template>
    <template slot="subtitle" v-if='/bar|column/.test(chart.type)'>
        Showing the most occurring values for <i>{{ chart.fields[0] }}</i>.
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
        <h6>More info on the <i>{{ chart.fields[0] }}</i> field</h6>
    </template>
    <template slot="infoOverlay">
        <div id="number-info" class='d-flex justify-content-center flex-column'>
            <table class='table table-sm table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Categories</td>
                        <td>{{ chartData.uniqueValues }}</td>
                    </tr>
                    <tr>
                        <td>Entries</td>
                        <td>{{ chartData.total }}</td>
                    </tr>
                    <tr>
                        <td>Missing values</td>
                        <td>{{chartData.missing.length}}</td>
                    </tr>
                </tbody>
            </table>
            <template v-if='/number/.test(chartData.type)'>
            <table class='table table-sm table-bordered'>
                <thead>
                    <tr>
                        <th></th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Sum</td>
                        <td>{{ chartData.sum }}</td>
                    </tr>
                    <tr>
                        <td>Minimum</td>
                        <td>{{ chartData.min }}</td>
                    </tr>
                    <tr>
                        <td>Maximum</td>
                        <td>{{ chartData.max }}</td>
                    </tr>
                    <tr>
                        <td>Mean</td>
                        <td>{{ chartData.mean }}</td>
                    </tr>
                    <tr>
                        <td>Median</td>
                        <td>{{ chartData.median }}</td>
                    </tr>
                    <tr>
                        <td>Standard deviation</td>
                        <td>{{ chartData.stdDeviation }}</td>
                    </tr>
                </tbody>
            </table>
            </template>
        </div>
    </template>
</card>
</template>

<script>
import DashboardCard from './DashboardCard';

export default {
  extends: DashboardCard,
  computed: {
    chartData() {
      return this.chart.data[0];
    },
  },
};
</script>

<style scoped lang='scss'>

</style>
