export type ProvinceType = {
  name: string
  code: number
  codename: string
  division_type: string
  phone_code: number
  districts: DistrictType[]
}

export type DistrictType = {
  name: string
  code: number
  codename: string
  division_type: string
  short_codename: string
  wards: WardType[]
}

export type WardType = {
  name: string
  code: number
  codename: string
  division_type: string
  short_codename: string
}
