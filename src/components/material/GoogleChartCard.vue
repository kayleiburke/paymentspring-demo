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
      v-show="data.length == 0"
      slot="header"
      bg
      fill-height
      grid-list-md
      text-xs-center
    >
      <v-layout
        row
        wrap
        align-center>
        <v-flex
          v-show="data.length == 0 && errors.length == 0">
          <v-progress-circular
            :width="4"
            :size="70"
            color="white"
            indeterminate
          />
        </v-flex>
        <v-flex
          v-show="errors.length > 0">
          <span>Data could not be loaded</span>
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
  components: {
    GChart
  },
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
    },
    errors: {
      type: Array,
      default: () => ([])
    },
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
