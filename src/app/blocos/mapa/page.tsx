import styles from './blocksMapStyles.module.scss'

import dynamicLib from 'next/dynamic'

import prismaClient from '@/lib/prisma'

export const dynamic='force-dynamic';

export default async function BlockMaps (
    {searchParams}: any
) {
    
    const Map = dynamicLib(() => import('@/components/Map'), { ssr: false })
    const BlockMarker = dynamicLib(() => import('@/components/BlockMarker'), { ssr: false })

    const blocks = await prismaClient.carnivalBlock.findMany({
        orderBy: {
            createdAt: 'asc'
        },
        where: searchParams.estado !== '' && searchParams.nome !== '' ? {
            state: searchParams.estado,
            name: {
                contains: searchParams.nome
            }
        } : (
            searchParams.estado !== '' ? {
                state: searchParams.estado
            } : (searchParams.nome !== '' ? {
                name: {
                    contains: searchParams.nome
                }
            } : {})
        )
    })


    return (
        <div id={styles.container}>
            <Map
                center={{ lat: searchParams.lat || -15.7993786, lng: searchParams.lng || -47.8654648 }}
            >
                {blocks.map((block) => {
                    return (
                        <BlockMarker
                            key={block.id}
                            id={block.id}
                            name={block.name}
                            image={`/uploads/${block.imageName}`}
                            position={{ lat: Number(block.positionLat), lng: Number(block.positionLng) }}
                        />
                    )
                })}
            </Map>
        </div>
    )
}