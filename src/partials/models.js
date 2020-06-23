export class User {
  constructor ({
    id,
    email,
    name,
    surname
  }) {
    this.id = id
    this.email = email
    this.name = name
    this.surname = surname
  }

  static produceUser (rawData) {
    if (rawData.id === undefined || rawData.id === null) {
      throw new Error('Bad user data: no data')
    }
    if (rawData.email === undefined || rawData.email === null) {
      throw new Error('Bad user data: no email')
    }
    if (rawData.name === undefined || rawData.name === null) {
      throw new Error('Bad user data: no name')
    }
    if (rawData.surname === undefined || rawData.surname === null) {
      throw new Error('Bad user data: no surname')
    }
    return new this(rawData)
  }
}

export class Theater {
  constructor ({
    id,
    name,
    description,
    address,
    logo,
    photo,
    cashDeskPhoneNumber,
    phoneNumberForReference,
    contacts
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.address = address
    this.logo = logo
    this.photo = photo
    this.cashDeskPhoneNumber = cashDeskPhoneNumber
    this.phoneNumberForReference = phoneNumberForReference
    this.contacts = contacts
  }

  static produceTheater (rawData) {
    if (rawData.id === undefined || rawData.id === null) {
      throw new Error('Bad theater data: no data')
    }
    if (rawData.name === undefined || rawData.name === null) {
      throw new Error('Bad theater data: no name')
    }
    if (rawData.description === undefined || rawData.description === null) {
      throw new Error('Bad theater data: no description')
    }
    if (rawData.address === undefined || rawData.address === null) {
      throw new Error('Bad theater data: no address')
    }
    if (rawData.photo === undefined || rawData.photo === null) {
      throw new Error('Bad theater data: no photo')
    }
    if (rawData.phone_number_for_reference === undefined || rawData.phone_number_for_reference === null) {
      throw new Error('Bad theater data: no phoneNumberForReference')
    }
    if (rawData.cash_desk_phone_number === undefined || rawData.cash_desk_phone_number === null) {
      throw new Error('Bad theater data: no phoneNumberForReference')
    }
    return new this({
      id: rawData.id,
      name: rawData.name,
      description: rawData.description,
      address: rawData.address,
      logo: rawData.logo,
      photo: rawData.photo,
      cashDeskPhoneNumber: rawData.cash_desk_phone_number,
      phoneNumberForReference: rawData.phone_number_for_reference,
      contacts: rawData.contacts
    })
  }
}

export class PlatformTheaters {
  constructor (rowTheaters) {
    this.list = []
    try {
      for (const rowTheater of rowTheaters) {
        this.list.push(Theater.produceTheater(rowTheater))
      }
    } catch (err) {
      console.warn(err)
    }
  }

  static producePlatformTheaters (rawData) {
    return new this(rawData)
  }
}

export class Spectacle {
  constructor ({
    id,
    name,
    description,
    poster,
    duration,
    genre,
    // eslint-disable-next-line camelcase
    slider_poster,
    trailer,
    year
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.poster = poster
    this.duration = duration
    this.genre = genre
    // eslint-disable-next-line camelcase
    this.firstExtraPhoto = slider_poster
    this.secondExtraPhoto = trailer
    this.year = year
  }

  static produceSpectacle (rawData) {
    if (rawData.id === undefined || rawData.id === null) {
      throw new Error('Bad spectacle data: no data')
    }
    if (rawData.name === undefined || rawData.name === null) {
      throw new Error('Bad spectacle data: no name')
    }
    if (rawData.description === undefined || rawData.description === null) {
      throw new Error('Bad spectacle data: no description')
    }
    if (rawData.poster === undefined || rawData.poster === null) {
      throw new Error('Bad spectacle data: no poster')
    }
    return new this(rawData)
  }

  updateSelf ({
    name,
    description,
    poster,
    duration,
    genre,
    firstExtraPhoto,
    secondExtraPhoto,
    year
  }) {
    this.name = name
    this.description = description
    this.poster = poster
    this.duration = duration
    this.genre = genre
    this.firstExtraPhoto = firstExtraPhoto
    this.secondExtraPhoto = secondExtraPhoto
    this.year = year
  }
}

export class TheaterSpectacles {
  constructor (rowSpectacles) {
    this.list = []

    for (const rowSpectacle of rowSpectacles) {
      try {
        this.list.push(Spectacle.produceSpectacle(rowSpectacle))
      } catch (err) {
        console.warn(err)
      }
    }
  }

  findSpectacleById (spectacleId) {
    const index = this.list.findIndex((spectacle) => spectacle.id === spectacleId)
    return this.list[index]
  }

  updateSpectacleById ({ spectacleId, data }) {
    const index = this.list.findIndex((spectacle) => spectacle.id === spectacleId)
    this.list[index].updateSelf(data)
  }

  addSpectacle (rawData) {
    rawData.slider_poster = rawData.firstExtraPhoto
    rawData.trailer = rawData.secondExtraPhoto
    this.list.push(Spectacle.produceSpectacle(rawData))
  }

  deleteSpectacle (spectacleId) {
    const index = this.list.findIndex((spectacle) => spectacle.id === spectacleId)
    this.list.splice(index, 1)
  }

  static produceTheaterSpectacles (rawData) {
    return new this(rawData)
  }
}
