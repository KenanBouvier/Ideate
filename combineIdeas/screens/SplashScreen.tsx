import React, { useEffect } from 'react';
import {View,Text,ActivityIndicator} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ()=>{
    const navigation = useNavigation();

    useEffect(()=>{
        const checkUser = async ()=>{
            if (await isAuthenticated()){
                navigation.navigate("Root");
            }
            else{
                navigation.navigate("SignIn");
            }
        }
        checkUser();
    },[]);

    const isAuthenticated = async () =>{
        return false;
        const token = await AsyncStorage.getItem('token');
        if(token){
            return true;
        }
        return false;
    }

    return(
        <View>
            <ActivityIndicator/>
        </View>
    )
}


export default SplashScreen;