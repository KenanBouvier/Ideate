import { StatusBar } from 'expo-status-bar';
import { StyleSheet , View } from 'react-native';
import data from './components/data';

// own imports here
import TextItem from './components/TextItem';

export default function App() {
  return (
    <View style={styles.container}>

      <TextItem title={data[0].title} category={data[0].category} description={data[0].description} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:"#efefef",
    backgroundColor:"#f7f7ff",
    alignItems: 'center',
    justifyContent: 'center',
  },
});
