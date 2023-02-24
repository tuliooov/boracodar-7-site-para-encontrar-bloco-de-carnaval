"use client"

import Link from 'next/link'
import styles from './BlocksAreaHeader.module.scss'
import {usePathname} from 'next/navigation'

interface BlocksAreaHeaderParams {
    optionName: string,
    buttonName: string,
    buttonLink: string,
    enableToggleContainer: boolean
}

export function BlocksAreaHeader({
        optionName, 
        enableToggleContainer,
        buttonName,
        buttonLink
}: BlocksAreaHeaderParams) {

    const pathname = usePathname()

    return (
        <header id={styles.container}>
            <h1 id={styles.title}>{optionName}</h1>

            <Link
                id={styles.changeModeButton}
                href={buttonLink}
            >{buttonName}</Link>
            {
                enableToggleContainer && (
                    <div id={styles.toggleContainer} disabled-data={`${!enableToggleContainer}`}>
                        
                        <Link 
                            href="/blocos" 
                            
                            data-state={pathname == "/blocos"&&"on"} 
                            className={styles.toggleMenuItem}
                        >
                            LISTA
                        </Link>

                        <Link 
                            href="/blocos/mapa" 
                            data-state={pathname == "/blocos/mapa"&&"on"} 
                            className={styles.toggleMenuItem}
                        >
                            MAPA
                        </Link>

                    </div>
                )
            }
        </header>

    )
}