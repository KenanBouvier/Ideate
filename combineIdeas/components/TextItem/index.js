import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";

const TextItem = (props)=>{
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
    
    return(
        <View style={[styles.content,{paddingTop:padding, backgroundColor:"#f7f7ff"}]}>
        {/* <View style={styles.content}> */}
            <Text style = {styles.title}>{title}</Text>
            <Text style = {styles.category}>{category}</Text>
            <Text style = {styles.description}>{description}</Text>
        </View>
    )
}
export default TextItem;