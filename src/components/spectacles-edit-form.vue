<template>
    <div class="content-wrapper">
      <div class="add-btn-wrapper">
        <b-button variant="info" v-b-modal.editing-modal>
          <b-icon icon="plus" class="add-btn-icon" variant="light"></b-icon>
          Добавить спектакль
        </b-button>
      </div>
      <b-table bordered :items="spectaclesList" :fields="fields">
        <template v-slot:cell(spectacle)="data">
          {{ data.item.name }}
        </template>
        <template v-slot:cell(poster)="data">
          <b-container fluid class="p-4 bg-dark">
            <b-row>
              <b-col>
                <b-img thumbnail :src="data.item.poster" fluid width="180" rounded alt="Постер"/>
              </b-col>
              <b-col>
                <b-img thumbnail :src="data.item.firstExtraPhoto" fluid width="180" rounded alt="Фото 1"/>
              </b-col>
              <b-col>
                <b-img thumbnail :src="data.item.secondExtraPhoto" fluid width="180" rounded alt="Фото 2"/>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <template v-slot:cell(genre)="data">
          {{ data.item.genre }}
        </template>
        <template v-slot:cell(duration)="data">
          {{ data.item.duration }}
        </template>
        <template v-slot:cell(year)="data">
          {{ data.item.year }}
        </template>
        <template v-slot:cell(action)="data">
          <div class="row action-btns">
            <div
              class="edit-btn"
              v-b-tooltip.hover title="Редактировать"
              v-b-modal.editing-modal
              v-on:click="changeModalData(data.item.id)"
            >
              <b-icon icon="pencil" class="mb-2 h3"></b-icon>
            </div>
            <div class="delete-btn" v-b-tooltip.hover title="Удалить">
              <b-icon icon="x-circle" class="mb-2 h3" variant="danger"></b-icon>
            </div>
          </div>
        </template>
      </b-table>

      <b-modal
        id="editing-modal"
        size="xl"
        scrollable
        :title="dialogTitle"
        cancel-title="Отмена"
        :ok-title="dialogSubmitBtnTitle"
        ok-variant="success"
        @ok="handleOk"
      >
        <b-form ref="form"  v-if="show" @submit.stop.prevent="handleSubmit">
          <b-form-group id="name-input-group" label="Название спектакля:" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              required
              placeholder="Введите название спектакля"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="desc-input-group" label="Описание спектакля:" label-for="description">
            <b-form-textarea
              id="description"
              v-model="form.description"
              placeholder="Введите описание спектакля"
              rows="9"
              max-rows="9"
              no-resize
            ></b-form-textarea>
          </b-form-group>

          <b-form-group id="duration-input-group" label="Длительность (в минутах):" label-for="duration">
            <b-form-input
              type="number"
              id="duration"
              v-model="form.duration"
              required
              placeholder="Введите длительность"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="year-input-group" label="Год постановки:" label-for="year">
            <b-form-input
              id="year"
              v-model="form.year"
              required
              placeholder="Введите год постановки"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="genre-input-group" label="Жанр постановки:" label-for="genre">
            <b-form-select
              id="genre"
              v-model="form.genre"
              required
              :options="options"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            id="poster-input-group"
            label="Постер (будет отображаться в результатах поиска и в афише вашего театра):"
            label-for="poster">
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              id="poster"
              placeholder="Выберите фото..."
              @change="readURL"
              no-drop
            ></b-form-file>
          </b-form-group>

          <div class="row">
            <div class="col-12 poster-wrapper">
              <b-img id="poster-img" :src="form.poster" fluid width="400" rounded alt="Постер"/>
            </div>
          </div>

          <b-form-group
            id="extras-input-group"
            label="2 дополнительные фотографии (будут отображаться в слайдере на странице спектакля):"
            label-for="extras">
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              id="extras"
              placeholder="Выберите фото..."
              @change="readExtrasURL"
              no-drop
              multiple
            ></b-form-file>
          </b-form-group>

          <b-container fluid class="p-4 bg-dark">
            <b-row>
              <b-col>
                <b-img
                  id="img-1"
                  thumbnail
                  fluid
                  :src="form.firstExtraPhoto ? form.firstExtraPhoto : '#'"
                  alt="Фото 1">
                </b-img>
              </b-col>
              <b-col>
                <b-img
                  id="img-2"
                  thumbnail
                  fluid
                  :src="form.secondExtraPhoto ? form.secondExtraPhoto : '#'"
                  alt="Фото 2">
                </b-img>
              </b-col>
            </b-row>
          </b-container>
        </b-form>
      </b-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import { TheaterSpectacles } from '../partials/models'

