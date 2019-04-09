<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        xs12
      >
        <material-card
          color="green"
          title="Payment Information"
          text="Please complete the form below"
        >
          <v-stepper v-model="step">
            <v-stepper-header>
              <v-stepper-step :complete="step > 1" step="1">Amount</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step :complete="step > 2" step="2">Payment Method</v-stepper-step>

              <v-divider></v-divider>

              <v-stepper-step step="3">Billing Info</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step="1">
                <v-form ref="form1" v-model="formsValid.form1">
                  <helper-currency-field
                          label='Amount'
                          v-model="amount"
                          :rules="[rules.required, amount > 0 || 'Must be greater than 0']"
                  ></helper-currency-field>

                  <v-text-field label="Description" v-model="description" required></v-text-field>

                  <v-btn color="primary" @click="incrementStep(step)">
                    Continue
                  </v-btn>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form ref="form2" v-model="formsValid.form2">
                  <v-radio-group v-model="paymentMethod">
                    <v-radio
                            v-for="n in paymentMethods"
                            :key="n"
                            :label="`${n}`"
                            :value="n"
                    ></v-radio>
                  </v-radio-group>

                  <helper-credit-card-form
                          v-show="paymentMethod == 'Credit Card'"
                          :updateData="updateCreditCardData"
                          :setIsFormValid="setIsCreditCardFormValid">
                  </helper-credit-card-form>

                  <material-error-notification v-if="formErrors.form2" :error="formErrors.form2"></material-error-notification>

                  <v-btn flat color="primary" @click.native="step = 1">Previous</v-btn>
                  <v-btn color="primary" @click="incrementStep(step)">
                    Continue
                  </v-btn>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-card
                        class="mb-5"
                        color="grey lighten-1"
                        height="200px"
                ></v-card>

                <material-error-notification :error="error"></material-error-notification>

                <v-btn flat color="primary" @click.native="step = 2">Previous</v-btn>
                <v-btn color="primary" @click="step = 1">
                  Continue
                </v-btn>

                <v-btn flat>Cancel</v-btn>
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </material-card>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import {_} from 'vue-underscore'

export default {
  data: () => ({
    error: '',
    step: 1,
    amount: null,
    description: null,
    paymentMethod: 'Credit Card',
    paymentMethods: [
      'Credit Card',
      'Bank Account'
    ],
    formsValid: {
      form1: false,
      form2: false,
      form3: false
    },
    formErrors: {
      form1: null,
      form2: null,
      form3: null
    },
    cardDetail: {
      number: '4532117080573700',
      name: 'Comprador T Cielo',
      expiry: '12/2018',
      cvc: '123'
    },
    registration:{
      amount:null,
      name:null,
      email:null,
      street:null,
      city:null,
      state:null,
      numtickets:0,
      shirtsize:'XL'
    },
    rules: {
      required: value => !!value  || 'Field is required.',
      greaterThanZero: v => v > 0 || 'Must be greater than 0'
    }
  }),
  methods:{
    incrementStep(step) {
      this.$refs['form' + step].validate()
      this.formErrors['form' + step] = null

      if (this.formsValid['form' + step]) {
        this.step = this.step + 1
      } else {
        this.formErrors['form' + step] = 'Please enter valid data before continuing'
      }
    },

    updateCreditCardData(data) {
      this.cardDetail = _.clone(data)
    },

    setIsCreditCardFormValid(isValid) {
      this.formsValid.form2 = isValid

      if (isValid) {
        this.formErrors.form2 = null
      }
    }
  }
}
</script>
