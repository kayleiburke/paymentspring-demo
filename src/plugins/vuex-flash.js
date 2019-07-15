import Vue from 'vue';
import VuexFlash from 'vuex-flash';

Vue.use(VuexFlash, {
    mixin: true,
    template:`
        <v-fade-transition mode="out-in">
            <material-notification
              v-if="show"
              class="mb-3"
              :color="variantClass"
              dismissible
            >
              {{ message }}
            </material-notification>
        </v-fade-transition>`,
    variantClass: function(){ return `${this.variant}`; }
});