export default {
  name: 'spectacles-edit-form',

  props: {
    spectacles: {
      type: TheaterSpectacles,
      required: true
    }
  },

  data: function () {
    return {
      spectaclesList: this.spectacles.list,
      fields: [
        { key: 'spectacle', label: 'Спектакль' },
        { key: 'poster', label: 'Фото' },
        { key: 'genre', label: 'Жанр' },
        { key: 'duration', label: 'Длительность (мин.)' },
        { key: 'year', label: 'Год' },
        { key: 'action', label: 'Действие' }
      ],
      show: true,
      form: {
        name: null,
        description: null,
        duration: null,
        year: null,
        genre: null,
        poster: null,
        firstExtraPhoto: null,
        secondExtraPhoto: null
      },
      options: [
        { value: '', text: 'Жанр не указан. Выберите жанр постановки' },
        { value: 'драма', text: 'драма' },
        { value: 'мелодрама', text: 'мелодрама' },
        { value: 'трагедия', text: 'трагедия' },
        { value: 'комедия', text: 'комедия' },
        { value: 'мюзикл', text: 'мюзикл' }
      ],
      isPosterChanged: false,
      isFirstExtraPhotoChanged: false,
      isSecondExtraPhotoChanged: false,
      selectedSpectacleId: null
    }
  },

  computed: {
    dialogTitle () {
      if (this.selectedSpectacleId === null) {
        return 'Добавление нового спектакля'
      } else return 'Редактирование информации о спектакле'
    },
    dialogSubmitBtnTitle () {
      if (this.selectedSpectacleId === null) {
        return 'Добавить спекталь'
      } else return 'Сохранить изменения'
    }
  },

  methods: {
    ...mapActions([
      'uploadSpectaclePoster',
      'uploadSpectacleFirstExtraPhoto',
      'uploadSpectacleSecondExtraPhoto',
      'updateSpectacle',
      'createSpectacle'
    ]),
    readURL (e) {
      const input = e.target
      if (input.files && input.files[0]) {
        const reader = new FileReader()
        reader.onload = function (e) {
          document.getElementById('poster-img').setAttribute('src', e.target.result)
        }
        reader.readAsDataURL(input.files[0])
        this.form.poster = input.files[0]
        this.isPosterChanged = true
      }
    },
    readExtrasURL (e) {
      const input = e.target
      if (input.files && input.files[0]) {
        if (input.files.length === 1) {
          const reader = new FileReader()
          reader.onload = function (e) {
            document.getElementById('img-1').setAttribute('src', e.target.result)
          }
          reader.readAsDataURL(input.files[0])
          this.form.firstExtraPhoto = input.files[0]
          this.isFirstExtraPhotoChanged = true
        }
        if (input.files.length === 2) {
          const firstReader = new FileReader()
          const secondReader = new FileReader()
          firstReader.onload = function (e) {
            document.getElementById('img-1').setAttribute('src', e.target.result)
          }
          secondReader.onload = function (e) {
            document.getElementById('img-2').setAttribute('src', e.target.result)
          }
          firstReader.readAsDataURL(input.files[0])
          this.form.firstExtraPhoto = input.files[0]
          this.isFirstExtraPhotoChanged = true

          secondReader.readAsDataURL(input.files[1])
          this.form.secondExtraPhoto = input.files[1]
          this.isSecondExtraPhotoChanged = true
        }
      }
    },
    changeModalData (spectacleId) {
      const spectacle = this.spectacles.findSpectacleById(spectacleId)
      this.form = { ...spectacle }
      this.selectedSpectacleId = spectacle.id
    },
    async uploadPoster () {
      const formData = new FormData()
      let url = null
      formData.append('spectacle_poster', this.form.poster)
      await this.uploadSpectaclePoster(formData)
        .then((response) => {
          url = response.url
        })
        .catch((err) => {
          console.log(err)
        })
      return url
    },
    async uploadFirstExtraPhoto () {
      const formData = new FormData()
      let url = null
      formData.append('spectacle_preview', this.form.firstExtraPhoto)
      await this.uploadSpectacleFirstExtraPhoto(formData)
        .then((response) => {
          url = response.url
        })
        .catch((err) => {
          console.log(err)
        })
      return url
    },
    async uploadSecondExtraPhoto () {
      const formData = new FormData()
      let url = null
      formData.append('spectacle_sliderposter', this.form.secondExtraPhoto)
      await this.uploadSpectacleSecondExtraPhoto(formData)
        .then((response) => {
          url = response.url
        })
        .catch((err) => {
          console.log(err)
        })
      return url
    },
    async updateSpectacleData ({ posterUrl, firstExtraPhotoUrl, secondExtraPhotoUrl }) {
      const data = this.form
      data.poster = posterUrl
      data.firstExtraPhoto = firstExtraPhotoUrl
      data.secondExtraPhoto = secondExtraPhotoUrl
      const spectacleId = this.selectedSpectacleId
      await this.updateSpectacle({
        spectacleId: spectacleId,
        rawData: {
          name: data.name,
          description: data.description,
          duration: data.duration,
          genre: data.genre,
          year: data.year,
          poster: data.poster,
          trailer: data.firstExtraPhoto,
          slider_poster: data.secondExtraPhoto
        }
      })
        .then((response) => {
          this.spectacles.updateSpectacleById({ spectacleId, data })
          this.selectedSpectacleId = null
          this.$bvToast.toast('Данные о спектакле успешно обновлены', {
            title: 'Уведомление',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleOk (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        return
      }
      this.onSubmit()
      this.$nextTick(() => {
        this.$bvModal.hide('editing-modal')
      })
    },
    checkFormValidity () {
      return this.$refs.form.checkValidity()
    },
    async onSubmit () {
      this.$emit('loading-state-changed', true)
      if (this.selectedSpectacleId === null) {
        this.createNewSpectacle()
        return
      }
      let posterUrl = null
      let firstExtraPhotoUrl = null
      let secondExtraPhotoUrl = null

      if (this.isPosterChanged) {
        await this.uploadPoster().then((responseUrl) => {
          posterUrl = responseUrl
        })
      } else {
        posterUrl = this.form.poster
      }

      if (this.isFirstExtraPhotoChanged) {
        await this.uploadFirstExtraPhoto().then((responseUrl) => {
          firstExtraPhotoUrl = responseUrl
        })
      } else {
        firstExtraPhotoUrl = this.form.firstExtraPhoto
      }

      if (this.isSecondExtraPhotoChanged) {
        await this.uploadSecondExtraPhoto().then((responseUrl) => {
          secondExtraPhotoUrl = responseUrl
        })
      } else {
        secondExtraPhotoUrl = this.form.secondExtraPhoto
      }
      await this.updateSpectacleData({ posterUrl, firstExtraPhotoUrl, secondExtraPhotoUrl })
      this.$emit('loading-state-changed', false)
      this.isPosterChanged = false
      this.isFirstExtraPhotoChanged = false
      this.isSecondExtraPhotoChanged = false
    },
    async createNewSpectacle () {
      let posterUrl = null
      let firstExtraPhotoUrl = null
      let secondExtraPhotoUrl = null

      if (this.isPosterChanged) {
        await this.uploadPoster().then((responseUrl) => {
          posterUrl = responseUrl
        })
      }

      if (this.isFirstExtraPhotoChanged) {
        await this.uploadFirstExtraPhoto().then((responseUrl) => {
          firstExtraPhotoUrl = responseUrl
        })
      }

      if (this.isSecondExtraPhotoChanged) {
        await this.uploadSecondExtraPhoto().then((responseUrl) => {
          secondExtraPhotoUrl = responseUrl
        })
      }
      if (posterUrl === null || firstExtraPhotoUrl === null || secondExtraPhotoUrl === null) return
      await this.addSpectacle({ posterUrl, firstExtraPhotoUrl, secondExtraPhotoUrl })
      this.$emit('loading-state-changed', false)
      this.isPosterChanged = false
      this.isFirstExtraPhotoChanged = false
      this.isSecondExtraPhotoChanged = false
    },
    async addSpectacle ({ posterUrl, firstExtraPhotoUrl, secondExtraPhotoUrl }) {
      const data = this.form
      data.poster = posterUrl
      data.firstExtraPhoto = firstExtraPhotoUrl
      data.secondExtraPhoto = secondExtraPhotoUrl

      console.log(data.genre)

      await this.createSpectacle({
        name: data.name,
        description: data.description,
        duration: data.duration,
        genre: data.genre,
        year: data.year,
        poster: data.poster,
        trailer: data.firstExtraPhoto,
        slider_poster: data.secondExtraPhoto,
        theater_id: this.$store.state.theaterId
      })
        .then((response) => {
          this.spectacles.addSpectacle(data)
          this.$bvToast.toast('Спектакль успешно добавлен', {
            title: 'Уведомление',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch((err) => {
          console.log(err)
          this.$bvToast.toast('На сервере возникла ошибка. Информация о спектале не сохранена', {
            title: 'Ошибка',
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: true
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-wrapper {
    width: 100%;
    margin: auto;

    .action-btns {
      display: flex;
      height: 150px;
      justify-content: space-around;
      align-items: center;

      .edit-btn, .delete-btn {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .poster-wrapper {
    padding-bottom: 20px !important;
  }

  .add-btn-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
  }
</style>
