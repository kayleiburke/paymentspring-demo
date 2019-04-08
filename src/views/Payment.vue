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
                  <helper-currency-field
                          label='Amount'
                          v-model="amount"
                          :rules="[rules.required, amount > 0 || 'Must be greater than 0']"
                  ></helper-currency-field>

                  <v-text-field label="Description" v-model="description" required></v-text-field>

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
export default {
  data: () => ({
    error: '',
    step: 1,
    amount: null,
    description: null,
    formsValid: {
      form1: false,
      form2: false,
      form3: false
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

      if (this.formsValid['form' + step]) {
        this.step = this.step + 1
      }
    }
  }
}
</script>
