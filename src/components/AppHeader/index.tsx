"use client"

import { useState } from 'react'
import {usePathname, useSearchParams} from 'next/navigation'

import styles from './headerStyles.module.scss'

import states from '@/data/states.json'

export function AppHeader() {
    
    // console.log(searchParams);
    
    const pathName = usePathname()
    const searchParams = useSearchParams()

    console.log();
    

    const [blockState, setBlockState] = useState<string>(searchParams?.get("estado") ?? '')
    const [name, setName] = useState<string>(searchParams?.get("nome") ?? '')
    const [position, setPosition] = useState({lat: -15.7993786, lng: -47.8654648})
    const [loading, setLoading] = useState(false)

    function handleSelectState(event: React.ChangeEvent<HTMLSelectElement>){
        if(!event.target.value){
            setBlockState('')
            setPosition({lat: -15.7993786, lng: -47.8654648})
            return 
        }
        const [state, uf] = event.target.value.split('-')

        const stateFound = states.find((state) => state.uf === uf)

        if(stateFound){
            const {latitude, longitude} = stateFound
            setBlockState(`${state}-${uf}`)
            setPosition({lat:Number(latitude), lng:Number(longitude)})
        }
    }

    const handleSearch = () => {
        setLoading(true)
    }

    return (
        <div id={styles.container}>
            <img
                src="/bottomHeader.png"
                alt="Imagem carnavalesca"
                id={styles.bottomImage}
                className={styles.backgroundImage}
            />
            <img
                src="/topHeader.png"
                alt="Imagem carnavalesca"
                id={styles.topImage}
                className={styles.backgroundImage}
            />

            <div id={styles.wrapper}>


                <h1 id={styles.title}>
                    Encontre os <span>melhores blocos </span>
                    de carnaval de 2023
                </h1>

                <form  
                    id={styles.searchContainer} 
                    onSubmit={(event) => event.preventDefault()}
                >

                    <div className={styles.input}>
                        <img
                            src="/search.png"
                            alt="Icone de busca"
                        />
                        <input
                            onChange={(event) => setName(event.target.value)}
                            value={name}
                            type="text"
                            placeholder="Pesquise por nome"
                        />
                    </div>

                    <div className={styles.input} id={styles.locationSelect}>
                        <img
                            src="/location.png"
                            alt="Icone de localização"
                        />
                        <select
                            onChange={handleSelectState}
                            value={blockState}
                        >
                            <option value="">Selecione uma cidade</option>
                            {
                                states.map((state) => {
                                    return (
                                        <option
                                            value={`${state.name}-${state.uf}`}
                                            key={state.name}
                                        >
                                            {`${state.name}-${state.uf}`}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <a 
                        onClick={handleSearch} 
                        id={styles.submitButton}
                        href={`${`/blocos?estado=${blockState}&nome=${name}&lat=${position.lat}&lng=${position.lng}`}`}
                    >{loading ? '...' : 'BUSCAR AGORA'}</a>
                </form>
            </div>
        </div>
    )
}