import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button, ScrollView, Linking, TouchableHighlight } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import NewsSlot from '../components/NewsSlot';

export default function RaspiberryScreen({route, navigation}){
    const {content1, content2} = route.params;

    const [data, setData] = useState([
      {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, show: true, key: 1}
    ]);
    const [displayData, setDisplayData] = useState([
      {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', colorIndex: 1, show: true, key: 1}
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
          console.log(`ID: ${element}`)
          objTemp = {
            title: element.title,
            url: element.links[0].url,
            description: ParseDescription(element.description),
            published: element.published,
            show: true,
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
        <StatusBar backgroundColor="#CD2355" hidden={true}/>
        <View style={styles.titleBar}>
          <View style={styles.reloadView}>
            <TouchableHighlight style={styles.reloadButton}>
              <View>
                <MaterialCommunityIcons name='arrow-left-bold-circle' size={40} color={'white'} onPress={ () => navigation.goBack()} />
              </View>
            </TouchableHighlight>
          </View>

          <Icon name='raspberry-pi' size={50} color={'#CD2355'} />

          <Text style={styles.titleText}>RASPBERRY PI - NEWS</Text>

          <View style={styles.reloadView}>
            <TouchableHighlight style={styles.reloadButton}>
              <View>
                <MaterialCommunityIcons name='reload' size={40} color={'white'} onPress={ () => getRSS()} />
              </View>
            </TouchableHighlight>
          </View>
            
          </View>

            <View style={styles.search}>
              <Text style={styles.searchTitle}>Search: </Text>
              <TextInput 
                placeholder="Search"
                style={styles.textinput}
                onChangeText={(newText) => {
                  setSearch(newText)
                
                  if(data.length <= 1 && data[0].title == "Title") return;

                  console.log(`NEW TEXT: ${newText} |  ${newText.trim().length}\nSEARCH TEXT: ${search} | ${search.trim().length}`)
                  if(newText.trim().length == 0){
                    //getRSS();
                    setDisplayData(data)
                    console.log(`Area is empty! ${newText.trim().length}`)
                    return;
                  }

                  //Alert.alert('SEARCHING FOR ' + search.trim());
                  searchArray(newText.trim())
                }}
                value={search}
              />
            </View>

            <View>
              <ScrollView style={show ? styles.scrollViewGrey : styles.scrollViewWhite}>
                {
                  show ?
                  displayData.map(
                    (item) => {
                      return (
                        <NewsSlot data={item} key={item.key} />
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
    titleBar:{
      width: '95%',
      height: 55,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    search: {
      width: '100%',
      flexDirection: 'row',
      alignContent: 'space-between',
      padding: 15,
      borderTopWidth: 2,
    },
    textinput:{
      borderWidth: 2,
      borderColor: 'black',
      width: '75%',
      paddingLeft: 5,
      marginRight: 15,
    },
    scrollViewGrey:{
      backgroundColor: '#dddddd',
    },
    scrollViewWhite:{
      backgroundColor: 'white',
    },
    titleText:{
      fontSize: 17,
      fontWeight: 'bold',
    },
    searchTitle:{
      textAlignVertical: 'center',
    },
    reloadView:{
      height: '100%'
    },
    reloadButton:{
      backgroundColor: '#CD2355',
      height: 55,
      width:55,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    }
  });
  