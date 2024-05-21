
import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";

import {
  Alert,
  Button,
  StyleSheet,
  View,
} from "react-native";
import { usePostUserCreateMutation } from "../service/user.service";
import { Dropdown } from "react-native-element-dropdown";
import { useGetRoleReadListQuery } from "../service/role.service";
import { IUserCreateRequest } from "../../types/request/user.interface";
import { FormInput } from "../components/FormInput";
import { Select } from "../components/Select";

const initialArg: IUserCreateRequest = {
  name: '',
  role_id: 0,
  email: "",
  password: ""
}
const reducer = (state: IUserCreateRequest, action: { name: string, value: string }) => {
  const { name, value } = action
  return {
    ...state,
    [name]: value
  }
}

export default function UserSave() {
  const [state, dispatch] = useReducer(reducer, initialArg)

  const { data: roles } = useGetRoleReadListQuery({
  })
  const [createUser] = usePostUserCreateMutation();
  const handleSubmit = async () => {
    try {
      const createUserResponse = await createUser({ ...state }).unwrap()
      Alert.alert('Kullanıcı işlemleri', JSON.stringify(createUserResponse.data))
      console.log('createUserResponse: ', createUserResponse);
    } catch (error: any) {
      console.error('error : ', error.data.errorMessages)
    }
  }
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

      <StatusBar style="auto" />

      <FormInput
        label="Name"
        value={state.name}
        onChangeText={value => dispatch({ name: 'name', value })}
      />

      <Select
        data={(roles?.data ?? []).map(role => ({
          label: role.name,
          value: role.role_id.toString()
        }))}
        search
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        searchPlaceholder="Search..."
        value={state.role_id.toString()}
        onChange={(item) => {
          dispatch({
            name: 'role_id',
            value: item.value
          });
        }}
      />

      <FormInput
        label="Email"
        value={state.email}
        onChangeText={value => dispatch({ name: 'email', value })}
      />
      <FormInput
        label="Password"
        value={state.password}
        onChangeText={value => dispatch({ name: 'password', value })}
      />

      <Button title="Kaydet" onPress={e => handleSubmit()} />
    </View >
    // </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  dropdown: {
    width: '100%',
    margin: 16,
    height: 50,
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