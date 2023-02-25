"use client"

import Image from 'next/image'
import Link from 'next/link'

// import prismaClient from '@/lib/prisma'

import styles from './blocksListStyles.module.scss'
import { useCallback, useEffect, useState } from 'react';

// export const dynamic='force-dynamic';

// async function getBlocks(searchParams: any) {
//     return prismaClient.carnivalBlock.findMany({
//         orderBy: {
//             createdAt: 'asc'
//         },
//         where: searchParams.estado !== '' && searchParams.nome !== '' ? {
//             state: searchParams.estado,
//             name: {
//                 contains: searchParams.nome
//             }
//         } : (
//             searchParams.estado !== '' ? {
//                 state: searchParams.estado
//             } : (searchParams.nome !== '' ? {
//                 name: {
//                     contains: searchParams.nome
//                 }
//             } : {})
//         )
//     })
// }

async function fetchUser() {
    const response = await fetch('/api/buscar-blocos', {
        method: 'GET',
    })
    return await response.json()
}

export default function BlocksList({ searchParams }: any) {

    // const blocks = await getBlocks(searchParams)
    // const user = await fetchUser()

    // async function fetchUser() {
    //     return (await fetch('/api/buscar-blocos', {
    //         method: 'GET',
    //     })).json()
    // }

    const [blocks, setBlocks] = useState<any>([]) 

    const func = useCallback(async () => {
        const response = await fetchUser()
        setBlocks(response.result)
    }, [])
    
    useEffect(() => {
        func()
    }, [func])

    return (
        <>
            <main>
                {
                    blocks.length >= 1 ? (

                        blocks.map((block: any) => {
                            return (
                                <Link 
                                    key={block.id} 
                                    className={styles.blockCard}
                                    href={`/blocos/${block.id}`}
                                >
                                    <img
                                        src={`/uploads/${block.imageName}`}
                                        alt="O python do vovo não sobe mais"
                                        className={styles.blockBanner}
                                    />
                                    <div className={styles.blockContent}>

                                        <h1>
                                            {block.name}
                                        </h1>
                                        <p>{block.description}</p>
                                        <div className={styles.blockLocation}>
                                            <Image
                                                src="/location.png"
                                                alt="Icone de localização"
                                                height={24}
                                                width={24}
                                            />
                                            <p>{block.state}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    ): (
                        <div id={styles.noBlocksContainer}>
                            <img
                                src="/sad.png"
                            />
                            <h1>Sem festas por hoje... </h1>
                            <p>Não foi encontrado nenhum bloco <span>{searchParams.nome&& `"${searchParams.nome}"`} {searchParams.estado&& `em ${searchParams.estado}`} </span></p>
                            
                        </div>
                    )
                }
            </main>
        </>
    )
}