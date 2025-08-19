import { useState } from 'react'
import Image from 'next/image'

type EventProps = {
  imageUrl: string
  name: string
}

export default function ImageComponent({ imageUrl, name }: EventProps) {
  const [src, setSrc] = useState(imageUrl)

  // Función para manejar el error de carga de la imagen
  const handleImageError = () => {
    setSrc('/svgs/placeholder.svg')
  }

  return (
    <Image
      src={src}
      alt={`Portada de ${name}`}
      fill
      className='object-cover'
      sizes='100vw'
      priority={false}
      onError={handleImageError}
    />
  )
}
