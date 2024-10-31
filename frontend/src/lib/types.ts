export type TProfile = {
  id: number
  name: string
  gender: string
  year: string
  month: string
  day: string
  place: string
  longitude: string
  lattitude: string
  timezone: string
  hour: string
  min: string
  sec: string
}

export enum ApiStatus {
  OK = `ok`,
  ERROR = `error`,
  FORM_ERRORS = `form_errors`,
  REDIRECT = `redirect`,
}

export type ApiSuccess<T extends Record<string, unknown> | unknown = unknown> = T & {
  status: ApiStatus.OK
  message: string
}

export type ApiError<T extends Record<string, unknown> = { error: string }> = T & {
  status: ApiStatus.ERROR
}

export type ApiFormErrors<T extends Record<string, unknown> = { errors: Record<string, string> }> =
  T & {
    status: ApiStatus.FORM_ERRORS
  }

export type ApiRedirect<T extends Record<string, unknown> = { url: string }> = T & {
  status: ApiStatus.REDIRECT
}

export type ApiResponse<
  T extends Record<string, unknown> | unknown = unknown,
  K extends Record<string, unknown> = { error: string },
  R extends Record<string, unknown> = { errors: Record<string, string> },
> = ApiSuccess<T> | ApiError<K> | ApiFormErrors<R>

export type FetchProfiles = ApiSuccess<{
  profiles: TProfile[]
}>

export type CreateEditProfile =
  | ApiSuccess<{
      profile: TProfile
    }>
  | ApiError

export type DeleteProfile = ApiSuccess | ApiError

export type FetchAstrologyProfile =
  | ApiSuccess<{ profile: TProfile; astrodata: TAstrologyRawData }>
  | ApiError

export type TPlanet =
  | 'Sun'
  | 'Moon'
  | 'Mars'
  | 'Mercury'
  | 'Jupiter'
  | 'Venus'
  | 'Saturn'
  | 'Rahu'
  | 'Ketu'

export type THouse = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export type TSign =
  | 'Pisces'
  | 'Aries'
  | 'Taurus'
  | 'Gemini'
  | 'Aquarius'
  | 'Cancer'
  | 'Capricorn'
  | 'Leo'
  | 'Sagittarius'
  | 'Scorpio'
  | 'Libra'
  | 'Virgo'

export type TPlanetData = {
  name: TPlanet
  symbol: string
  retro: boolean
  pos: {
    deg: number
    min: number
    sec: number
    dec_deg: number
  }
  nakshatra: string
  pada: number
  'nak-ruler': string
  'nak-diety': string
  sign: TSign
  rashi: string
  dispositor: string
  tattva: string
  'sign-tatva': string
  'house-rel': string
  'house-nature': string
  'planet-nature': string
  gender: string
  category: string
  'house-num': THouse
  friends: TPlanet[]
  enemies: TPlanet[]
  nuetral: TPlanet[]
  varna: string
  guna: string
  Aspects: {
    planets: TPlanet[]
    houses: THouse[]
    signs: string[]
  }
  'Aspected-by': TPlanet[]
  conjuncts: TPlanet[]
  status: number
}

export type THouseData = {
  planets: TPlanet[]
  'house-num': THouse
  'sign-num': THouse
  sign: TSign
  'sign-lord': TPlanet
  rashi: string
  'aspect-planets': TPlanet[]
}

export type TDivisionalChartData = {
  name: string
  symbol: string
  ascendant: {
    name: string
    symbol: string
    pos: {
      deg: number
      min: number
      sec: number
      dec_deg: number
    }
    nakshatra: string
    pada: number
    'nak-ruler': TPlanet
    'nak-diety': string
    sign: TSign
    rashi: string
    'lagna-lord': TPlanet
    'sign-tatva': string
    'lagnesh-sign': TSign
    'lagnesh-rashi': string
    'lagnesh-disp': TPlanet
    status: number
  }
  planets: {
    Sun: TPlanetData
    Moon: TPlanetData
    Mars: TPlanetData
    Mercury: TPlanetData
    Jupiter: TPlanetData
    Venus: TPlanetData
    Saturn: TPlanetData
    Rahu: TPlanetData
    Ketu: TPlanetData
  }
  houses: THouseData[]
  classifications: {
    benefics: TPlanet[]
    malefics: TPlanet[]
    neutral: TPlanet[]
    kendra: TPlanet[]
    trikona: TPlanet[]
    trik: TPlanet[]
    upachaya: TPlanet[]
    dharma: TPlanet[]
    artha: TPlanet[]
    kama: TPlanet[]
    moksha: TPlanet[]
    'natural-benefics': TPlanet[]
    'natural-malefics': TPlanet[]
  }
  vargottamas?: TPlanet[]
}

