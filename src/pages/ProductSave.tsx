
import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import { useReducer, useState } from 'react';
import Header from '../components/AppBar';
import { Button, TextInput } from 'react-native-paper';
import { IconTypes } from '../../icon-list';
import ImagePicker from '../components/imagePicker/ImagePicker';
import { IProductCreateRequest } from '../../types/request/product.interface';
import { usePostProductCreateImageMutation, usePostProductCreateMutation } from '../service/product.service';
import { IMessage } from '../../types/system';
import { useAsyncHandler } from '../hooks/useAsyncHandler';
import { ImagePickerAsset } from 'expo-image-picker';
interface IImage {
  key: string;
  image?: ImagePickerAsset;
}
export interface IAction { name: keyof IProductCreateRequest, value: string }

const initialArg: IProductCreateRequest = {
  name: 'asdasd',
  barcode: 'asd',
  width: '123',
  length: '123',
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
  const { name, value } = action
  return {
    ...state,
    [name]: value
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
        const requestOptions: RequestInit = {
          method: "POST",
          body: formData,
          redirect: "follow"
        };
        // fetch("https://localhost.dev.elonky.com/product/image", requestOptions)
        //   .then((response) => response.text())
        //   .then((result) => console.log(result))
        //   .catch((error) => console.error(error));
        const createProductImageResponse = await createProductImage(formData)
        // console.log('createProductImageResponse: ', createProductImageResponse);
      }
    })
  }
  if (!isScan) {
    return (
      <>
        <Header />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <SafeAreaView style={{ width: '100%', flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 }}>
              <TextInput
                label="Name"
                style={styles.input}
                value={state.name}
                onChangeText={value => dispatch({ name: 'name', value })}
              />
              <TextInput
                label="Barcode"
                style={styles.input}
                value={state.barcode}
                onChangeText={value => dispatch({
                  name: 'barcode',
                  value
                })}
                right={<TextInput.Icon onPress={() => setIsScan(true)} icon={IconTypes['barcode-scan']} />}
              />
              <TextInput
                label="Width"
                style={styles.input}
                value={state.width}
                keyboardType='numeric'
                onChangeText={value => dispatch({ name: 'width', value })}
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
              <TextInput
                label="Length"
                style={styles.input}
                value={state.length}
                keyboardType='numeric'
                onChangeText={value => dispatch({ name: 'length', value })}
              />
              <Button mode="contained" style={styles.input} onPress={e => handleSubmit()} >
                Save
              </Button>
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </>

    )
  }
  return (
    <>
      <BarcodeApp dispatch={dispatch} setIsScan={setIsScan} />
      <Button onPress={() => setIsScan(false)}>cancel</Button>
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
    paddingVertical: 0
  },
  input: {
    width: '90%',
  },
});

