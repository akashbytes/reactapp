import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class MemberDetail extends React.Component {

  // this.props.navigation.getParam
  constructor(props) {
    super(props)
    this.state = {
      user_data: props.navigation.state.params.userData,

      loading: false,
      data: [],

      isLoading: true,
      refreshing: false,
      member_id : ''
    };
  }

    


    static navigationOptions = {
        title: 'MemberDetail',
        headerStyle: {
          backgroundColor: '#F04444',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

      componentDidMount() {
        console.log('Component DID MOUNT!;',this.state.user_data.member_id)
        
          fetch('https://adeeclinic.com/Api/members-data.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                member_id: this.state.user_data.member_id,
            })
        }).then(res => res.json())
          .then(res => {
                this.setState({
                data: res.memberData,
                isLoading:false,
              });
              console.log('Server response :- \n', res);
            })
          .catch(error => {
              console.log('Error from server :- \n', error);
          });


         
     }
      
        




   render() {


      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }

      
      return (
          <>
        <StatusBar barStyle="light-content" backgroundColor="#F04444" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                 <View style={{height:300,paddingBottom:10}}>
                    <Image   source={{uri:this.state.user_data.image}} style={{width: '100%', height: '100%'}} resizeMode="center" />  
                 </View> 
                 <View style={styles.Card}>
                        
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Name          : {this.state.user_data.name}</Text>
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Phone         : {this.state.user_data.phone}</Text>
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Address     : {this.state.user_data.address}</Text>
                        
                 </View>

                    
              </View>
            
            <View style={styles.sectionContainer}>
            <View style={{padding:10,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',borderTopLeftRadius:5,borderTopRightRadius:5,borderColor:'red',borderWidth:1}}>

                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                      <Text>Amount</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                      
                      <Text>Duration</Text>
                </View>
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                     <Text>Payment Date</Text> 
                </View>
                <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                     <Text>Validity</Text> 
                     
                </View>
            </View>


            <FlatList
                  data={this.state.data}
                  onRefresh={() => this.getMembersData()}
                  refreshing={this.state.isLoading}
                  renderItem={({ item }) => 

                    <View style={{padding:10,flexDirection:'row',borderBottomWidth:1}}>

                      
                          <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                <Text> {'\u20B9'} {item.amount}</Text>
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                                
                                <Text>{item.duration} Months </Text>
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                              <Text>{item.payment_date}</Text> 
                          </View>
                          <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                              <Text>{item.due_date}</Text> 
                              
                          </View>
                      
                      
                    </View>

                }
                  keyExtractor={item => item.user_id}
                />
                <View style={{padding:10,flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center',}}>

                  <View style={{flex:2,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                  </View>
                    
                  
                    <View style={{flex:1,justifyContent:'center'}}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('AddPayment',{userData: this.state.user_data})}  style={{borderColor:'#F04444',borderWidth:1,paddingVertical:10,borderRadius:2,paddingHorizontal:10,backgroundColor:'#F04444',color:'#fff'}}>
                          <Text style={{color:'#fff',fontWeight:'bold'}}>
                          <Icon style={{ color:'#fff' }} name={'plus'} size={15}   />Add Payment</Text> 
                        </TouchableOpacity>
                        
                    </View>
                    
                    
                  </View>

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
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
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
    Card:{borderWidth:1,borderColor:'#F04444',padding:10,borderRadius:5}
  });