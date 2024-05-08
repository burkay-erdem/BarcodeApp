
import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import { useReducer, useState } from 'react';
import Header from '../components/AppBar';
import { Button, TextInput } from 'react-native-paper';
import { IconTypes } from '../../icon-list';
import ImagePicker from '../components/imagePicker/ImagePicker';
import { IProductCreateRequest } from '../../types/request/product.interface';
import { usePostProductCreateMutation } from '../service/product.service';
import { IMessage } from '../../types/system';


const initialArg: IProductCreateRequest = {
  name: '',
  barcode: '',
  width: '',
  length: '', 
}
export interface IAction { name: keyof IProductCreateRequest, value: string }
const reducer = (state: IProductCreateRequest, action: IAction) => {
  const { name, value } = action
  return {
    ...state,
    [name]: value
  }
}


export default function ProductSave() {
  const [state, dispatch] = useReducer(reducer, initialArg)
  const [images, setImages] = useState([
    {
      key: 'img-1',
      uri: ''
    },
    {
      key: 'img-2',
      uri: ''
    },
    {
      key: 'img-3',
      uri: ''
    },
  ])
  const handleSetUrl = (uri: string, key: string) => {
    setImages(prev => prev.map(x => {
      if (x.key === key) {
        x.uri = uri
      }
      return x
    }))
  }

  const [isScan, setIsScan] = useState<boolean>(false)

  const [createProduct] = usePostProductCreateMutation()
  const handleSubmit = async () => {
    try {
      const createProductResponse = await createProduct(state).unwrap()
      console.log('createProductResponse: ', createProductResponse)
    } catch (error: any) {
      if (error.data.errorMessages.length) {
        const errorMessages = error.data.errorMessages as IMessage[]
        console.error(errorMessages)
      }
      if (error.data.warningMessages.length) {
        const warningMessages = error.data.warningMessages as IMessage[]
        console.warn(warningMessages)
      } 
    }

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
                  images.map(image => (
                    <ImagePicker
                      key={image.key}
                      onChangeImage={uri => handleSetUrl(uri ?? '', image.key)}
                      imageUri={image.uri}
                      mode='both'
                      onCancel={() => handleSetUrl('', image.key)}
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

