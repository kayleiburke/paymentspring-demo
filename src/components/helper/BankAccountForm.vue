<template>
    <v-form ref="bankAccountForm" v-model="isBankAccountFormValid">
        <v-container py-0>
            <v-layout
                    wrap
            >
                <v-flex xs12 md6>
                    <v-text-field
                            name="accountNumber"
                            placeholder="Account number"
                            type="number"
                            @input="onChange"
                            v-model="bankDetail.accountNumber"
                            :rules="[rules.required, rules.accountNumber]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                    <v-text-field
                            name="routingNumber"
                            placeholder="Routing number"
                            type="number"
                            @input="onChange"
                            v-model="bankDetail.routingNumber"
                            :rules="[rules.required, rules.routingNumber]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field
                            name="firstName"
                            placeholder="First name"
                            type="text"
                            @input="onChange"
                            v-model="bankDetail.firstName"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field
                            name="lastName"
                            placeholder="Last name"
                            type="text"
                            @input="onChange"
                            v-model="bankDetail.lastName"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-select
                            :items="accountTypes"
                            @input="onChange"
                            v-model="bankDetail.accountType"
                            label="Account Type"
                    ></v-select>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>

    export default {
        components: {
        },
        props: {
            updateData: {
                type: Function,
                required: true
            },
            setIsFormValid: {
                type: Function,
                required: true
            },
            formName: {
                type: String,
                required: true
            }
        },
        created: function() {
            this.$parent.$on('autoPopulate', this.autoPopulate);
        },
        data () {
            return {
                isBankAccountFormValid: false,
                accountTypes: [
                    'Checking',
                    'Savings'
                ],
                bankDetail: {
                    routingNumber: '',
                    accountNumber: '',
                    firstName: '',
                    lastName: '',
                    accountType: 'Checking'
                },
                rules: {
                    required: value => !!value  || 'Field is required.',
                    notEmpty: value => value.replace(/\s/g,"") != ""|| 'Field is required.',
                    accountNumber: function(account) {
                        // TODO: add bank account validation
                        return true
                    },
                    routingNumber: function(routing) {
                        //taken from https://jsfiddle.net/MikeGrace/94KuA/
                        var msg = 'Routing number is invalid.'

                        if (routing.length !== 9) {
                            return msg
                        }

                        // http://en.wikipedia.org/wiki/Routing_transit_number#MICR_Routing_number_format
                        var checksumTotal = (7 * (parseInt(routing.charAt(0),10) + parseInt(routing.charAt(3),10) + parseInt(routing.charAt(6),10))) +
                            (3 * (parseInt(routing.charAt(1),10) + parseInt(routing.charAt(4),10) + parseInt(routing.charAt(7),10))) +
                            (9 * (parseInt(routing.charAt(2),10) + parseInt(routing.charAt(5),10) + parseInt(routing.charAt(8),10)))

                        var checksumMod = checksumTotal % 10;
                        if (checksumMod !== 0) {
                            return msg
                        } else {
                            return true
                        }
                    }
                }
            }
        },
        methods: {
            autoPopulate() {
                this.bankDetail = {
                    routingNumber: '100004058',
                    accountNumber: '1234567890',
                    firstName: 'Grace',
                    lastName: 'Hopper',
                    accountType: 'Checking'
                }
            },

            onChange(data) {
                this.updateData(this.bankDetail)
                this.setIsFormValid({ formName: this.formName, isFormValid: this.isFormValid() })
            },

            isFormValid() {
                return this.$refs['bankAccountForm'].validate()
            }
        }
    }
</script>
