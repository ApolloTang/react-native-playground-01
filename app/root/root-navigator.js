import {
  StackNavigator,
  TabNavigator
} from 'react-navigation';

import Screen_login from '../containers/login/';
import Screen_dashboard from '../containers/dashboard/';
import Screen_collections from '../containers/collections/';
import Screen_settings from '../containers/settings/';
import Screen_details from '../containers/details/';

import Screen_lab_01 from '../containers/lab-01-tiles-n-layout-change/';

const navigatorMap_tab = {
  Dashboard: { screen: Screen_dashboard },
  Collections: { screen: Screen_collections },
  Settings: { screen: Screen_settings },
};
const Navigator_tab = TabNavigator( navigatorMap_tab );


const navigatorMap_root = {
  Lab: { screen: Screen_lab_01 },
  Login: {screen: Screen_login},
  Tabs: {
    screen: Navigator_tab,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Details: {screen: Screen_details},
};

const navigatorMap_options = {
  // initialRouteName: 'Lab', // initial route is set in reducer
  // initialRouteName: 'Login',
};

const Navigator_root = StackNavigator( navigatorMap_root, navigatorMap_options );

export default Navigator_root;
export { Navigator_tab };


// export {AppNavigator as default} from '../modules/log-in-out/navigators/AppNavigator';

