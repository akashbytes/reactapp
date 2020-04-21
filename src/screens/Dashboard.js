import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,Button,
  Image
} from 'react-native';


import Icon from 'react-native-vector-icons/FontAwesome';


import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

export default class Dashboard extends React.Component {

    static navigationOptions = {
        title: 'Dashboard',
        headerStyle: {
          backgroundColor: '#F04444',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        // headerLeft: (
        //     <Icon name="home"  color="#fff"  style={{ width: 40, height: 40,  marginLeft: 15}} />
        //     // <Image source={require('./images/menu.png')} style={{ width: 40, height: 40,  marginLeft: 15}}   />

        //   ),

      };



   render() {
      return (
          <>
        <StatusBar barStyle="light-content" backgroundColor="#F04444" />
        <SafeAreaView > 
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView} >
            
            <View style={styles.body}>
              <View style={styles.sectionContainer}>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 20000</Text>  
                          <Text style={styles.cardText}>Total Amount</Text>  
                    </View>  
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 2000</Text>  
                          <Text style={styles.cardText}>Pending Amount</Text>  
                    </View>  
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 10000</Text>  
                          <Text style={styles.cardText}>This Month Collection</Text>  
                    </View>  
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 20000</Text>  
                          <Text style={styles.cardText}>Total Amount</Text>  
                    </View>  
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 20000</Text>  
                          <Text style={styles.cardText}>Total Amount</Text>  
                    </View>  
                    <View style={styles.Cards}>
                          <Text style={styles.cardPrice}>{'\u20B9'} 20000</Text>  
                          <Text style={styles.cardText}>Total Amount</Text>  
                    </View>  
                        

                      
                    
                </ScrollView>    

              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Section Title</Text>
                <Text style={styles.sectionDescription}>
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, <Text style={styles.highlight}>Highlight</Text> 
                </Text>
              </View>
              
              
            </View>
          </ScrollView>
        </SafeAreaView>         
        </>
      );
   }
}


const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
    //   backgroundColor: Colors.white,
    backgroundColor:'#fff',

    },
    sectionContainer: {
      marginTop: 20,
      paddingHorizontal: 15,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
    Cards:{
        height:100,
        width:200,
        borderRadius:3,
        borderWidth:0.5,
        borderColor:'#F04444',
        backgroundColor:'#fff',
        marginRight:12,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        elevation:5,
        shadowColor: '#000',
        // shadowOpacity: 1,
        // shadowOffset: { width: 10, height: 10},
        // shadowRadius: 10,

    },
    cardPrice:{
        fontSize:30,
        fontWeight:'bold',
    },
    cardText:{
        fontSize:13,
        fontWeight:'bold',
    }
  });