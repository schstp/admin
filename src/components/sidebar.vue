<template>
    <div class="container">
      <b-list-group>
        <b-list-group-item button :active="theaterActive" @click="changeActiveTabToTheater">
          Театр
        </b-list-group-item>
        <b-list-group-item button :active="spectaclesActive" @click="changeActiveTabToSpectacles">
          Спектакли
        </b-list-group-item>
        <b-list-group-item button :active="ticketsActive" @click="changeActiveTabToTickets">
          Билеты
        </b-list-group-item>
      </b-list-group>
    </div>
</template>

<script>
export default {
  name: 'sidebar',

  data () {
    return {
      theaterActive: true,
      spectaclesActive: false,
      ticketsActive: false
    }
  },

  methods: {
    changeActiveTabToTheater () {
      if (this.theaterActive) return
      this.spectaclesActive = false
      this.ticketsActive = false
      this.theaterActive = true
      this.$emit('tab-changed', 'theater')
    },
    changeActiveTabToSpectacles () {
      if (this.spectaclesActive) return
      this.spectaclesActive = true
      this.ticketsActive = false
      this.theaterActive = false
      this.$emit('tab-changed', 'spectacles')
    },
    changeActiveTabToTickets () {
      if (this.ticketsActive) return
      this.spectaclesActive = false
      this.ticketsActive = true
      this.theaterActive = false
      this.$emit('tab-changed', 'tickets')
    }
  }
}
</script>

<style lang="scss" scoped>
  a {
    color: #ffffff;
    font-size: 18px;
  }

  .row {
    margin: 30px 0;
  }

  .col-12 {
    display: flex;
    justify-content: center;
  }
</style>
