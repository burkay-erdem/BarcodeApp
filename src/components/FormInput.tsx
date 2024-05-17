import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";



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
            <View style={styles.label} >

                <Text>{label}</Text>
            </View>
            <View style={styles.formControl}>
                <View style={styles.controlLeft} >
                    {left}
                </View>
                <TextInput
                    {...props}
                    style={left ? [styles.input, styles.leftInput] : styles.input}
                    value={value}
                    onChangeText={onChangeText}
                />
                <View style={styles.controlRight} >

                    {right}
                </View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    formGroup: {
        width: '100%',
        // flex: 1

    },
    controlRight: {
        position: "absolute",
        right: 20,
        height: 40,
        bottom: 12,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 30
    },

    controlLeft: {
        position: "absolute",
        left: 20,
        height: 40,
        bottom: 12,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 30
    },
    leftInput: {
        paddingLeft: 40,

    },
    formControl: {
        width: '100%',
        position: "relative"

    },
    label: {
        width: '100%',
        marginHorizontal: 12,

        // flex: 1

    },
    input: {
        // width: '100%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
});