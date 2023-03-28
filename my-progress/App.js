import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button } from 'react-native';

export default function App() {

  const [link, setLink] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput 
          placeholder="Link"
          style={styles.textinput}
          onChangeText={setLink}
          keyboardType='url'
        />

        <Button 
          title="FETCH"
          onPress={
            () => {
              Alert.alert('Fetch RSS ' + link)
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
