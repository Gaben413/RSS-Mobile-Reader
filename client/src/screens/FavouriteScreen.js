import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button, ScrollView, Linking, TouchableHighlight } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NewsSlot from '../components/NewsSlot';

export default function FavouriteScreen({route, navigation}){
    const {content1, content2} = route.params;

    const [data, setData] = useState([
      {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, key: 1}
    ]);
    const [displayData, setDisplayData] = useState([
      {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, key: 1}
    ]);
    
    const RSS_URL = 'https://www.raspberrypi.com/news/feed/';
  
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
  
    const [buttonText, setButtonText] = useState('Load');
    const [loadingText, setLoadingText] = useState('');
  
    const searchArray = (input) => {
      setDisplayData(
        () => {
          return data.filter(data => data.description.toLowerCase().includes(input.toLowerCase()))
        }
      );
    }
  
    const getRSS = async () => {
      //console.log(Test());
      setShow(false);
  
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
            colorIndex: 1,
            key: counter
          }
          outputData.push(objTemp)
  
          counter++;
        });
  
        //console.log(outputData)
  
        setData(outputData)
        setDisplayData(outputData)
  
        console.log(data[0].title)
        console.log(data[0].url)
        //console.log(data[0].description)
        console.log(data[0].published)
        console.log(data[0].key)
  
        setShow(true);
      })
      //setLoadingText('')
    }

    return(
      <View style={styles.container}>
        <Text>FAVOURITES</Text>
      </View>
  )
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
      paddingTop: 75,
      paddingBottom: 50,
    },
  });
  