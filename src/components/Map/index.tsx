"use client"

import { ReactNode } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

interface MapProps {
    children?: ReactNode,
    center: {
        lat: number,
        lng: number
    }
}

import 'leaflet/dist/leaflet.css';
import styles from './MapStyles.module.scss'

export default function Map({ children, center }: MapProps) {
    
    return (

        <MapContainer
            center={[center.lat, center.lng]}
            zoom={9}
            id={styles.container}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {children}
        </MapContainer>
    )
}