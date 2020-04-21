import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createSwitchNavigator,
} from 'react-navigation';

console.disableYellowBox = true;
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Example from './screens/Example';
import Login from './src/components/Login/Login';
import Otp from './src/components/Otp/Otp';
import Signup from './src/components/Signup/Signup';
import Forget from './src/components/Forget/Forget';
import Reset from './src/components/Reset/Reset';
import Splash from './src/components/Splash/Splash';

import Dashboard from './src/screens/Dashboard';
import Logout from './src/screens/Logout';
import  Accounts from './src/screens/Accounts';
import  Member from './src/screens/Member';
import  Members from './src/screens/Members';
import  Profile from './src/screens/Profile';
import  MemberDetail from './src/screens/MemberDetail';
import  AddPayment from './src/screens/AddPayment';

const AuthStack = createStackNavigator({
  // Landing: {
  //   screen: Example,
  //   navigationOptions: {
  //     headerTitle: 'Landing',
  //   },
  // },
  
  Login: {
    screen: Login,
    navigationOptions: {
      // headerTitle: 'Sign In',
      header:null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      // headerTitle: 'Sign In',
      header:null,
    },
  },
  Forget: {
    screen: Forget,
    navigationOptions: {
      headerTitle: 'Forgot Password',
      header:null,
    },
  },
  
  ResetPassword: {
    screen: Reset,
    navigationOptions: {
      headerTitle: 'Reset Password',
      header:null,

    },
  },
  
  Otp: {
    screen: Otp,
    navigationOptions: {
      headerTitle: 'Reset Password',
      header:null,

    },
  },
  
});

// const FeedStack = createStackNavigator({
//   Feed: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Feed',
//     },
//   },
//   Details: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Details',
//     },
//   },
// });

// const DashboardStack = createStackNavigator({
//   Dashboard: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Dashboard',
//       // header:null,
//     },
//   },
//   Details: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Details',
//     },
//   },
// });


// const SearchStack = createStackNavigator({
//   Search: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Search',
//     },
//   },
//   Details: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Details',
//     },
//   },
// });

// const DiscoverStack = createStackNavigator({
//   Discover: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Discover',
//     },
//   },
//   Details: {
//     screen: Example,
//     navigationOptions: {
//       headerTitle: 'Details',
//     },
//   },
// });


/**********************************************Tabs Stacks************************** */
const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      headerTitle: 'Dashboard',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});
const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});
const AccountsStack = createStackNavigator({
  Accounts: {
    screen: Accounts,
    navigationOptions: {
      headerTitle: 'Accounts',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});
const MemberStack = createStackNavigator({
  Member: {
    screen: Member,
    navigationOptions: {
      headerTitle: 'Memeber',
    },
  },
  Details: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
});

const MembersStack = createStackNavigator({
  Members: {
    screen: Members,
    navigationOptions: {
      headerTitle: 'Memebers',
      header:null,

    },
  },
  MemberDetail: {
    screen: MemberDetail,
    navigationOptions: {
      headerTitle: 'Details',
    },
  },
  AddPayment: {
    screen: AddPayment,
    navigationOptions: {
      headerTitle: 'Add Payment',
      // header:null,

    },
  },
  
});


/**********************************************End Tabs Stacks************************** */


const MainTabs = createBottomTabNavigator({
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      tabBarLabel: 'Dashboard',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="user" size={20}/>
        <Icon name="home" size={20} color={tintColor}  />

      )
    },
  },
  Members: {
    screen: MembersStack,
    navigationOptions: {
      tabBarLabel: 'Members',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="user" size={20}/>
        <Icon name="users" size={20} color={tintColor}  />

      )

    },
  },
  Member: {
    screen: MemberStack,
    navigationOptions: {
      tabBarLabel: 'Add Member',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="user" size={20}/>
        <Icon name="user-plus" size={20} color={tintColor}  />

      )
      
    },
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Proflie',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="user" size={20}/>
        <Icon name="user" size={20} color={tintColor}  />

      )
      
    },
  },
  Account: {
    screen: AccountsStack,
    navigationOptions: {
      tabBarLabel: 'Accounts',
      tabBarIcon: ({ tintColor }) => (
        // <Icon name="user" size={20}/>
        <Icon name="bank" size={20} color={tintColor}  />

      )
      
    },
  },
  
},{
  
  tabBarOptions: {
    activeTintColor: '#F04343',
    inactiveTintColor: '#263238',
    tabStyle: {  marginBottom: 5, },
    labelStyle: {
      fontSize: 12,
    },
  },
}
);

const SettingsStack = createStackNavigator({
  SettingsList: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Settings List',
    },
  },
  Profile: {
    screen: Example,
    navigationOptions: {
      headerTitle: 'Profile',
    },
  },
});

const LogoutStack = createStackNavigator({
  Logout: {
    screen: Logout,
    navigationOptions: {
      headerTitle: 'Logout',
    },
  },  
});

const MainDrawer = createDrawerNavigator({
  MainTabs: MainTabs,
  Settings: SettingsStack,
  Logout: LogoutStack,
});

const AppModalStack = createStackNavigator(
  {
    App: MainDrawer,
    // Promotion1: {
    //   screen: Example,
    // },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const App = createSwitchNavigator({
  Loading: {
    screen: Splash,
  },
  Auth: {
    screen: AuthStack,
  }, 
  App: {
    screen: AppModalStack,
  },
});

export default createAppContainer(App);