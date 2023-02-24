import Image from 'next/image'
import Link from 'next/link'

import prismaClient from '@/lib/prisma'

import styles from './blocksListStyles.module.scss'

export const dynamic='force-dynamic';

export default async function BlocksList({ searchParams }: any) {

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
        <>

            <main>
                {
                    blocks.length >= 1 ? (

                        blocks.map((block) => {
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