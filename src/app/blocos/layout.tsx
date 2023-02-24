import { BlocksAreaHeader } from '@/components/BlocksAreaHeader'

import styles from './blocksListStyles.module.scss'

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {

    return (

        <div id={styles.container}>
            <BlocksAreaHeader
                optionName="Blocos recomendados"
                enableToggleContainer={true}
                buttonName="PUBLICAR BLOCO"
                buttonLink="/publicar-bloco"
            />
            {children}
        </div>
    )
}