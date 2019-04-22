<template>
  <v-container
    fill-height
    fluid
    grid-list-xl>
    <v-layout
      justify-center
      wrap
    >
      <v-flex xs12>
        <h3 class="display-3">Make a Donation</h3>

        <span class="subheading">
          Please fill out the form below to simulate making a donation.  Please note that this is for demo purposes only, and no credit cards or bank accounts will be charged.  When the payment form is submitted, a payment will be simulated through <a href="https://www.paymentspring.com">PaymentSpring</a> using a test credit card or bank account.
            </span>
        <v-divider class="my-3"></v-divider>
      </v-flex>
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
                  <v-container py-0>
                    <v-layout
                            wrap
                    >
                      <v-flex xs12 md12 class="hidden-lg-and-up">
                        <h4>Amount</h4>
                      </v-flex>
                      <v-flex xs12 md3>
                        <helper-currency-field
                                label='Amount'
                                v-model="amount"
                                :rules="[rules.required, amount > 0 || 'Must be greater than 0']"
                        ></helper-currency-field>
                      </v-flex>
                      <v-flex xs12 md12>
                        <v-text-field label="Description" v-model="description" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>

                  <v-btn color="primary" @click="incrementStep(step)">
                    Continue
                  </v-btn>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="2">
                <v-form ref="form2" v-model="formsValid.form2">
                  <v-flex xs12 md12 class="hidden-lg-and-up">
                    <h4>Payment Method</h4>
                  </v-flex>
                  <v-radio-group v-model="paymentMethod">
                    <v-radio
                            v-for="n in paymentMethods"
                            :key="n"
                            :label="`${n}`"
                            :value="n"
                            @change="onChangePaymentMethod"
                    ></v-radio>
                  </v-radio-group>

                  <v-flex>
                      <helper-credit-card-form
                              ref="creditCardForm"
                              v-show="paymentMethod == 'Credit Card'"
                              :updateData="updateCreditCardData"
                              :setIsFormValid="setIsForm2Valid">
                      </helper-credit-card-form>
                      <helper-bank-account-form
                              ref="bankAccountForm"
                              v-show="paymentMethod == 'Bank Account'"
                              :updateData="updateBankAccountData"
                              :setIsFormValid="setIsForm2Valid">
                      </helper-bank-account-form>
                  </v-flex>

                  <material-error-notification v-if="formErrors.form2" :error="formErrors.form2"></material-error-notification>

                  <v-btn flat color="primary" @click.native="step = 1">Previous</v-btn>
                  <v-btn color="primary" @click="incrementStep(step)">
                    Continue
                  </v-btn>
                </v-form>
              </v-stepper-content>

              <v-stepper-content step="3">
                <v-form ref="form3" v-model="formsValid.form3">
                  <v-flex>
                    <v-flex xs12 md12 class="hidden-lg-and-up">
                      <h4>Billing Info</h4>
                    </v-flex>
                    <helper-billing-info-form
                            ref="billingInfoForm"
                            :updateData="updateBillingInfoData"
                            :setIsFormValid="setIsForm3Valid">
                    </helper-billing-info-form>
                  </v-flex>
                </v-form>

                <v-flex sm12 v-if="showProgressBar">
                  <v-progress-circular
                          :size="50"
                          color="primary"
                          indeterminate
                  ></v-progress-circular>
                </v-flex>
                <material-error-notification v-if="formErrors.form3" :error="formErrors.form3"></material-error-notification>
                <material-error-notification v-if="paymentFailed" :error="paymentErrorMessage"></material-error-notification>
                <material-notification color="info" v-if="paymentSuccessful">
                  Payment successful
                </material-notification>

                <v-btn flat color="primary" @click.native="step = 2">Previous</v-btn>
                <v-btn color="primary" :disabled="showProgressBar" @click="submitPayment">
                  Submit Payment
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
import { mapGetters } from 'vuex'
import axios from 'axios'

