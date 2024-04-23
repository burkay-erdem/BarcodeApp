
import { StatusBar } from 'expo-status-bar';
import { Button, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import BarcodeApp from '../components/BarcodeReader';
import { useState } from 'react';

export default function ProductSave() {
  const [isScan, setIsScan] = useState<boolean>(false)
  const [barcode, setBarcode] = useState<string>('')
  const [text, onChangeText] = useState('Useless Text');
  const [number, onChangeNumber] = useState('');

  if (!isScan) {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Button title={"Scan Barcode"} onPress={() => setIsScan(true)} />
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

