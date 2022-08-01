import { StyleSheet,SafeAreaView,ScrollView, FlatList } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IdeaItem from '../components/IdeaItem';

interface IdeaSpecificScreen{
    id:string
}

export default function IdeaSpecificScreen(props:IdeaSpecificScreen) {
    const id = props.id;
  return (
    <Text>Hello world</Text>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
