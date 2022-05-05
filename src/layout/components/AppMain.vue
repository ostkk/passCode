<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { getNewApplyNumber } from "@/api/user";
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    },
  },
  async mounted() {
    let n = await getNewApplyNumber();
    if (n.code == 200) {
      n = n.data.number;
    } else {
      n = 0;
    }
    this.$store.dispatch("app/getNumber", n);
  },
};
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
