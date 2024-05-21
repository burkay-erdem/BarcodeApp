import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { AntDesign } from '@expo/vector-icons';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { StyleSheet } from 'react-native';


export const Select = <T extends { label: string; value: string | number }>({ data, ...props }: DropdownProps<T>) => {
    const [value, setValue] = useState<string | null>(null);

    return (
        <Dropdown<T>
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            maxHeight={300}
            data={data}
            value={value}
            // renderLeftIcon={() => (
            //     <AntDesign name="arrowdown" size={24} color="black" />
            // )}
            {...props}
        />
    );
};



const styles = StyleSheet.create({
    dropdown: {
        // margin: 16,
        height: 50,
        backgroundColor: 'white',
        // borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});