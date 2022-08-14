import React from "react";
import {Pressable,Text,View} from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
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
    const colourScheme = useColorScheme();

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
    else if(type=='neutral'){
        // bgColor = Colors[colourScheme].tabIconDefault;
        bgColor = '#f9f6ee'
    }
    else{
        bgColor = Colors[colourScheme].ideaBg;
    }
    return (
        <View style={[styles.container]}>
            {/* <Pressable style = {[styles.button,{backgroundColor:Colors[colourScheme].background,borderWidth:2,borderColor:Colors[colourScheme].borderColour}]} */}
            <Pressable style = {[styles.button,{backgroundColor:bgColor}]}
            onPress = {() => onPress()}>
                {/* <Text style = {[styles.text,{color:Colors[colourScheme].background}]}>{content}</Text> */}
                <Text style = {[styles.text,{color:Colors[colourScheme].background}]}>{content}</Text>
            </Pressable>
        </View>
    )
}

export default StyledButton;