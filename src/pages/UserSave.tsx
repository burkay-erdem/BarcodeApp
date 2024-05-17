
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
      const createUserResponse = createUser({ ...state })
      Alert.alert('Kullanıcı işlemleri', 'yeni kullanıcı oluşturuldu')
      console.log('createUserResponse: ', createUserResponse);
    } catch (error) {
      console.log('error : ', error)
    }
  }
  return (
    // <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

      <StatusBar style="auto" />

      <FormInput
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
        data={(roles?.data ?? []).map(role => ({
          label: role.name,
          value: role.role_id.toString()
        }))}
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
      <FormInput
        label="Email"
        style={styles.input}
        value={state.email}
        onChangeText={value => dispatch({ name: 'email', value })}
      />
      <FormInput
        label="Password"
        style={styles.input}
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