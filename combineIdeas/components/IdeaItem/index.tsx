import React from 'react';
import { Pressable, StyleSheet } from "react-native";
import {Text,View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

interface IdeaItem{
   idea:{
        id:string,
        title1:string,
        title2:string,
        description:string,
        summary:string,
        createdAt:string,
    }
}

const IdeaItem = (props:IdeaItem)=>{
    const {title1,title2,description,summary } = props.idea;
    const navigation = useNavigation();

    const onPress = ()=>{
      navigation.navigate('IdeaSpecificScreen',props.idea);
      // feed in parameters also when navigating
    }

    const colorScheme = useColorScheme();
    return(
        <Pressable onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.ideaContainer}>
                <View style={styles.articleTitles}>
                    <Text style={[styles.titles,{color:Colors[colorScheme].text}]}>{title1}{" + "}{title2}</Text>
                </View>
                {/* Just showing the summary to not overload ideas screen and give enough info to user */}
                <Text style = {[styles.ideaContent,{color:Colors[colorScheme].text}]}>{summary}</Text>
                </View>
                <View style={[styles.separator,{backgroundColor:Colors[colorScheme].text}]} />
            </View>
        </Pressable>
    )
}
export default IdeaItem;

const styles = StyleSheet.create({
  container: {
    // backgroundColor:"#f7f7ff",
  },
  articleTitles:{
    flexDirection:"row",
    // backgroundColor:"#f7f7ff",
    justifyContent:'center',
  },
  ideaContainer:{
    // backgroundColor:"#f7f7ff",    
  },
  titles:{
    fontSize:23,
    fontWeight:'600',
  },
  ideaContent:{
    fontSize:15,
  },
  separator: {
    opacity:0.25,
    marginVertical: 20,
    // marginHorizontal:30,
    height: 1.2,
    width:'100%',
  },
});