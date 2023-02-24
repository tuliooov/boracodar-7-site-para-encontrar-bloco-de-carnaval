import Link from 'next/link'
import dynamic from 'next/dynamic'

import prismaClient from '@/lib/prisma'

import styles from './blockPageStyles.module.scss'

interface BlockPageParams {
    params: {
        id: string
    }
}

export default async function Block({params}:BlockPageParams) {

    const Map = dynamic(() => import('@/components/Map'), { ssr: false })
    const BlockMarker = dynamic(() => import('@/components/BlockMarker'), { ssr: false })

    const block = await prismaClient.carnivalBlock.findFirst({
        where: {
            id: params.id
        }
    })

    if(!block){
        return <h1>Bloco não encontrado</h1>
    }

    return (
        <div id={styles.container}> 
            {/* <img src={`/uploads/${block.imageName}`} alt={`Banner do bloco ${block.name}`}/> */}
            <h1>{block.name}</h1>
            <p>{block.description}</p>
            <div id={styles.mapContainer}>
                <Map
                    center={{lat: Number(block.positionLat), lng: Number(block.positionLng)}}
                >
                    <BlockMarker
                        position={{lat: Number(block.positionLat), lng: Number(block.positionLng)}}
                    />
                </Map>
            </div>
            <Link 
                target="_blank" 
                rel="noopener noreferrer" 
                href={`https://www.google.com/maps/dir/?api=1&destination=${block.positionLat},${block.positionLng}`}
                id={styles.seeRoutesButton}
            >Ver rotas no Google Maps</Link>
            
        </div>
    )
}