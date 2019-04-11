<template>
    <v-form ref="billingInfoForm" v-model="isBillingInfoFormValid">
        <v-container py-0>
            <v-layout
                    wrap
            >
                <v-flex xs12 md6>
                    <v-text-field
                            name="addressLine1"
                            placeholder="Address line 1"
                            type="text"
                            @input="onChange"
                            v-model="billingInfo.addressLine1"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md6>
                    <v-text-field
                            name="addressLine2"
                            placeholder="Address line 2"
                            type="text"
                            @input="onChange"
                            v-model="billingInfo.addressLine2"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md5>
                    <v-text-field
                            name="city"
                            placeholder="City"
                            type="text"
                            @input="onChange"
                            v-model="billingInfo.city"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md4>
                    <v-text-field
                            name="state"
                            placeholder="State"
                            type="text"
                            @input="onChange"
                            v-model="billingInfo.state"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 md3>
                    <v-text-field
                            name="zip"
                            placeholder="Zip"
                            type="text"
                            @input="onChange"
                            v-model="billingInfo.zip"
                            :rules="[rules.required, rules.notEmpty]">
                    </v-text-field>
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
            }
        },
        data () {
            return {
                isBillingInfoFormValid: false,
                billingInfo: {
                    addressLine1: '',
                    addressLine2: '',
                    city: '',
                    state: '',
                    zip: ''
                },
                rules: {
                    // TODO: add address validation with address-validator (https://www.npmjs.com/package/address-validator)
                    required: value => !!value  || 'Field is required.',
                    notEmpty: value => value.replace(/\s/g,"") != ""|| 'Field is required.'
                }
            }
        },
        methods: {
            onChange(data) {
                this.updateData(this.billingInfo)
                this.setIsFormValid(this.isFormValid())
            },

            isFormValid() {
                return this.$refs['billingInfoForm'].validate()
            }
        }
    }
</script>