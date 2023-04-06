import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button, ScrollView, Linking } from 'react-native';
import * as rssParser from 'react-native-rss-parser'

export default function App() {
  const [data, setData] = useState([
    {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', key: 1}
  ]);
  
  const RSS_URL = 'https://www.raspberrypi.com/news/feed/';

  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  const [buttonText, setButtonText] = useState('Load');
  const [loadingText, setLoadingText] = useState('');

  const searchArray = (input) => {
    setData(
      (thisData) => {
        return thisData.filter(data => data.description.toLowerCase().includes(input.toLowerCase()))
      }
    );
  }

  const getRSS = async () => {
    //console.log(Test());
    setLoadingText('Loading')
    setButtonText('Reload')
    setSearch('');

    await fetch(RSS_URL).then((response) => response.text())
    .then((responseData) => rssParser.parse(responseData))
    .then((rss) => {
      console.log(rss.title);

      let outputData = []
      let counter = 1;
      rss.items.forEach(element => {
        objTemp = {
          title: element.title,
          url: element.links[0].url,
          description: ParseDescription(element.description),
          published: element.published,
          key: counter
        }
        outputData.push(objTemp)

        counter++;
      });

      //console.log(outputData)

      setData(outputData)

      console.log(data[0].title)
      console.log(data[0].url)
      //console.log(data[0].description)
      console.log(data[0].published)
      console.log(data[0].key)

      setShow(true);
    })
    //setLoadingText('')
  }

  return (
    <View style={styles.container}>
      <View>
        <Button

          title={buttonText}
          onPress={() => { 
            getRSS()
          }
          }
        />
      </View>
      <View style={styles.search}>
        <TextInput 
          placeholder="Link"
          style={styles.textinput}
          onChangeText={setSearch}
          keyboardType='url'
          value={search}
        />

        <Button 
          title="SEARCH"
          onPress={
            () => {
              if(search.trim().length == 0){
                getRSS();
                return;
              }
              Alert.alert('SEARCHING FOR ' + search.trim());
              searchArray(search.trim())
            }
          }
        />
      </View>

      <View>
        <ScrollView>
          {
            show ?
              data.map(
                (item) => {
                  return (
                    <View style={styles.mapView} key={item.key}>
                      <Text style={styles.titleText}>{item.title}</Text>
                      <Text>{item.description}</Text>
                      <Text 
                        style={styles.link}
                        onPress={() => {
                          Linking.openURL(item.url)
                        }}
                      >{item.url}</Text>
                      <Text style={styles.timeText}>{item.published}</Text>
                    </View>
                  )
                }
              )
              :
              <View>
                <Text>{loadingText}</Text>
              </View>
          }
        </ScrollView>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

function ParseDescription(input){
  let output = '';

  let charArray = input.split('');
  let go = false;

  for (let index = 0; index < charArray.length; index++) {
    if(go && charArray[index] != '<'){
      output += charArray[index] ;
    }else if(go && charArray[index]  == '<'){
      break;
    }

    if(charArray[index]  == '>')
      go = true;
  }

  return output;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingBottom: 50,
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
  mapView:{
    margin: 5,
    borderWidth: 5,
    borderRadius: 15,
    padding: 5,
  },
  titleText:{
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link:{
    color: 'dodgerblue',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  timeText:{
    textAlign: 'right',
    fontSize: 10,
  }
});
