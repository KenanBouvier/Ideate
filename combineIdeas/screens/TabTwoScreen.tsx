import { StyleSheet,ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import IdeaList from '../components/IdeaList';


export default function TabTwoScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>

        <IdeaList title1={"First Title"} title2={"Second Title"} description={"Here is the idea content describing how these two ideas can be incorporated together in to one solution"}></IdeaList>

        <IdeaList title1={"This is the first Title"} title2={"Also another Title that wraps"} description={"Some more description! whoah this is so cool"}></IdeaList>

        <IdeaList title1={"Solar panels with"} title2={"Also another Title"} description={"Some more description! whoah this is so cool"}></IdeaList>

        <IdeaList title1={"Another Title"} title2={"Also another Title"} description={"Some more description! whoah this is so cool"}></IdeaList>

        <IdeaList title1={"Another Title"} title2={"Also another Title"} description={"Some more description! whoah this is so cool"}></IdeaList>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#f7f7ff",
    flex: 1,
    padding:20,
  },
});
