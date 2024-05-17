import { API_URL } from '@env'
import React, { useState } from 'react'
import { Image, ImagePropsBase } from 'react-native'

interface IImageFeed extends ImagePropsBase{

}
export const ImageFeed: React.FC<IImageFeed> = (props) => {
    const [source,setSource] = useState(props.source)
  return (
    <Image onError={() => setSource({uri: `${API_URL}/image/uploads/noImage.png`})}  source={source} />
  )
}
