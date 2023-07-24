import NodeGeocoder from 'node-geocoder'
import config from '$/config'

const geocoder = NodeGeocoder({
  provider: config.geocodeProvider as any,
  apiKey: config.geocodeApiKey,
})

export default geocoder
