import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from '../Themed';


interface ListItem{
    title1:String,
    title2:String,
    description:String,
}

const ListItem = (props:ListItem)=>{
    const {title1, title2, description} = props;
    return(
        <View style={styles.container}>
            {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
            <View style={styles.ideaContainer}>
            <View style={styles.articleTitles}>
                <Text style={styles.titles}>{title1}{" + "}{title2}</Text>
            </View>
            <Text style = {styles.ideaContent}>{description}</Text>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        </View>
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