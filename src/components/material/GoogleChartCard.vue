<template>
  <material-card
    v-bind="$attrs"
    class="v-card--material-chart"
    v-on="$listeners"
  >
        <GChart
          v-show="data.length > 0"
          slot="header"
          :type="type"
          :data="data"
          :options="options"
        />
      <v-container
              bg
              fill-height
              grid-list-md
              text-xs-center
              slot="header"
              v-show="data.length == 0"
      >
          <v-layout row wrap align-center>
              <v-flex>
                  <v-progress-circular
                          :width="4"
                          :size="70"
                          color="white"
                          indeterminate
                  ></v-progress-circular>
              </v-flex>
          </v-layout>
      </v-container>

    <slot />

    <slot
      slot="actions"
      name="actions"
    />
  </material-card>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  inheritAttrs: false,

  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    eventHandlers: {
      type: Array,
      default: () => ([])
    },
    options: {
      type: Object,
      default: () => ({})
    },
    ratio: {
      type: String,
      default: undefined
    },
    responsiveOptions: {
      type: Array,
      default: () => ([])
    },
    type: {
      type: String,
      required: true,
      validator: v => ['AreaChart', 'LineChart'].includes(v)
    }
  },
  components: {
    GChart
  }
}
</script>

<style lang="scss">
  .v-card--material-chart {
    .v-card--material__header {
      .ct-label {
        color: inherit;
        opacity: .7;
        font-size: 0.975rem;
        font-weight: 100;
      }

      .ct-grid{
        stroke: rgba(255, 255, 255, 0.2);
      }
      .ct-series-a .ct-point,
      .ct-series-a .ct-line,
      .ct-series-a .ct-bar,
      .ct-series-a .ct-slice-donut {
          stroke: rgba(255,255,255,.8);
      }
      .ct-series-a .ct-slice-pie,
      .ct-series-a .ct-area {
          fill: rgba(255,255,255,.4);
      }
    }
  }
</style>
