import { StatusBar } from "expo-status-bar";
import React, { useReducer } from "react";
import {
  StyleSheet,
} from "react-native";
import { usePostUserLoginMutation } from "../service/user.service";
import { IUserAuthRequest } from "../../types/request/user.interface";
import { FormInput } from "../components/FormInput";
import { useAsyncHandler } from "../hook/useAsyncHandler";
import { Button, Stack } from "@react-native-material/core";
import { useDispatch } from "react-redux";
import { setSession } from "../reducer/auth.slice";

const initialArg: IUserAuthRequest = {
  username: "ahmet",
  password: "Shn46"
}

const reducer = (state: IUserAuthRequest, action: { name: string, value: string }) => {
  const { name, value } = action
  return {
    ...state,
    [name]: value
  }
}

export default function LoginPage() {
  const [state, formDispatch] = useReducer(reducer, initialArg);
  const dispatch = useDispatch()

  const [userLogin] = usePostUserLoginMutation();
  const { asyncHandler } = useAsyncHandler();


  const handleSubmit = () => {
    asyncHandler(async () => {

      const userLoginResponse = await userLogin(state).unwrap()
      if (userLoginResponse.data) {
        dispatch(setSession(userLoginResponse.data))
      }
      console.log('userLoginResponse: ', userLoginResponse);
    })
  }

  return (
    <Stack fill center spacing={10}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} /> */}

      <StatusBar style="auto" />
      {/* <View style={styles.inputView}> */}
      <FormInput
        // style={styles.TextInput}
        label="Email"
        placeholder="Email."
        placeholderTextColor="#003f5c"
        value={state.username}
        onChangeText={value => formDispatch({ name: 'username', value })}
      />
      {/* </View> */}

      {/* <View style={styles.inputView}> */}
      <FormInput
        // style={styles.TextInput}
        placeholder="Password."
        placeholderTextColor="#003f5c"
        label="Password"
        value={state.password}
        secureTextEntry={true}
        onChangeText={value => formDispatch({ name: 'password', value })}
      />
      {/* </View> */}
      {/*  
        <TouchableOpacity>
          <Text style={styles.forgot_button}>Şifremi ?</Text>
        </TouchableOpacity> 
      */}

      <Button onPress={handleSubmit} title="Giriş Yap" />

    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});