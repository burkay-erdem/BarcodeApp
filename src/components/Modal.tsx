import { Text } from '@react-native-material/core';
import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
interface IModal {
    isVisible: boolean;
    onClose?: () => void;
    children?: React.ReactNode
}
export const ModalContent: React.FC<IModal> = ({ isVisible, onClose, children }) => {
    const [showAppOptions, setShowAppOptions] = useState(false);
    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <Pressable style={styles.outOfModal} onPress={onClose}>
               
            </Pressable>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Choose a sticker</Text>
                    <Pressable onPress={onClose}>
                        <Entypo name="cross" size={24} color="black" />
                    </Pressable>
                </View>
                {children}
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    outOfModal: {
        height: '55%',
        width: '100%', 
        position: 'absolute',
        top: 0,
    },
    modalContent: {
        height: '45%',
        width: '100%',
        backgroundColor: '#d1d1d1',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '16%',
        backgroundColor: '#c1c1c1',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
});
