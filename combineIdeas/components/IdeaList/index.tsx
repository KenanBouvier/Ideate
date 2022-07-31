import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

interface ListItem{
    idea:{
        id:string,
        title1:string,
        title2:string,
        description:string,
    }
}

const ListItem = (props:ListItem)=>{
    const {idea} = props;
    const {title1,title2,description } = idea;

    const onPress = ()=>{
        console.warn(`open Idea ${idea.title1}`)
    }

    return(
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.ideaContainer}>
                <View style={styles.articleTitles}>
                    <Text style={styles.titles}>{title1}{" + "}{title2}</Text>
                </View>
                <Text style = {styles.ideaContent}>{description}</Text>
                </View>
                <View style={styles.separator} />
            </View>
        </Pressable>
    )
}
export default ListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f7f7ff",
  },
  articleTitles:{
    flexDirection:"row",
    backgroundColor:"#f7f7ff",
    justifyContent:'center',
  },
  ideaContainer:{
    backgroundColor:"#f7f7ff",    
  },
  titles:{
    fontSize:23,
    fontWeight:'600',
    color:'#495867',
  },
  ideaContent:{
    color:'#495867',
    fontSize:15,
  },
  separator: {
    opacity:0.25,
    backgroundColor:'#495867',
    marginVertical: 20,
    height: 1,
    width:'100%',
  },
});