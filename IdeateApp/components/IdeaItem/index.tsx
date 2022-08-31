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
    const {title1,title2,description,summary,createdAt } = props.idea;
    const navigation = useNavigation();

    const onPress = ()=>{
      navigation.navigate('IdeaSpecificScreen',props.idea);
      // feed in parameters also when navigating
    }

    const colorScheme = useColorScheme();
    return(
      <View style = {[styles.container,{backgroundColor:Colors[colorScheme].ideaBg}]}>
        <Pressable onPress={onPress}>
            <View>
                <View style={styles.ideaContainer}>
                  {/* for date */}
                  <View> 
                    <Text style = {[styles.titles,{fontSize:13,alignSelf:'flex-end'}]}>{createdAt.slice(0,10)} 
                    </Text>
                  </View>
                  <View style={styles.articleTitles}>
                      <Text style={[styles.titles,{color:Colors[colorScheme].text}]}>{title1}{" + "}{title2}</Text>
                  </View>
                  {/* Just showing the summary to not overload ideas screen and give enough info to user */}
                  <Text style = {[styles.ideaContent,{color:Colors[colorScheme].text}]}>{summary}</Text>
                </View>
                {/* <View style={[styles.separator,{backgroundColor:Colors[colorScheme].text}]} /> */}
            </View>
        </Pressable>
      </View>
    )
}
export default IdeaItem;

const styles = StyleSheet.create({
  container: {
    borderRadius:10,
    margin:10,
    // padding:20,
    paddingHorizontal:20,
    paddingTop:7,
    paddingBottom:20,
    elevation:10,
  },
  articleTitles:{
    flexDirection:"row",
    paddingBottom:5,
  },
  ideaContainer:{
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
    height: 1.2,
    width:'100%',
  },
});