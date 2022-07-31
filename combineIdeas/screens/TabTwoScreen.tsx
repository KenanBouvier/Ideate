import { StyleSheet,ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IdeaList from '../components/IdeaList';


export default function TabTwoScreen() {
  const inp = {
        id:"1",
        title1:"First title",
        title2:"Second title",
        description:"THis is description",
    }
  return (
    <ScrollView style={styles.container}>
      <View>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
        <IdeaList idea={inp}></IdeaList>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f7f7ff",
    // flex: 1,
    padding:20,
  },
});
