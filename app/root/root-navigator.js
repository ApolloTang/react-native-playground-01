import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import Screen_login from '../containers/login/';
import Screen_dashboard from '../containers/dashboard/';
import Screen_collections from '../containers/collections/';
import Screen_settings from '../containers/settings/';
import Screen_details from '../containers/details/';


const navigatorMap_tab = {
  Dashboard: { screen: Screen_dashboard },
  Collections: { screen: Screen_collections },
  Settings: { screen: Screen_settings },
  // dashboard: { screen: Screen_dashboard },
  // collections: { screen: Screen_collections },
  // setting: { screen: Screen_setting },
};
const Navigator_tab = TabNavigator( navigatorMap_tab );


const navigatorMap_root = {
  Login: {screen: Screen_login},
  // ScreenA: { screen: ScreenA },
  Tabs: { 
    screen: Navigator_tab,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Details: {screen: Screen_details},
  // loggedIn: { screen: ScreenB },
  // projectdetains: { screen: ScreenA },
};

const navigatorMap_options = {
  initialRouteName: 'Login',
};

const Navigator_root = StackNavigator( navigatorMap_root, navigatorMap_options );

export default Navigator_root;
export { Navigator_tab };


// export {AppNavigator as default} from '../modules/log-in-out/navigators/AppNavigator';

