
import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import { useReducer, useState } from 'react';
import Header from '../components/AppBar';
import { Button, TextInput } from 'react-native-paper';
import { IProductCreateRequest } from '../../types/response/product.interface';
import { IconTypes } from '../../icon-list';


const initialArg: IProductCreateRequest = {
  name: '',
  barcode: '',
  width: '',
  length: '',
  height: ''
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

  // const { data } = useGetUserReadQuery({
  //   id: 0
  // })
  const [isScan, setIsScan] = useState<boolean>(false)

  const handleSubmit = () => {
    console.log('submit data : ' , state)
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
                keyboardType = 'numeric'
                onChangeText={value => dispatch({ name: 'width', value })}
              />
              <TextInput
                label="Height"
                style={styles.input}
                value={state.height}
                keyboardType = 'numeric'
                onChangeText={value => dispatch({ name: 'height', value })}
              />
              <TextInput
                label="Length"
                style={styles.input}
                value={state.length}
                keyboardType = 'numeric'
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
    <BarcodeApp dispatch={dispatch} setIsScan={setIsScan} />
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

