import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'rn-fetch-blob';


import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

  const options={
    title: 'Choose Profile Pic',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose Image From Gallery',
    }
export default class Profile extends React.Component {

  constructor(props){
    super(props);
      this.state = {
          avatarSource: null,
          pic:null,
          add: 'Update',
          edit:false,
          userData : '',
          isLoading:true,
          name:'',
          email:'',
          phone : '',
          user_id:''
      }
    }
  



    static navigationOptions = {
        title: 'Profile',
        headerStyle: {
          backgroundColor: '#F04444',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };

      myfun=()=>{
        //alert('clicked');
      
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
      
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('Image Picker Error: ', response.error);
          }
          else 
          {
            let source = { uri: response.uri };
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      
            this.setState({
              avatarSource: source,
              pic:response.data
            });
          }
        });
      }

      editChange = () => {
        this._bootstrapAsync();

        this.setState({
          edit:!this.state.edit,
          isLoading:true
        })
      }

      _update = () => {
        
        this.setState({
          // addDiabled:true,
          add:'Please Wait....'
        });

          // console.log('jjjjjjjjj'+this.state.joining_date);
          // console.log('name'+this.state.name);
          // console.log('name'+this.state.name);
          // console.log('address'+this.state.address);
          // console.log('phone'+this.state.phone);
          // console.log('dob'+this.state.dob);

          RNFetchBlob.fetch('POST', 'https://adeeclinic.com/Api/update-user.php', {
            Authorization: "Bearer access-token",
            otherHeader: "foo",
            'Content-Type': 'multipart/form-data',
          }, [
              { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.pic },
              { name: 'name', data: this.state.name },
              { name: 'email', data: this.state.email },
              { name: 'phone', data: this.state.phone },
              { name: 'user_id', data: this.state.user_id },
            ]).then((resp) => {
      
                console.log(resp.data);
                    let ress = JSON.parse(resp.data);
                  if(ress.error==true){
                    this.setState({
                      // addDiabled:false,
                      add:'Update'
                    });

                    
                      Alert.alert(
                        'Error',
                        ress.msg,
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                      );
                      
                  }else{
                    this.setState({
                      // addDiabled:false,
                      add:'Update'
                    });
                    
                    Alert.alert(
                      'Success',
                      'Proflie Updated Successfully',
                      [
                        {text: 'OK', onPress: () => {
                          this._bootstrapAsync();

                          this.setState({
                            edit:!this.state.edit,
                            isLoading:true
                          })
                        }},
                      ],
                      {cancelable: false},
                    );
                    

                  }

                
              
                  
      
            }).catch((err) => {
              console.log(err);
            })
            

      }

      componentDidMount(){
        this._bootstrapAsync();

        
      }
    
      // Fetch the token from storage then navigate to our appropriate place
      _bootstrapAsync = async () => {
          const user_id = await AsyncStorage.getItem('userToken');
          this.setState({
            user_id:user_id,
          });
          fetch('https://adeeclinic.com/Api/user-data.php',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: user_id,
            })
        }).then(res => res.json())
          .then(res => {
                this.setState({
                userData: res.userData,
                isLoading:false,
                name : res.userData.name,
                email : res.userData.email,
                phone : res.userData.phone,
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
            <View style={{backgroundColor:'#fff',paddingVertical:50,elevation:1,}}>

                <View style={{backgroundColor:'#fff',height:300,marginHorizontal:50}}>
                    <Image source={{uri: this.state.userData.image }} style={{height:'100%'}} resizeMode="cover" />
                </View>
                
              </View>

              <View style={styles.sectionContainer}>
                  
                <View style={{backgroundColor:'#FE6869',paddingVertical:10,paddingHorizontal:10,borderRadius:5,elevation:1}}>
                      
                      <Text style={{fontSize:17,color:'#fff'}}>Name  : {this.state.userData.name}</Text>
                      <Text style={{fontSize:17,color:'#fff'}}>Email  : {this.state.userData.email}</Text>
                      <Text style={{fontSize:17,color:'#fff'}}>Phone : {this.state.userData.phone}</Text>
                      <Text onPress={this.editChange} style={{marginTop:10}} >
                          <Icon style={{ marginRight:15,color:'#fff', }} name={'pencil'} size={25}   />
                      </Text>
                     
                       
                </View>
                  
              </View>
                
              {this.state.edit?(
                <View>
                <View style={styles.sectionContainer}>
                <TextInput
                   placeholder="Name *"
                   onChangeText={data => this.setState({ name: data })}
                   value={this.state.name }
                  //  keyboardType = 'numeric'
                   underlineColorAndroid='transparent'
                   style={styles.TextInputStyleClass}
                 /> 
           </View>
           
           <View style={styles.sectionContainer}>
                <TextInput
                   placeholder="Email *"
                   onChangeText={data => this.setState({ email: data })}
                   value={this.state.email }

                  //  keyboardType = 'numeric'
                   underlineColorAndroid='transparent'
                   style={styles.TextInputStyleClass}
                 /> 
           </View>
           <View style={styles.sectionContainer}>
                <TextInput
                   placeholder="Phone *"
                   onChangeText={data => this.setState({ phone: data })}
                   value={this.state.phone }

                   keyboardType = 'numeric'
                   underlineColorAndroid='transparent'
                   style={styles.TextInputStyleClass}
                 /> 
           </View>
           <View style={styles.sectionContainer}>
                  {this.state.avatarSource ? <Image source={this.state.avatarSource}  style={{width:'100%',height:300}}/>:<Text></Text>}
           
           </View>
           <View style={styles.sectionContainer}>
               <TouchableOpacity style={styles.TextInputStyleClass} onPress={this.myfun}>
                       <Text style={{color:'#00000',paddingVertical:10}}>Proflie Photo  (Optional) : </Text>
               </TouchableOpacity>
             </View>
            
             
            

           <View style={styles.sectionContainer}>

                 <TouchableOpacity onPress={this._update} style={styles.addButton} ><Text style={{color:'#fff',fontSize:15}}>{this.state.add}</Text></TouchableOpacity>
             </View>  
            </View>  
            
             
              ):(<Text></Text>)}
              

                <View style={{height:50,width:'100%'}}>

                </View> 
                


              {/* <View style={styles.sectionContainer}>
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
              </View> */}
              

              


                
              
              
              
              
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
    TextInputStyleClass: {

      // textAlign: 'center',
      paddingHorizontal:10,
      marginBottom: 7,
      height: 40,
      width: '100%',
      borderWidth: 1,
      borderColor: '#F04444',
      borderRadius: 5,
    },
    addButton : {
      display: 'flex',
      height: 50,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor: '#F04444',
      shadowColor: '#F04444',
      shadowOpacity: 0.4,
      shadowOffset: { height: 10, width: 0 },
      shadowRadius: 20,
    },
  });