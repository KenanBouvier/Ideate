import React from "react";
import {Pressable,Text,View} from "react-native";
import styles from "./styles";

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
    let bgColor = "";

    if(type == 'yes'){//green
        bgColor = "#b3d9b4";
    }
    if(type == 'no'){
        bgColor = "#ff3366";//red
    }
    if(type=='next'){
        bgColor = '#3d426b';//dark blue
    }
    
    // const bgColor = colourMap[type];
    
    return (
        <View style={styles.container}>
            <Pressable style = {[styles.button,{backgroundColor:bgColor}]}
            onPress = {() => onPress()}>
                <Text style = {styles.text}>{content}</Text>
            </Pressable>
        </View>
    )
}

export default StyledButton;