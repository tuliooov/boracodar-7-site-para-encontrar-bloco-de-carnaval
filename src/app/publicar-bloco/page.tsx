"use client"
import { FormEvent, useState, useRef } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { v4 as uuidV4 } from 'uuid'

import { BlocksAreaHeader } from '@/components/BlocksAreaHeader'

import styles from './publicarBlocoStyles.module.scss'

import states from '@/data/states.json'
import { ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '@/firebase/config';

interface PositionInterface {
    lat: number,
    lng: number
}

export default function PublicarBloco() {

    const Map = dynamic(() => import("../../components/Map"), {
        ssr: false
    });
    const MapPositionMarker = dynamic(() => import('../../components/MapPositionMarker'), {
        ssr: false
    }); 

    const descriptionTextArea = useRef<HTMLTextAreaElement>(null)

    const [name, setName] = useState<string>('')
    const [blockState, setBlockState] = useState<string>('')
    const [selectedImage, setSelectedImage] = useState<File | null>()
    const [position, setPosition] = useState<PositionInterface>({ lat: -15.7993786, lng: -47.8654648 })
    const [description, setDescription] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [mapCenterPosition, setMapCenterPosition] = useState<PositionInterface>({ lat: -15.7993786, lng: -47.8654648 })
    const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>()

    function updateDescriptionTextArea(event: any) {
        setDescription(event.target.value)
        if(descriptionTextArea.current) descriptionTextArea.current.style.height = `${descriptionTextArea.current.scrollHeight}px`
    }

    function handleSelectImage(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0]
            setSelectedImage(file)
            setSelectedImagePreview(URL.createObjectURL(file));
            event.target.value = '';
        }
    }
    function handleRemoveImage() {
        setSelectedImage(null)
        setSelectedImagePreview(null)
    }
    function handleSelectState(event:React.ChangeEvent<HTMLSelectElement>){
        const [lat, lng, state, uf] = event.target.value.split('/')

        setBlockState(`${state}-${uf}`)
        setMapCenterPosition({lat: Number(lat as string), lng: Number(lng as string)})
    }

    async function submitPublishBlock(event: FormEvent) {
        event.preventDefault();

        setLoading(true)
        
        let nameFile = ''
        if(selectedImage){
            const type = selectedImage.name.slice(selectedImage.name.indexOf("."), selectedImage.name.length)
            nameFile = `${uuidV4()}${type}`
            const storageRef = ref(storage,`/bora-codar-7/${nameFile}`)
            uploadBytesResumable(storageRef, selectedImage, {
                cacheControl: 'max-age=31536000',
                customMetadata: {
                  organizationId: process.env.FIREBASE_STORAGE_BUCKET!,
                },
            });
        }

        const body = new FormData()
        body.append('name', name)
        body.append('state', blockState)
        body.append('nameBanner', nameFile)
        body.append('positionLat', String(position.lat))
        body.append('positionLng', String(position.lng))
        body.append('description', description)
        

        const response = await fetch('/api/publicar-bloco', {
            method: 'POST',
            body
        })

        const responseData = await response.json()

        if (responseData.done == 'ok') {
            alert('🎉Bloco publicado com sucesso!!🎉')
            window.location.replace('/blocos')
        } else {
            alert(`❌${responseData.error}❌`)
        }

        setLoading(false)
    }

    return (
        <div id={styles.container}>
            <BlocksAreaHeader
                buttonLink='/blocos'
                buttonName='BLOCOS RECOMENDADOS'
                optionName='Publicar bloco'
                enableToggleContainer={false}
            />

            <form onSubmit={submitPublishBlock}>
                <div id={styles.blockTextInfos}>
                    <div className={styles.input}>
                        <Image
                            height={500}
                            width={500}
                            src="/identification.png"
                            alt="Icone de busca"
                        />
                        <input
                            onChange={(event) => { setName(event.target.value); }}
                            type="text"
                            placeholder="Dê um nome bem divertido ao seu bloco"
                        />
                    </div>

                    <div className={styles.input} id={styles.locationSelect}>
                        <Image
                            height={500}
                            width={500}
                            src="/location.png"
                            alt="Icone de localização"
                        />
                        <select
                            onChange={handleSelectState}
                        >
                            <option value="">Selecione o estado do seu bloco</option>
                            {
                                states.map((state) => {
                                    return (
                                        <option
                                            value={`${state.latitude}/${state.longitude}/${state.name}/${state.uf}`}
                                            key={state.name}
                                        >{`${state.name}-${state.uf}`}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                </div>

                <textarea
                    onChange={updateDescriptionTextArea}
                    id={styles.descriptionTextArea}
                    placeholder='Descreva o seu bloco'
                    ref={descriptionTextArea}
                />


                <label id={styles.blockImageContainer}>
                    <Image
                        height={500}
                        width={500}
                        id={selectedImagePreview ? styles.imagePreview : ""}
                        src={selectedImagePreview || "/image.png"}
                        alt="image contaienr"
                    />

                    {
                        selectedImagePreview ? (
                            <button
                                id={styles.removeImageButton}
                                onClick={handleRemoveImage}
                            >Remover imagem</button>
                        ) : (
                            <p>Clique para escolher uma imagem</p>
                        )
                    }
                    <input
                        type="file"
                        onInput={handleSelectImage}
                        accept=".png,.jpg,.jpeg,.pjpeg"
                    />
                </label>
                <div id={styles.blockLocationContainer}>
                    <Map
                        center={mapCenterPosition}
                    >
                        <MapPositionMarker
                            onChange={(position) => { setPosition(position); setMapCenterPosition(position) }}
                            position={position}
                        />
                    </Map>
                </div>
                <button id={styles.submitBlockButton}>
                    {loading ? `...` : "PUBLICAR"}
                </button>
            </form>
        </div>
    )
}