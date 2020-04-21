import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert,AsyncStorage

} from 'react-native';

import RNFetchBlob from 'rn-fetch-blob';

import { DatePickerDialog } from 'react-native-datepicker-dialog'

import moment from 'moment';

// import Icon from 'react-native-vector-icons/FontAwesome';

// import ImagePicker from 'react-native-image-picker';

import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

  // const options={
  //   title: 'Choose Profile Pic',
  //   takePhotoButtonTitle: 'Take Photo',
  //   chooseFromLibraryButtonTitle: 'Choose Image From Gallery',
  //   }

export default class AddPayment extends React.Component {

  constructor(props){
      super(props);
      this.state={
      user_data: props.navigation.state.params.userData,
      avatarSource: null,
      pic:null,
      name : '',
      address:'',
      phone:'',
      user_id:'',
      amount:'',
      duration:'',
      joining_date: '',
      DateHolder: null,
      add:'Add',

      // addDiabled:false
      }
      
    }
    static navigationOptions = {
        title: 'Member',
        headerStyle: {
          backgroundColor: '#F04444',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      };


      
    
      componentDidMount() {
        console.log('Component DID MOUNT!;',this.state.user_data);
        this._bootstrapAsync();
        

    }

  
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
        this.setState({
          user_id:userToken,
        });
         
    }

    
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

      _addPayment = () =>{
        this.setState({
          // addDiabled:true,
          add:'Please Wait....'
        });

        var data = {
          "member_id": this.state.user_data.member_id,
          "amount": this.state.amount,
          "payment_date": this.state.joining_date,
          "duration": this.state.duration
       }
       
       fetch("https://adeeclinic.com/Api/add-payment.php", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).then((response) => response.json())
              .then((responseJson) => {
                // If server response message same as Data Matched
            
                console.log('>>>>>>>>>>>>>>>',responseJson);
               if(responseJson.msg === 'Successfull')
                {
                    // this.props.navigation.navigate('Members');
                   this.setState({ add: 'Add',joining_date:'',amount:'',duration:'' });
                  console.log('>>>>>>ok');

                }
                else{
                  Alert.alert(responseJson.msg);
                   this.setState({ add: 'Add' });
   
                }

   
              }).catch((error) => {
                console.error(error);
              });

      } 

      uploadPic=()=>{
          
          this.setState({
            // addDiabled:true,
            add:'Please Wait....'
          });


            

            RNFetchBlob.fetch('POST', 'https://adeeclinic.com/Api/add-member.php', {
              Authorization: "Bearer access-token",
              otherHeader: "foo",
              'Content-Type': 'multipart/form-data',
            }, [
                { name: 'amount', data: this.state.amount },
                { name: 'duration', data: this.state.duration },
                { name: 'payment_date', data: this.state.joining_date },
                { name: 'member_id', data: this.state.user_id },
              ]).then((resp) => {
        
                  console.log(resp.data);
                      let ress = JSON.parse(resp.data);
                    if(ress.error==true){
                      this.setState({
                        // addDiabled:false,
                        add:'Add'
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
                        add:'Add'
                      });
                      
                      Alert.alert(
                        'Success',
                        'Member Added Successfully',
                        [
                          {text: 'OK', onPress: () => {
                            // console.log('Time to back an refresh the screen ');
                          }},
                        ],
                        {cancelable: false},
                      );
                    }
              }).catch((err) => {
                console.log(err);
              })
      }
      
      DatePickerMainFunctionCall = () => {

        let DateHolder = this.state.DateHolder;
    
        if(!DateHolder || DateHolder == null){
    
          DateHolder = new Date();
          this.setState({
            DateHolder: DateHolder
          });
        }
    
        //To open the dialog
        this.refs.DatePickerDialog.open({
    
          date: DateHolder,
    
        });
    
      }


      onDatePickedFunction = (date) => {
        this.setState({
          dobDate: date,
          joining_date: moment(date).format('DD-MMM-YYYY')
        });
      }

   render() {

      // console.log('>>>>>>>>>>>>>>>',this.props.navigation.state.params);

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
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Name          :    {this.state.user_data.name}</Text>
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Phone         :    {this.state.user_data.phone}</Text>
                        <Text style={{color:'#00000',fontSize:15,fontWeight:'bold'}}>Address     :     {this.state.user_data.address}</Text>
                 </View>
              </View>
              <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={this.DatePickerMainFunctionCall.bind(this)} >
                      <View style={styles.TextInputStyleClass}>
                        <Text style={{paddingVertical:10}}>Payment Date : *{this.state.joining_date}</Text>
                      </View>
                    </TouchableOpacity>
                      <DatePickerDialog ref="DatePickerDialog" onDatePicked={this.onDatePickedFunction.bind(this)} />
                </View>
              <View style={styles.sectionContainer}>
                  <TextInput
                      placeholder="Amount *"
                      onChangeText={data => this.setState({ amount: data })}
                      underlineColorAndroid='transparent'
                      keyboardType = 'numeric'
                      style={styles.TextInputStyleClass}
                    />
              </View> 
              <View style={styles.sectionContainer}>
                   <TextInput
                      placeholder="Month Duration *"
                      onChangeText={data => this.setState({ duration: data })}
                      keyboardType = 'numeric'
                      underlineColorAndroid='transparent'
                      style={styles.TextInputStyleClass}
                    /> 
              </View> 
              
               

                

                <View style={styles.sectionContainer}>
                      {this.state.avatarSource ? <Image source={this.state.avatarSource}  style={{width:'100%',height:300}}/>:<Text></Text>}
                </View>
                <View style={styles.sectionContainer}>
                    <TouchableOpacity onPress={this._addPayment} style={styles.addButton} ><Text style={{color:'#fff',fontSize:15}}>{this.state.add}</Text></TouchableOpacity>
                </View>

              <View style={{height:200,width:'100%'}}>

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
      marginTop: 10,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: '#fff',
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
    Card:{borderWidth:1,borderColor:'#F04444',padding:10,borderRadius:5}

  });