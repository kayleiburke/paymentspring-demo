<template>
  <v-footer
    id="core-footer"
    absolute
    height="82"
  >
    <div class="footer-items">
      <span
        v-for="link in links"
        :key="link.name"
      >
        <a
          :href="link.Link"
          class="tertiary--text footer-links">{{ link.name }}</a>
      </span>
    </div>
    <v-spacer/>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      <a
        href="https://github.com/kayleiburke"
        target="_blank">Kaylei Burke</a>, made with
      <a
              href="https://www.creative-tim.com/product/vuetify-material-dashboard"
              target="_blank">Vuetify Material Dashboard</a>
    </span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: []
  })
}
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
