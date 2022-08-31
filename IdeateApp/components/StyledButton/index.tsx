import React from "react";
import {StyleSheet, Pressable,Text,View} from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

/*
    For this component you can set the button type and will make the colour the corresponding value of the key in the map colourMap
*/

interface StyledButton{
    type:string;
    content:string;
    onPress:()=>void;
}

const StyledButton = (props:StyledButton)=>{
    const {type, content, onPress} = props;
    const colourScheme = useColorScheme();
    let txtSize = 20;
    let txtColor = Colors[colourScheme].background;
    let bgColor = "";
    if(type == 'yes'){//green
        bgColor = "#b3d9b4";
    }
    else if(type == 'no'){
        bgColor = "#ff3366";//red
    }
    else if(type=='next'){
        bgColor = '#3d426b';//dark blue
    }
    else if(type=='transparent'){
        txtColor = Colors[colourScheme].ideaBg;
        bgColor = Colors[colourScheme].background;
        txtSize=15;
    }
    else{
        bgColor = Colors[colourScheme].ideaBg;
    }
    
    const styles = StyleSheet.create({
        button:{
            justifyContent: 'center',
            alignItems:'center',
            height:40,
            borderRadius:20
        },
        container:{
            padding:8,
        },
        text:{
            fontSize:txtSize,
            fontWeight:'400',
        }
    });
    return (
        <View style={[styles.container]}>
            <Pressable style = {[styles.button,{backgroundColor:bgColor}]}
            onPress = {() => onPress()}>
                <Text style = {[styles.text,{color:txtColor}]}>{content}</Text>
            </Pressable>
        </View>
    )
}

export default StyledButton;
