import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';

export default function App() {

  let Parser = require('rss-parser')
  let parse = new Parser();
  
  const RSS_URL = 'https://www.raspberrypi.com/news/feed/';

  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput 
          placeholder="Link"
          style={styles.textinput}
          onChangeText={setSearch}
          keyboardType='url'
        />

        <Button 
          title="SEARCH"
          onPress={
            () => {
              Alert.alert('SEARCHING FOR ' + search)
            }
          }
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  search: {
    flexDirection: 'row',
    padding: 15,
  },
  textinput:{
    borderWidth: 2,
    borderColor: 'black',
    width: '75%',
    paddingLeft: 5,
    marginRight: 15,
  },
});
