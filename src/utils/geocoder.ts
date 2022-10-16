import NodeGeocoder from 'node-geocoder'
import config from '../config'

const options: NodeGeocoder.Options = {
  provider: 'mapquest',
  apiKey: config.GEOCODER_API_KEY,
  httpAdapter: 'https',
  formatter: null,
}

const geocoder = NodeGeocoder(options)

export default geocoder
