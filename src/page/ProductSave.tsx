
import { Alert, Button, Keyboard, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import React, { useReducer, useState } from 'react';
import ImagePicker from '../components/imagePicker/ImagePicker';
import { IProductCreateRequest } from '../../types/request/product.interface';
import { usePostProductCreateImageMutation, usePostProductCreateMutation } from '../service/product.service';
import { useAsyncHandler } from '../hook/useAsyncHandler';
import { ImagePickerAsset } from 'expo-image-picker';
import IOnIcons from '@expo/vector-icons/Ionicons';
import { FormInput } from '../components/FormInput';


interface IImage {
  key: string;
  image?: ImagePickerAsset;
}

export type IAction =
  | { type: "SET_VALUE", payload: { name: keyof IProductCreateRequest, value: string } }
  | { type: "CLEAR_STATE" }

const initialArg: IProductCreateRequest = {
  name: '',
  barcode: '',
  width: '',
  length: '',
  created_by: 0
}
const initialImg: IImage[] = [
  {
    key: 'img-1',
    image: undefined
  },
  {
    key: 'img-2',
    image: undefined
  },
  {
    key: 'img-3',
    image: undefined
  },
]
const reducer = (state: IProductCreateRequest, action: IAction) => {
  switch (action.type) {
    case "SET_VALUE": {
      const { name, value } = action.payload
      return {
        ...state,
        [name]: value
      }
    }
    case "CLEAR_STATE": {
      return initialArg
    }


    default:
      return state
  }

}

export default function ProductSave() {
  const [state, dispatch] = useReducer(reducer, initialArg)
  const [images, setImages] = useState<IImage[]>(initialImg)
  const handleSetUrl = (image: ImagePickerAsset | undefined, key: string) => {
    setImages(prev => prev.map(x => {
      if (x.key === key) {
        x.image = image
      }
      return x
    }))
  }

  const [isScan, setIsScan] = useState<boolean>(false)

  const [createProduct] = usePostProductCreateMutation()
  const [createProductImage] = usePostProductCreateImageMutation()
  const { asyncHandler } = useAsyncHandler()
  const handleSubmit = () => {
    asyncHandler(async () => {
      console.log('state: ', state);
      const createProductResponse = await createProduct(state).unwrap()
      console.log('createProductResponse: ', createProductResponse);

      const _images = images.filter(x => x.image)
      if (_images.length) {
        const formData = new FormData()
        formData.append('productId', createProductResponse.data?.product_id)
        _images.forEach(({ key, image }) => {
          console.log('image: ', image);
          formData.append('files', {
            uri: image?.uri,
            type: 'image/jpeg',
            name: 'image.jpg',
          })
        })
        await createProductImage(formData).unwrap()
      }
      Alert.alert('Ürün Oluşturuldu')
      setImages(initialImg)
      dispatch({ type: "CLEAR_STATE" })
    })
  }
  if (!isScan) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* <View style={styles.container}> */}
        <SafeAreaView style={styles.container}>
          <FormInput
            label="Name"
            value={state.name}
            onChangeText={value => dispatch({ type: "SET_VALUE", payload: { name: 'name', value } })}
          />



          <FormInput
            label="Barcode"
            value={state.barcode}
            onChangeText={value => dispatch({ type: "SET_VALUE", payload: { name: 'barcode', value } })}
            right={
              <TouchableOpacity
                onPress={() => setIsScan(true)}
              >
                {/* <FontAwesome name="barcode" size={24} color="black" /> */}
                <IOnIcons name="barcode" size={24} color="black" />
                {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}

              </TouchableOpacity>
            }
          />

          <FormInput
            label="Width"
            value={state.width}
            keyboardType='numeric'
            onChangeText={value => dispatch({ type: "SET_VALUE", payload: { name: 'width', value } })}
          />
          <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10
          }}>

            {
              images.map(({ key, image }) => (
                <ImagePicker
                  key={key}
                  onChangeImage={uri => handleSetUrl(uri, key)}
                  image={image}
                  mode='both'
                  onCancel={() => handleSetUrl(undefined, key)}
                />
              ))
            }
          </View>
          <FormInput
            label="Length"
            value={state.length}
            keyboardType='numeric'
            onChangeText={value => dispatch({ type: "SET_VALUE", payload: { name: 'length', value } })}
          />
          <Button
            title={"Kaydet"}
            onPress={e => handleSubmit()}
          />

        </SafeAreaView>
        {/* </View> */}
      </TouchableWithoutFeedback>

    )
  }
  return (
    <>
      <BarcodeApp dispatch={dispatch} setIsScan={setIsScan} />
      <Button title='cancel' onPress={() => setIsScan(false)} />
    </>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: '100%',
    gap: 10
  },
  input: {
    width: '90%',
  },
});

