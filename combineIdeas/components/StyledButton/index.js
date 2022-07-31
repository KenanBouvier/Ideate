import React from "react";
import {Pressable,Text,View} from "react-native";
import styles from "./styles";

/*
    For this component you can set the button type and will make the colour the corresponding value of the key in the map colourMap
*/

const StyledButton = (props)=>{
    const {type, content, onPress} = props;
    let colourMap = {
        "yes":"#b3d9b4",//green
        "no":"#ff3366", //red
        "next":"#3d426b",//dark blue
    }
    const bgColor = colourMap[type];
    
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