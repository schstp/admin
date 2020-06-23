<template>
    <div class="content-wrapper">
      <div>
        <b-form @submit.prevent="onSubmit" v-if="show">
          <b-form-group id="name-input-group" label="Название театра:" label-for="name">
            <b-form-input
              id="name"
              v-model="form.name"
              required
              placeholder="Введите название театра"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="desc-input-group" label="Описание театра:" label-for="description">
            <b-form-textarea
              id="description"
              v-model="form.description"
              placeholder="Введите описание театра"
              rows="9"
              max-rows="9"
              no-resize
            ></b-form-textarea>
          </b-form-group>

          <b-form-group id="address-input-group" label="Ваш адрес:" label-for="address">
            <b-form-input
              id="address"
              v-model="form.address"
              required
              placeholder="Введите адрес театра"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="cd-phone-input-group" label="Номер телефона кассы:" label-for="cd-phone">
            <b-form-input
              id="cd-phone"
              v-model="form.cashDeskPhoneNumber"
              required
              placeholder="Введите номер телефона кассы"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="r-phone-input-group" label="Номер телефона справки:" label-for="r-phone">
            <b-form-input
              id="r-phone"
              v-model="form.phoneNumberForReference"
              required
              placeholder="Введите номер телефона справки"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="photo-input-group" label="Фотография для размещения на сайте:" label-for="photo">
            <b-form-file
              accept="image/jpeg, image/png, image/gif"
              id="photo"
              placeholder="Выберите фото..."
              @change="readURL"
              no-drop
            ></b-form-file>
          </b-form-group>

          <div class="row">
            <div class="col-12">
              <b-img id="img" :src="form.photo" fluid width="600" rounded alt="Responsive image"/>
            </div>
          </div>

          <div class="row justify-content-end">
            <div class="submit-btn">
              <b-button type="submit" variant="success">Сохранить изменения</b-button>
            </div>
          </div>

        </b-form>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { Theater } from '../partials/models'

export default {
  name: 'theater-edit-form',

  props: {
    theater: {
      type: Theater,
      required: true
    }
  },

  data () {
    return {
      form: {
        name: this.theater.name,
        description: this.theater.description,
        address: this.theater.address,
        cashDeskPhoneNumber: this.theater.cashDeskPhoneNumber,
        phoneNumberForReference: this.theater.phoneNumberForReference,
        photo: this.theater.photo,
        contacts: this.theater.contacts
      },
      isPhotoChanged: false,
      show: true
    }
  },

  computed: {
    ...mapState(['theaterId'])
  },

  methods: {
    ...mapActions(['uploadTheaterPhoto', 'updateTheater']),
    readURL (e) {
      const input = e.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = function (e) {
          document.getElementById('img').setAttribute('src', e.target.result)
        }
        reader.readAsDataURL(input.files[0])
        this.form.photo = input.files[0]
        this.isPhotoChanged = true
      }
    },
    async onSubmit () {
      this.$emit('loading-state-changed', true)
      let url = null
      if (this.isPhotoChanged) {
        await this.uploadPhoto().then((responseUrl) => {
          url = responseUrl
        })
        this.updateTheaterData(url)
      } else {
        url = this.form.url
        await this.updateTheaterData(url)
      }
      this.$emit('loading-state-changed', false)
      this.isPhotoChanged = false
    },
    async uploadPhoto () {
      const formData = new FormData()
      let url = null
      formData.append('theater_photo', this.form.photo)
      await this.uploadTheaterPhoto(formData)
        .then((response) => {
          url = response.url
        })
        .catch((err) => {
          console.log(err)
        })
      return url
    },
    async updateTheaterData (photoUrl) {
      await this.updateTheater({
        theaterId: this.theaterId,
        rawData: {
          name: this.form.name,
          description: this.form.description,
          address: this.form.address,
          cashDeskPhoneNumber: this.form.cashDeskPhoneNumber,
          phoneNumberForReference: this.form.phoneNumberForReference,
          photo: photoUrl,
          contacts: this.form.contacts
        }
      })
        .then((response) => {
          this.$bvToast.toast('Данные о театре успешно обновлены', {
            title: 'Уведомление',
            variant: 'success',
            autoHideDelay: 5000,
            appendToast: true
          })
        })
        .catch((err) => {
          console.log(err)
          this.$bvToast.toast('На сервере возникла ошибка. Изменения не сохранены', {
            title: 'Ошибка',
            autoHideDelay: 5000,
            variant: 'danger',
            appendToast: true
          })
        })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .content-wrapper {
    width: 85% !important;
    margin: auto;
  }

  .submit-btn {
    display: flex !important;
    justify-content: end !important;
  }
</style>
