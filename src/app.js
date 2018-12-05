import { Navigation } from 'react-native-navigation';
import { AsyncStorage } from 'react-native';
import Feed from './components/Feed';
import Login from './screens/Login';
import DrawerMenu from './screens/DrawerMenu';
import Screen2 from './screens/Screen2';
import Home from './screens/Home';

export default () => {
  /* INSTALURA
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('PerfilUsuario', () => Feed);
  
  AsyncStorage.getItem('token')
    .then(token => {
      //console.warn('token=>', token)
      if(token) {
        return {
          screen: 'Feed',
          title: 'Instalura',
        };
      }

      return {
        screen: 'Login',
        title: 'Login',
      };
    })
    .then(screen => Navigation.startSingleScreenApp({screen}));
    */

   /* TAB Navigation
   Navigation.registerComponent('DrawerMenu', () => DrawerMenu);
   Navigation.registerComponent('Screen2', () => Screen2);
   Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'One',
        screen: 'DrawerMenu',
        icon: require('../resources/img/icon1.png'),
        selectedIcon: require('../resources/img/icon1_selected.png'),
        title: 'Screen One'
      },
      {
        label: 'Two',
        screen: 'Screen2',
        icon: require('../resources/img/icon2.png'),
        selectedIcon: require('../resources/img/icon2_selected.png'),
        title: 'Screen Two'
      }
    ]
  });
  */

  /** DRAWER NAVIGATION */
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('PerfilUsuario', () => Feed);

 Navigation.registerComponent('DrawerMenu', () => DrawerMenu);
 Navigation.registerComponent('Screen2', () => Screen2);
 Navigation.registerComponent('Home', () => Home);

 AsyncStorage.getItem('token')
    .then(token => {
      if(token) {
        return 'Feed';
      }else{
        return 'Login';
      }
    }
  ).then(screenHome => {
    Navigation.startSingleScreenApp({
     screen: {
         screen: screenHome, // unique ID registered with Navigation.registerScreen
         title: 'Home'//, // title of the screen as appears in the nav bar (optional)
         //navigatorStyle: {}, // override the navigator style for the screen, see "Styling the navigator" below (optional)
         //navigatorButtons: {} // override the nav buttons for the screen, see "Adding buttons to the navigator" below (optional)
     },
     drawer: {
         // optional, add this if you want a side menu drawer in your app
         left: {
             // optional, define if you want a drawer from the left
             screen: 'DrawerMenu'//, // unique ID registered with Navigation.registerScreen
             //passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
             //disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
             //fixedWidth: 500 // a fixed width you want your left drawer to have (optional)
         },
         style: {
             // ( iOS only )
             drawerShadow: false//, // optional, add this if you want a side menu drawer shadow
             //contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
             //leftDrawerWidth: 50, // optional, add this if you want a define left drawer width (50=percent)
             //rightDrawerWidth: 50 // optional, add this if you want a define right drawer width (50=percent)
         },
         type: 'TheSideBar', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
         animationType: 'slide', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
         // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
         disableOpenGesture: false // optional, can the drawer, both right and left, be opened with a swipe instead of button
     },
     passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
     animationType: 'slide-down', // optional, add transition animation to root change: 'none', 'slide-down', 'fade'
     appStyle: {
       orientation: 'portrait',
       hideBackButtonTitle: true
     }
   });
  });
 




};