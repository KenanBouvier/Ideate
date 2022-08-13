import React from "react";
import { Text, View,StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";

interface TextItem{
    title:String;
    category:String;
    description:String;
    first:Boolean;
}


const TextItem = (props:TextItem)=>{
    /* 
    properties include:
        Title
        Category
        Description
    */
    const {title,category, description,first} = props;
    let padding = "0%";
    
    //allow parameters for the first wiki object
    if (first){
        // padding = "15%";
    }

    const colorScheme = useColorScheme();
    return(
        <View style={[styles.content,{paddingTop:padding}]}>
        {/* <View style={styles.content}> */}
            <Text style = {[styles.title,{color:Colors[colorScheme].text}]}>{title}</Text>
            <Text style = {[styles.category,{color:Colors[colorScheme].text}]}>{category}</Text>
            <Text style = {[styles.description,{color:Colors[colorScheme].text}]}>{description}</Text>
        </View>
    )
}
export default TextItem;

const styles = StyleSheet.create({
    content:{
        padding:10
    },
    title:{
        fontSize:35,
        fontWeight:'500',
    },
    category:{
        fontSize:25,
    },
    description:{
        fontSize:19.5,
    },
});