import axios from 'axios'
import { ProvinceType } from '../types/provinces.type'

export async function getProvincesApi() {
  const url = `https://provinces.open-api.vn/api/?depth=3`
  const response = (await axios.get<ProvinceType[]>(url)).data
  return response
}
