import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner'; 
import { IAction } from "../pages/ProductSave"; 
import { CameraView } from "expo-camera";

interface IBarcode {
    dispatch: React.Dispatch<IAction>;
    setIsScan: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function BarcodeApp({ dispatch, setIsScan }: Readonly<IBarcode>) {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            console.log('status: ', status);
            setHasPermission(status === "granted");
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        dispatch({
            name: 'barcode',
            value: data
        });
        setIsScan(false);
        Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
                <Button title={"Close"} onPress={() => setIsScan(false)} />
            </View>
        );
    }
    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text>
                <Button title={"Close"} onPress={() => setIsScan(false)} />
            </View>
        )

    }

    return (
        <View style={styles.container}>
            <CameraView
                onBarcodeScanned={handleBarCodeScanned}
                // barcodeScannerSettings={{
                //     barcodeTypes: ["qr", "pdf417"],
                // }}
                style={StyleSheet.absoluteFillObject}
            />
            {/* <BarCodeScanner
                onBarCodeScanned={handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            /> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
});
