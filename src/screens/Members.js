import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,ActivityIndicator,
  FlatList,
  Image,
  Button,
  Alert,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';
import { RotationGestureHandler } from 'react-native-gesture-handler';

export default class SearchMember extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          loading: false,
          data: [],
          filter: [],

          isLoading: true,
          refreshing: false,
          text:''
        };
        this.arrayholder = [];
        this.getMembersData();
      }

    //   static navigationOptions  = ({navigation})=>{
    //     return {
    //         headerRight: (
    //           <Icon style={{ marginRight:15,color:'#fff' }} name={'search'} size={25}  onPress={() => navigation.navigate('SearchMember')}  />
    //         ),
    //         headerTitle: (
    //             <View style={{flex:1}}>
    //                 <Text>
    //                     SearchMember
    //                 </Text>
    //             </View>
    //         ),
    //         headerTintColor: '#fff',
    //       headerStyle: {
    //         backgroundColor: '#F04444',
    //       },
    //         headerLeft:null
    //     }
    // }


    // static navigationOptions = {
    //     title: 'Members',
    //     headerStyle: {
    //       backgroundColor: '#F04444',
    //     },
    //     headerTintColor: '#fff',
    //     headerTitleStyle: {
    //       fontWeight: 'bold',
    //     },
    //     headerRight: <Icon style={{ marginRight:15,color:'#fff' }} name={'search'} size={25}  onPress={() => this.props.navigation.navigate('SearchMember')}  />
    
    //   };

    clearSearch = () =>{
      this.setState({
        text:'',
        filter:this.state.data
      })
    }
      goToSearch = () => {
        Alert.alert(
          'Delete Confirm  ',
          'Are you sure to deete this member',
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
              },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => console.log('hi........')},
          ],
          {cancelable: false},
        );

        // return;

      }


      componentDidMount() {
        const { navigation } = this.props
        // console.log('pppppp',navigation);
    }

    SearchFilterFunction(text){
        // this.setState({
        //   text:text
        // });
        

      if(text=='' || text==' '){
        this.setState({
          filter:this.state.data,
          text:text
        });
      }else{
        this.setState({
          filter:[]
        });
        const newData = this.state.filter.filter(function(item){
            const itemData = item.name.toUpperCase()
            const textData = text.toUpperCase()
            // console.log('>>>>>>>>'+itemData);
            return itemData.indexOf(textData) > -1
        })
        // JSON.stringify(newData); 
        console.log('sssssssssssssssss'+JSON.stringify(newData));
        this.setState({
            filter: newData,
            text: text
        })
      }

      





    }
      getMembersData = () => {
        this.setState({
          isLoading:true,
        });
        fetch('https://adeeclinic.com/Api/members.php',{
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id: 1,
          })
      }).then(res => res.json())
        .then(res => {
              this.setState({
              data: res.userData,
              filter:res.userData,
              isLoading:false,
            });
            console.log('Server response :- \n', this.state.data);
          })
        .catch(error => {
            console.log('Error from server :- \n', error);
        });
      }

      deleteMember = (member_id) =>{

        Alert.alert(
          'Delete Confirm ?',
          'Are you sure to delete this member',
          [
            {
              text: 'Cancel',
              onPress: () => {
                console.log('Cancel Pressed')
              },
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {

                      this.setState({
                        isLoading:true,
                      });
                      fetch('https://adeeclinic.com/Api/delete-member.php',{
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            member_id: member_id,
                        })
                    }).then(res => res.json())
                      .then(res => {
                      this.getMembersData();
              
                          //   this.setState({
                          //   data: res.userData,
                          //   isLoading:false,
                          // // });
                          console.log('Server response :- \n', this.state.data);
                        })
                      .catch(error => {
                          console.log('Error from server :- \n', error);
                      });
            }},
          ],
          {cancelable: false},
        );

        // return;



      }

   render() {
        if (this.state.isLoading) {
          return (
            <View style={{flex: 1, paddingTop: 20,justifyContent:'center',}}>
              <ActivityIndicator  color="#F04444"  />
               <View>
                 <Text style={{alignSelf:'center',fontSize:15,color:'#F04444'}}>Please Wait....</Text>
               </View> 
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
                  <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                      <Icon style={{ marginRight:15,color:'#F04444' }} name={'search'} size={25}    />
                  </View>
                  <View style={{flex:8}}>
  
                      <TextInput 
                        autoCapitalize="none"
                        placeholder="Search....."
                        placeholderTextColor='#00000'
                         onChangeText={(text) => this.SearchFilterFunction(text)}
                        value={this.state.text}
                      />

                  </View>
                  <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
        
                      {this.state.text.length>0 ? <Icon style={{ marginRight:15,color:'#F04444' }} onPress={this.clearSearch} name={'remove'} size={25}  />:<Text></Text>}
                  </View>


              </View>
              

              <FlatList
                  data={this.state.filter}
                  onRefresh={() => this.getMembersData()}
                  refreshing={this.state.isLoading}
                  renderItem={({ item }) => 
                  <View style={styles.sectionContainer}  >
                    <View style={styles.memberImage}>
                    <Image   source={{ uri: item.image }} style={{width: '100%', height: 100, borderRadius: 100/2}} />  
                    </View>
                    <View style={styles.memberData}>
                      <Text style={styles.userDesc}>Name  : {item.name} </Text>
                      <Text style={styles.userDesc}>Phone  : {item.phone} </Text>
                      <Text style={styles.userDesc}>Joining Date  : {item.date_joining} </Text>
                      <View style={{flexDirection:'row'}}>
                          <View style={{flex:1,paddingHorizontal:5}}>
                              <Button title="View" color="#2EAF57" onPress={() => this.props.navigation.navigate('MemberDetail',{userData: item})} ></Button>

                          </View>
                          <View style={{flex:1,paddingHorizontal:5}}>
                          
                                <Button title="Remove" color="#F04444" onPress={() => this.deleteMember(item.member_id)}   ></Button>

                          </View>

                      </View>
                    </View>
                </View>
                }
                  keyExtractor={item => item.user_id}
                />


              
              


              
              
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
      marginTop: 12,
      paddingHorizontal: 5,
      borderColor:'red',
      borderBottomWidth:1,
      marginHorizontal:10,
      marginVertical:5,
      paddingVertical:5,
      borderRadius:2,
      flexDirection:'row'
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#fff',
    },
    sectionDescription: {
      marginTop: 8,
      // fontSize: 18,
      // fontWeight: '400',
      // color: Colors.dark,
      paddingBottom:8,
    },
    userDesc:{
      fontSize:16,
      textAlign:'left',
      marginVertical:1
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
    memberData:{
      height:100,
      width:'75%',
      paddingLeft:10

    },
    memberImage:{
      height:100,
      width:'25%',
    }
  });