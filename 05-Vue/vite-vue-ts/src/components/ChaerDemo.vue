<!-- eslint-disable no-console -->
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'ChartDemo',
  setup() {
    const installData = ref([43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175])

    const chartOptions = computed(() => ({
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2016',
      },

      subtitle: {
        text: 'Source: thesolarfoundation.com',
      },

      yAxis: {
        title: {
          text: 'Number of Employees',
        },
      },

      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2010 to 2017',
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
          pointStart: 2010,
        },
      },

      series: [
        {
          name: 'Installation',
          data: installData.value,
        },
        {
          name: 'Manufacturing',
          data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
        },
        {
          name: 'Sales & Distribution',
          data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
        },
        {
          name: 'Project Development',
          data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
        },
        {
          name: 'Other',
          data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    }))

    const onRender = () => {
      console.log('Chart rendered')
    }

    const onUpdate = () => {
      console.log('Chart updated')
    }

    const onDestroy = () => {
      console.log('Chart destroyed')
    }
    return {
      chartOptions,
      onRender,
      onUpdate,
      onDestroy,
    }
  },
})
</script>

<template>
  <vue-highcharts
    type="chart"
    :options="chartOptions"
    :one-to-one-update="true"
    :redraw-on-update="true"
    :animate-on-update="true"
    @rendered="onRender"
    @updated="onUpdate"
    @destroyed="onDestroy"
  />
</template>
