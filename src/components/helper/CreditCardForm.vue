<template>
    <v-layout
            justify-center
            wrap
    >
        <v-flex xs12>
            <div class="card-wrapper">
                <card v-model="cardDetail" ref="creditCard"></card>
            </div>
        </v-flex>

        <v-flex xs6>
            <v-text-field
                    @input="onChange"
                    :error="!isValid('number')"
                    name="number"
                    placeholder="Card number"
                    type="tel"
                    v-model="cardDetail.number"
                    v-card-focus>
            </v-text-field>
        </v-flex>
        <v-flex xs6>
            <v-text-field
                    @input="onChange"
                    :error="!isValid('name')"
                    name="name"
                    placeholder="Full name"
                    type="text"
                    v-model="cardDetail.name"
                    v-card-focus>
            </v-text-field>
        </v-flex>
        <v-flex xs6>
            <v-text-field
                    @input="onChange"
                    :error="!isValid('expiry')"
                    name="expiry"
                    placeholder="MM/YY"
                    type="tel"
                    v-model="cardDetail.expiry"
                    v-card-focus>
            </v-text-field>
        </v-flex>
        <v-flex xs6>
            <!-- manual formatting is required for this field because the Card invert functionality is not compatible with v-text-field -->
            <div class="v-input v-text-field--placeholder theme--light" style="padding-top:12px; margin-top:4px;">
                <div class="v-input__control">
                    <div class="v-input__slot">
                        <div class="v-text-field__slot">
                            <input
                                    @input="onChange"
                                    :error="!isValid('cvc')"
                                    name="cvc"
                                    type="number"
                                    placeholder="CVC"
                                    v-model="cardDetail.cvc"
                                    v-card-focus>
                        </div>
                    </div>
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import card from 'vue-credit-card'

    export default {
        components: {
            card
        },
        props: {
            updateData: {
                type: Function,
                required: true
            }
        },
        data () {
            return {
                cardDetail: {
                    number: '',
                    name: '',
                    expiry: '',
                    cvc: null
                }
            }
        },

        methods: {
            onChange() {
                if (this.isFormValid()) {
                    this.updateData(this.cardDetail)
                }
            },

            isFormValid() {
                var result = true
                Object.keys(this.cardDetail).forEach(function (key) {
                    if (!this.isValid(key)) {
                        result = false
                        return
                    }
                }.bind(this))
                return result
            },

            isValid(field) {
                if (this.$refs.creditCard) {
                    return this.$refs.creditCard.classDisplay[field]['jp-card-valid']
                } else {
                    return false
                }
            }
        }
    }
</script>