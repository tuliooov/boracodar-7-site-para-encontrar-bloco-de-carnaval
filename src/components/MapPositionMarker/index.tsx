import { Marker, useMapEvents } from 'react-leaflet'
import Leaflet from 'leaflet';


interface PositionInterface {
    lat: number,
    lng: number
}
interface MapPositionMarkerProps {
    onChange: (params: PositionInterface) => void,
    position: PositionInterface
}

const mapIcon = Leaflet.icon({
    iconUrl: '/party.png',
    iconSize: [50, 50],
})

export default function MapPositionMarker({ onChange, position }: MapPositionMarkerProps) {

    useMapEvents({
        click(event: any) {
            onChange(event.latlng)
        }
    })

    return (
        <Marker
            icon={mapIcon}
            position={[position.lat, position.lng]}
        ></Marker>
    )
}