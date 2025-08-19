import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

export default async function EventMap({
  latitude,
  longitude,
  location,
}: {
  latitude: string
  longitude: string
  location: string
}) {
  // Verifica que las coordenadas sean números
  const lat = parseFloat(latitude)
  const lng = parseFloat(longitude)

  const customIcon = new Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
    className:
      'filter invert-[23%] sepia-[69%] saturate-[736%] hue-rotate-[229deg] brightness-[92%] contrast-[97%]',
  })

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: '300px', width: '100%', borderRadius: '8px' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  )
}
