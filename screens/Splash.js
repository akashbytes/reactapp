/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment,Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  Animated,
  Alert

} from 'react-native';


import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

class ImageLoader extends Component {
  state = {
    opacity: new Animated.Value(0),
  }

  onLoad = () => {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <Animated.Image
        onLoad={this.onLoad}
        {...this.props}
        style={[
          {
            opacity: this.state.opacity,
            transform: [
              {
                scale: this.state.opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                })
              },
            ],
          },
          this.props.style,
        ]}
      />
    );
  }
}
 class Splash extends Component  {


    componentDidMount(){
      setTimeout(() => {
        this.props.navigation.navigate("Auth"); 
        // Alert.alert(
        //   'Alert Title',
        //   'My Alert Msg',
        //   [
        //     {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        //     {
        //       text: 'Cancel',
        //       onPress: () => console.log('Cancel Pressed'),
        //       style: 'cancel',
        //     },
        //     {text: 'OK', onPress: () => console.log('OK Pressed')},
        //   ],
        //   {cancelable: false},
        // );

      },3000);
    }


  render(){

    return (  
            <Fragment>
              <StatusBar  barStyle="light-content" hidden = {false} backgroundColor = "#F04343"  />
                
                <View style={styles.container}>
                    <ImageLoader
                      style={styles.image}
                      // source={{ uri: 'https://images.unsplash.com/photo-1485832329521-e944d75fa65e?auto=format&fit=crop&w=1000&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D' }}
                      source={require('../images/logo.png')}
                      resizeMode="contain"
                    />
                  </View>
            </Fragment>
            
    );
  }
 
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F04343',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },  
  image: {
    width: 200,
    height: 200,
  },
});

export default Splash;
