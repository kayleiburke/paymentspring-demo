<template>
  <v-flex xs6>
    <material-card
            color="green">
      <div
              slot="header"
      >
        <div class="title font-weight-light mb-2">Mock Donations</div>
      </div>

      <v-card-text>
        <v-layout
                row
                wrap>
          <v-flex
                  md12
                  sm12>

            <v-flex
                    v-show="paymentsLoading">
              <v-progress-circular
                      :width="4"
                      :size="70"
                      color="purple"
                      indeterminate
              />
            </v-flex>

            <material-notification
                    class="mb-3"
                    color="purple"
                    v-for="payment in payments"
            >
              {{ payment.user.first_name }} {{ payment.user.last_name }}
              donated {{ payment.amount | currency({symbol: '$', thousandsSeparator: ',', fractionCount: 2, fractionSeparator: '.'}) }}
              on {{ payment.created_at | moment("dddd, MMMM Do YYYY h:mm a") }}
            </material-notification>
          </v-flex>
        </v-layout>
      </v-card-text>
      <div class="text-center">
        <v-pagination
                v-model="page"
                :length="total_pages"
        ></v-pagination>
      </div>
    </material-card>
  </v-flex>
</template>

<script>
import { getErrorMessages } from "@/utils/errorHandlers"

export default {
  data () {
    return {
      payments: [],
      page: 1,
      per_page: 5,
      total_pages: 1,
      errors: [],
      paymentsLoading: false
    }
  },
  watch: {
    page: function(val, oldVal) {
      this.getPaymentChartData()
    }
  },
  mounted () {
    this.getPaymentChartData()
  },
  methods: {
    getPaymentChartData () {
      this.errors = []
      this.paymentsLoading = true
      this.$store.dispatch('getPayments', { page: this.page, per_page: this.per_page })
              .then(function (response) {
                if (response.data) {
                  this.total_pages = response.data.total_pages
                  this.payments = response.data.payments
                }
              }.bind(this))
              .catch(function (error) {
                  this.errors = getErrorMessages(error)
              }.bind(this))
              .finally(function() {
                 this.paymentsLoading = false
              }.bind(this))
    }
  }
}
</script>
