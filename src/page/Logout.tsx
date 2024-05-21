import { Text } from "@react-native-material/core";
import { useEffect } from "react";  
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { setSession } from "../reducer/auth.slice";

export const Logout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSession(null))
    }, []);

    return (
        <View>
            <Text>Logging out...</Text>
        </View>
    );
};