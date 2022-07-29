import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import StyledButton from "../StyledButton";

const TextItem = (props)=>{
    /* 
    properties include:
        Title
        Category
        Description
    */
    const {title,category, description} = props;
    return(
        <View style = {styles.container}>
            <View style={styles.content}>
                <Text style = {styles.title}>{title}</Text>
                <Text style = {styles.category}>{category}</Text>
                <Text style = {styles.description}>{description}</Text>
            </View>

            <View>
                <StyledButton 
                type={"next"} 
                content={"Next"}
                onPress={()=>{
                    console.warn("Moving to next...");
                }}
                />

                <StyledButton 
                type={"yes"} 
                content={"Yes"}
                onPress={()=>{
                    console.warn("You see an idea here!");
                }}
                />

                {/* <StyledButton 
                type={"no"} 
                content={"No"}
                onPress={()=>{
                    console.warn("You don't see an idea here!");
                }}
                /> */}
            </View>
        </View>
    )
}
export default TextItem;