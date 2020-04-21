import React from 'react';
import { StyleSheet, Text, View,Button, AsyncStorage,ActivityIndicator} from 'react-native';

export default class Logout extends React.Component {


      
   componentDidMount() {
      
      this._signOutAsync();
    }

   _signOutAsync = async () => {
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    };

   render() {
      return (
         <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});