export default {
  computed: {
    ...mapGetters('auth', ['currentUser', 'paymentspringApiKey', 'paymentspringPrivateApiKey'])
  },
  data: () => ({
    error: '',
    step: 1,
    totalSteps: 3,
    amount: null,
    description: null,
    paymentSuccessful: false,
    paymentFailed: false,
    paymentErrorMessage: null,
    showProgressBar: false,
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
    bankDetail: {
      accountNumber: '',
      routingNumber: '',
      firstName: '',
      lastName: '',
      accountType: null
    },
    cardDetail: {
      number: '4532117080573700',
      name: 'Comprador T Cielo',
      expiry: '12/2018',
      cvc: '123'
    },
    billingInfo: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: ''
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
        if (this.step < this.totalSteps) {
          this.step = this.step + 1
        }
      } else {
        this.formErrors['form' + step] = 'Please enter valid data before continuing'
      }
    },

    onChangePaymentMethod(paymentMethod) {
      this.formErrors.form2 = null
      this.formsValid.form2 = this.$refs[this.toCamelCase(paymentMethod) + 'Form'].isFormValid()
    },

    submitPayment() {
      this.paymentSuccessful = false
      this.paymentFailed = false
      this.paymentErrorMessage = null

      this.incrementStep(3)
      if (this.formsValid.form3) {
        this.getPaymentSpringToken()
      }
    },

    getPaymentSpringToken() {
      this.showProgressBar = true

      var paymentData = {
        address1: this.billingInfo.addressLine1,
        address2: this.billingInfo.addressLine2,
        city: this.billingInfo.city,
        state: this.billingInfo.state,
        zip: this.billingInfo.zip
      }

      if (this.paymentMethod == "Credit Card") {
        // we want to use one of PaymentSpring's test credit cards so that we don't make any charges to the card entered by the user,
        // since this site is for demo purposes only
        paymentData['token_type'] = "credit_card"
        paymentData['card_owner_name'] = "Grace Hopper"
        paymentData['card_number'] =  "4111111111111111"
        paymentData['card_exp_month'] = "12"
        paymentData['card_exp_year'] =  "2029"
        paymentData['csc'] = "999"
      } else if (this.paymentMethod == "Bank Account") {
        // we want to use one of PaymentSpring's test bank accounts so that we don't make any charges to the account entered by the user,
        // since this site is for demo purposes only
        paymentData['token_type'] = "bank_account"
        paymentData['bank_account_number'] =  "1234567890"
        paymentData['bank_routing_number'] = "100004058"
        paymentData['bank_account_holder_first_name'] =  "Grace"
        paymentData['bank_account_holder_last_name'] = "Hopper"
        paymentData['bank_account_type'] = "checking"
      }

      paymentspring.generateToken(this.paymentspringApiKey, paymentData, this.callbackFunction);
    },

    callbackFunction(response) {
      var params = {
        token: response.id,
        amount: this.amount * 100,
        send_receipt: false
      }

      var headers = {
        'Authorization': 'Basic ' + btoa(this.paymentspringPrivateApiKey)
      }
      axios.post("https://api.paymentspring.com/api/v1/charge", params, { headers: headers })
          .then(function (response) {
              this.showProgressBar = false
              if (response.data.successful) {
                this.paymentSuccessful = true
              } else if (response.data.error_message) {
                this.paymentFailed = true
                this.paymentErrorMessage = response.data.error_message
              }
          }.bind(this)).catch(function (error) {
              this.showProgressBar = false
              this.paymentFailed = true
              this.paymentErrorMessage = 'An error has occurred, please try again later.'
          }.bind(this))
    },

    updateCreditCardData(data) {
      this.cardDetail = _.clone(data)
    },

    updateBankAccountData(data) {
      this.bankDetail = _.clone(data)
    },

    updateBillingInfoData(data) {
      this.billingInfo = _.clone(data)
    },

    setIsForm2Valid(isValid) {
      this.formsValid.form2 = isValid

      if (isValid) {
        this.formErrors.form2 = null
      }
    },

    setIsForm3Valid(isValid) {
      this.formsValid.form3 = isValid

      if (isValid) {
        this.formErrors.form3 = null
      }
    },

    toCamelCase(str) {
      return str
              .replace(/\s(.)/g, function($1) { return $1.toUpperCase(); })
              .replace(/\s/g, '')
              .replace(/^(.)/, function($1) { return $1.toLowerCase(); });
    }
  }
}
</script>