export type TBalasData = {
  Vimshopaka: {
    shadvarga: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
      Rahu: number
      Ketu: number
    }
    saptavarga: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
      Rahu: number
      Ketu: number
    }
    dashavarga: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
      Rahu: number
      Ketu: number
    }
    shodashavarga: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
      Rahu: number
      Ketu: number
    }
  }
  Shadbala: {
    Total: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
    Rupas: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
    Sthanabala: {
      Total: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Uchhabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Saptavargajabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Ojhayugmarashiamshabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Kendradhibala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Drekshanabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
    }
    Digbala: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
    Kaalabala: {
      Total: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Natonnatabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Pakshabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Tribhagabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      'Varsha-maasa-dina-horabala': {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Yuddhabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
      Ayanabala: {
        Sun: number
        Moon: number
        Mars: number
        Mercury: number
        Jupiter: number
        Venus: number
        Saturn: number
      }
    }
    Cheshtabala: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
    Naisargikabala: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
    Drikbala: {
      Sun: number
      Moon: number
      Mars: number
      Mercury: number
      Jupiter: number
      Venus: number
      Saturn: number
    }
  }
  Ishtabala: {
    Sun: number
    Moon: number
    Mars: number
    Mercury: number
    Jupiter: number
    Venus: number
    Saturn: number
  }
  Kashtabala: {
    Sun: number
    Moon: number
    Mars: number
    Mercury: number
    Jupiter: number
    Venus: number
    Saturn: number
  }
  BhavaBala: {
    BhavaAdhipathibala: number[]
    BhavaDigbala: number[]
    BhavaDrishtibala: number[]
    Total: number[]
  }
}

export type TAstrologyRawData = {
  D1: TDivisionalChartData
  D9: TDivisionalChartData
  D10: TDivisionalChartData
  D2: TDivisionalChartData
  D3: TDivisionalChartData
  D4: TDivisionalChartData
  D7: TDivisionalChartData
  D12: TDivisionalChartData
  D16: TDivisionalChartData
  D20: TDivisionalChartData
  D24: TDivisionalChartData
  D27: TDivisionalChartData
  D30: TDivisionalChartData
  D40: TDivisionalChartData
  D45: TDivisionalChartData
  D60: TDivisionalChartData
  Balas: TBalasData
  AshtakaVarga: {
    Sun: number[]
    Moon: number[]
    Mars: number[]
    Mercury: number[]
    Jupiter: number[]
    Venus: number[]
    Saturn: number[]
    Total: number[]
  }
  Dashas: {
    Vimshottari: {
      mahadashas: {
        [key: string]: {
          lord: string
          dashaNum: number
          startDate: string
          endDate: string
          duration: string
          startage: string
          endage: string
        }
      }
      antardashas: {
        [key: string]: {
          lord: string
          dashaLord: TPlanet
          bhuktiNum: number
          startDate: string
          endDate: string
          duration: string
          startage: string
          endage: string
        }
      }
      paryantardashas: {
        [key: string]: {
          lord: string
          bhuktiLord: TPlanet
          dashaLord: TPlanet
          pariNum: number
          startDate: string
          endDate: string
          duration: string
          startage: string
          endage: string
        }
      }
      current: {
        date: string
        dasha: string
        bhukti: string
        paryantardasha: string
      }
    }
  }
  user_details: {
    name: string
    birthdetails: {
      DOB: {
        year: number
        month: number
        day: number
      }
      TOB: {
        hour: number
        min: number
        sec: number
      }
      POB: {
        name: string
        lat: number
        lon: number
        timezone: number
      }
      name: string
      Gender: string
    }
    maasa: string
    vaara: string
    tithi: string
    karana: string
    nakshatra: string
    yoga: string
    rashi: string
  }
}
