import NodeGeocoder from 'node-geocoder'
import { envLoader } from '@/utils/env-loader'

const GEOCODER_PROVIDER = envLoader('GEOCODER_PROVIDER')
const GEOCODER_API_KEY = envLoader('GEOCODER_API_KEY')

export const geocoder = NodeGeocoder({
  provider: GEOCODER_PROVIDER as any,
  apiKey: GEOCODER_API_KEY,
})
