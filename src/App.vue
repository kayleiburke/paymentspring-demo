<template>
  <router-view></router-view>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    methods: {
    }
  }
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Import Bootstrap Vue Styles */
//@import '~bootstrap/dist/css/bootstrap.css';
//@import '~bootstrap-vue/dist/bootstrap-vue.css';
/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
  vertical-align: unset;
}
</style>
