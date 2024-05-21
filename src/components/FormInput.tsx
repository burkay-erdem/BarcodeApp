import { StyleSheet, TextInputProps, View } from "react-native";
import { TextInput } from "@react-native-material/core";

interface IFormInput extends TextInputProps {
    label: string;
    value: string;
    onChangeText: (e: string) => void;
    right?: React.ReactNode;
    left?: React.ReactNode;
}

export const FormInput: React.FC<IFormInput> = ({ label, left, right, value, onChangeText, ...props }) => {
    return (
        <View style={styles.formGroup} >
            <TextInput
                {...props}
                leading={left}
                trailing={right}
                label={label}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    )
}
 
const styles = StyleSheet.create({
    formGroup: {
        width: '100%',
        // flex: 1 
    }, 
});