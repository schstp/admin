<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions(['loginByToken'])
  },
  created () {
    this.loginByToken()
  }
}
</script>

<style lang="scss">
  @import "assets/styles/base.scss";
  #app {
  }
</style>
