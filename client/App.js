import {SUBMIT_IP} from "@env"
import {useState} from "react"
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, TextInput, Button, ScrollView, Linking, TouchableHighlight } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import Axios from "axios";
import Icon from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/HomeScreen";
import RaspiberryScreen from "./src/screens/RaspiberryScreen";
import UbuntuScreen from "./src/screens/UbuntuScreen";
import BlenderScreen from "./src/screens/BlenderScreen";
import FavouriteScree from "./src/screens/FavouriteScreen";

import NewsSlot from './src/components/NewsSlot';
import FavouriteScreen from "./src/screens/FavouriteScreen";

const Stack = createNativeStackNavigator();

function LogoTitle(){
  return(
    <View style={styles.titleBar}>
      <Text style={styles.titleText}>RSS FEED</Text>
    </View>
  )
}

export default function App() {
  /*
  const [data, setData] = useState([
    {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', key: 1}
  ]);
  const [displayData, setDisplayData] = useState([
    {title: 'Title', url: 'URL', description: 'DESCRIPTIOMN', published: 'PUBLISHED', key: 1}
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
  */

  const submeterInformacao = (texto) => {
    Axios.post(SUBMIT_IP, {item:texto});
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'RSS FEED'}}  />

        <Stack.Screen
          name="Raspiberry"
          component={RaspiberryScreen}
          options={{
            //headerTitle: (props) => <LogoTitle{...props} /> 
            headerShown: false
          }}
          initialParams={{content1: 'Hey', content2: 'Hello!'}}
        />

        <Stack.Screen
          name="Ubuntu"
          component={UbuntuScreen}
          options={{
            //headerTitle: (props) => <LogoTitle{...props} /> 
            headerShown: false
          }}
          initialParams={{content1: 'Hey', content2: 'Hello!'}}
        />

        <Stack.Screen
          name="Blender"
          component={BlenderScreen}
          options={{
            //headerTitle: (props) => <LogoTitle{...props} /> 
            headerShown: false
          }}
          initialParams={{content1: 'Hey', content2: 'Hello!'}}
        />

        <Stack.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            //headerTitle: 'FAVOURITES' 
            headerShown: false
          }}
          initialParams={{content1: 'Hey', content2: 'Hello!'}}
        />

      </Stack.Navigator>
    </NavigationContainer>

    /*
    <View style={styles.container}>
      <StatusBar backgroundColor="#CD2355" hidden={true}/>
      <View style={styles.titleBar}>
        <Icon name='raspberry-pi' size={50} color={'#CD2355'} />

        <Text style={styles.titleText}>RASPBERRY PI - NEWS</Text>

        <View style={styles.reloadView}>
          <TouchableHighlight style={styles.reloadButton}>
            <View>
              <MaterialCommunityIcons name='reload' size={40} color={'white'}onPress={ () => getRSS()} />
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
    */
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
    paddingTop: 75,
    paddingBottom: 50,
  },
  titleBar:{
    width: '100%',
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
  mapView:{
    margin: 5,
    borderWidth: 5,
    borderRadius: 15,
    padding: 5,
    borderColor: '#CD2355',
    backgroundColor: 'white',
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
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  searchTitle:{
    textAlignVertical: 'center',
  },
  articleText:{
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
