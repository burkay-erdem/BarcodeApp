
import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import { useState } from 'react';
import Header from '../components/AppBar';
import { Button, Toast } from '@ant-design/react-native';
import DropdownComponent from '../components/Dropdown';
import { useGetUserReadQuery } from '../service/activity.service';

export default function ProductSave() {

  const { data } = useGetUserReadQuery({
    message: 'hello'
  })
  console.log('data: ', data);
  const [isScan, setIsScan] = useState<boolean>(false)
  const [barcode, setBarcode] = useState<string>('')
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  if (!isScan) {
    return (
      <>
        <Header />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <Button onPress={() => Toast.info('This is a toast tips')}>
              Start
            </Button>
            <Button onPress={() => setIsScan(true)} >
              Scan Barcode
            </Button>
            <DropdownComponent />
            <Text>barcode: {barcode}</Text>
            <SafeAreaView>
              <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="useless placeholder"
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                value={barcode}
                readOnly={true}
                aria-disabled={true}
                placeholder="Barcode"
                keyboardType="numeric"
              />
            </SafeAreaView>
          </View>
        </TouchableWithoutFeedback>
      </>

    )
  }
  return (
    <BarcodeApp setBarcode={setBarcode} setIsScan={setIsScan} />
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
    height: 40,
    margin: 12,

    borderWidth: 1,
    padding: 10,
  },
});

