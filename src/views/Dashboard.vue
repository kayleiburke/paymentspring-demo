<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
            md12
            sm12
            lg12
      >
        <material-google-chart-card
                :data="paymentsChart.data"
                :options="paymentsChart.options"
                color="info"
                type="AreaChart"
        >
            <h3 class="title font-weight-light">Donation Summary</h3>
            <p class="category d-inline-flex font-weight-light">
                A summary of all donations made
            </p>

            <template slot="actions">
                <v-icon
                        class="mr-2"
                        small
                >
                    mdi-clock-outline
                </v-icon>
                <span class="caption grey--text font-weight-light">updated {{ new Date() | moment("dddd, MMMM Do YYYY, h:mm a") }}</span>
            </template>
        </material-google-chart-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  mounted () {
    this.getPayments()
  },
  data () {
    return {
      paymentsChart: {
        data: [['Date', 'Donations'], ['', 0]],
        options: {
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017'
          },
          crosshair: {
            color: 'white'
          },
          chartArea: {
            backgroundColor: {
              fill: 'info'
            },
          },
          hAxis: {
            format: 'MM/yy',
            gridlineColor: 'transparent',
            baselineColor: 'white',
            textStyle:{
              color: 'white',
              fontName: 'Roboto,sans-serif'
            }
          },
          vAxis:{
            baselineColor: 'white',
            gridlineColor: 'transparent',
            textStyle:{
              color: 'white',
              fontName: 'Roboto,sans-serif'
            },
            format: '$##,###'
          },
          animation:{
            duration: 1000,
            startup: true
          },
          lineWidth: 4,
          colors: ['white', '#ff9800', '#f44336'],
          // Colors the entire chart area, simple version
          // backgroundColor: '#FF0000',
          // Colors the entire chart area, with opacity
          backgroundColor: {
            fill: 'info',
            fillOpacity: 0
          },
          legend: {
            position: 'none'
          },
          tooltip: {
            color: 'white',
            fontName: 'Roboto,sans-serif'
          },
          pointsVisible: true
        }
      }
    }
  },
  methods: {
    getPayments () {
        this.$store.dispatch('getPayments')
            .then(function (response) {
                if (response.data) {
                  this.paymentsChart.data.pop()
                  this.paymentsChart.data = this.paymentsChart.data.concat(response.data)
                } else if (response.data.errors) {
                }
            }.bind(this)).catch(function (error) {
        }.bind(this))
    }
  }
}
</script>
