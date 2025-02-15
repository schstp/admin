<template>
  <div class="home">
    <b-navbar toggleable="sm" type="dark" variant="dark">
      <b-navbar-brand href="#">
        Спектакль.<span class="appendix">ru</span> | {{ theater !== null ? theater.name : '' }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto alert-link">
          <b-link href="http://host1813162.hostland.pro/" target="_blank">Посмотреть сайт</b-link>
        </b-navbar-nav>
        <b-navbar-nav class="ml-3">
          <b-button @click="confirmLogout">Выйти</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="content">
      <div class="sidebar">
        <sidebar v-on:tab-changed="refreshData" class="sidebar-inner"></sidebar>
      </div>
      <div class="content-wrapper">
        <b-overlay
          :show="loadingState && (theaterId !== null)"
          rounded
          opacity="0.6"
          spinner-variant="dark"
          class="h-100"
        >
        <div class="h-100">
          <div class="row h-100 theater">
              <div class="col-12">
                <theater-edit-form
                  v-on:loading-state-changed="changeLoadingState"
                  v-if="isTheaterTabChosen"
                  :theater="theater">
                </theater-edit-form>
                <spectacles-edit-from
                  v-on:loading-state-changed="changeLoadingState"
                  v-else-if="isSpectaclesTabChosen"
                  :spectacles="spectacles">
                </spectacles-edit-from>
                <events-edit-form
                  v-on:loading-state-changed="changeLoadingState"
                  v-else-if="isEventsTabChosen"
                  :events="events"
                >
                </events-edit-form>
                <tickets-edit-form
                  v-on:loading-state-changed="changeLoadingState"
                  v-else-if="isTicketsTabChosen"
                  :events="tickets">
                </tickets-edit-form>
              </div>
          </div>
        </div>
        </b-overlay>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import sidebar from '../components/sidebar'
import TheaterEditForm from '../components/theater-edit-form.vue'
import SpectaclesEditFrom from '../components/spectacles-edit-form.vue'
import EventsEditForm from '../components/events-edit-form.vue'
import TicketsEditForm from '../components/tickets-edit-form.vue'

export default {
  name: 'Home',

  components: {
    sidebar,
    TheaterEditForm,
    SpectaclesEditFrom,
    EventsEditForm,
    TicketsEditForm
  },

  data () {
    return {
      loadingState: false,
      theater: null,
      spectacles: null,
      events: null,
      tickets: null,
      isTheaterTabChosen: false,
      isSpectaclesTabChosen: false,
      isTicketsTabChosen: false,
      isEventsTabChosen: false
    }
  },

  computed: {
    ...mapState(['theaterId'])
  },

  methods: {
    ...mapActions(['deauthorizeUser', 'getTheater', 'getTheaterSpectacles']),
    refreshData (tabName) {
      if (tabName === 'theater') this.loadTheater()
      else if (tabName === 'spectacles') this.loadSpectacles()
      else if (tabName === 'events') this.loadEvents()
      else if (tabName === 'tickets') this.loadTickets()
    },
    changeLoadingState (state) {
      this.loadingState = state
    },
    confirmLogout () {
      this.$bvModal.msgBoxConfirm('Хотите выйти?', {
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Да',
        cancelTitle: 'Нет',
        centered: true
      })
        .then(confirmed => {
          if (confirmed) this.logout()
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout () {
      this.deauthorizeUser()
        .then((response) => {
          this.$router.push('/login')
        })
    },
    async loadTheater () {
      this.loadingState = true
      let theater = null
      await this.getTheater(this.theaterId)
        .then((_theater) => {
          theater = _theater
        })
        .catch((err) => {
          console.log(err)
        })
      this.theater = theater
      this.isTheaterTabChosen = true
      this.isSpectaclesTabChosen = false
      this.isTicketsTabChosen = false
      this.loadingState = false
    },
    async loadSpectacles () {
      this.loadingState = true
      let spectacles = null
      await this.getTheaterSpectacles(this.theaterId)
        .then((_spectacles) => {
          spectacles = _spectacles
        })
        .catch((err) => {
          console.log(err)
        })
      this.spectacles = spectacles
      this.isTheaterTabChosen = false
      this.isSpectaclesTabChosen = true
      this.isTicketsTabChosen = false
      this.loadingState = false
    },
    loadEvents () {
      this.loadingState = true
      this.events = null
      this.isTheaterTabChosen = false
      this.isSpectaclesTabChosen = false
      this.isEventsTabChosen = true
      this.loadingState = false
    },
    loadTickets () {
      this.loadingState = true
      this.tickets = null
      this.isTheaterTabChosen = false
      this.isSpectaclesTabChosen = false
      this.isEventsTabChosen = false
      this.isTicketsTabChosen = true
      this.loadingState = false
    }
  },

  watch: {
    theaterId (val) {
      if (val !== null) {
        this.loadTheater()
      }
    }
  },

  created () {
    if (this.theaterId !== null) {
      this.loadTheater()
    }
  }
}
</script>

<style scoped lang="scss">
  .home {
    height: calc(100vh - 54px);

    .content {
      display: flex;
      height: 100%;

      .sidebar {
        width: 15%;
        height: 100%;
        background-color: #282828;
      }

      .sidebar-inner {
        margin-top: 50px;
      }

      .content-wrapper {
        width: 100%;

        .theater {
          max-height: calc(100vh - 54px);
          overflow-y: scroll;
          padding: 20px 10px;
        }
      }
    }

    .appendix {
      color: #E5D691;
    }
  }
</style>
