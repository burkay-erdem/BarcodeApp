
import { StatusBar } from "expo-status-bar";
import React, { useReducer, useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { IUserCreateRequest } from "../../types/response/user.interface";
import { Button, Icon, MD3LightTheme, TextInput } from "react-native-paper";
import { usePostUserCreateMutation } from "../service/user.service";
import { IconTypes } from "../../icon-list";
import { Dropdown } from "react-native-element-dropdown";

const initialArg: IUserCreateRequest = {
  name: '',
  role_id: 0,
  password: ""
}
const reducer = (state: IUserCreateRequest, action: { name: string, value: string }) => {
  const { name, value } = action
  return {
    ...state,
    [name]: value
  }
}


interface IData {
  label: string, value: string
}
const data: IData[] = [
  { label: 'Operator', value: '1' },
  { label: 'Muhasebe', value: '2' },
  { label: 'Tedarikçi', value: '3' },
];
export default function UserSave() {
  const [state, dispatch] = useReducer(reducer, initialArg)
  const [createUser] = usePostUserCreateMutation();
  const handleSubmit = async () => {
    const createUserResponse = createUser({ ...state, id: 0 })
    console.log('createUserResponse: ', createUserResponse);
    console.log('{...state} :', state)
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

        <StatusBar style="auto" />

        <TextInput
          label="Name"
          style={styles.input}
          value={state.name}
          onChangeText={value => dispatch({ name: 'name', value })}
        />

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={state.role_id.toString()}
          onChange={item => {
            dispatch({
              name: 'role_id',
              value: item.value
            });
          }}
        // renderLeftIcon={() => (
        //   <Icon  color="black" source={IconTypes.safe} size={20} />
        // )}
        />
        <TextInput
          label="Password"
          style={styles.input}
          value={state.password}
          onChangeText={value => dispatch({ name: 'password', value })}
        />


        <Button mode="contained" style={styles.input} onPress={e => handleSubmit()} >
          Save
        </Button>
      </View >
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: '90%'
  },
  dropdown: {
    width: '90%',
    margin: 16,
    height: 50,
    backgroundColor: MD3LightTheme.colors.inverseOnSurface,
    paddingHorizontal: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
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