/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, View, SafeAreaView, Alert} from 'react-native';
import Index from './src/index';
import color from './src/appConfig/color';
import commonStyle from './src/appConfig/commonStyle';
import firebase from 'react-native-firebase';

// pushNotifications.configure();

class App extends Component {
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  // async getToken() {

  //   let fcmToken = await firebase.messaging().getToken();
  //   if (fcmToken) {
  //     // user has a device token
  //     console.log('fcmToken:', fcmToken);
  //     // await AsyncStorage.setItem('fcmToken', fcmToken);
  //   }
  //   // }
  //   console.log('fcmToken:', fcmToken);
  // }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const {title, body} = notification;
        console.log('onNotification:');

        const localNotification = new firebase.notifications.Notification({
          sound: 'sampleaudio',
          show_in_foreground: true,
        })
          .setSound('sampleaudio.mp3')
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setBody(notification.body)
          .android.setChannelId('fcm_pushnotification_default_channel') // e.g. the id you chose above
          .android.setSmallIcon('@drawable/ic_launcher') // create this icon in Android Studio
          .android.setColor('#000000') // you can set a color here
          .android.setPriority(firebase.notifications.Android.Priority.High);

        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err));
      });

    const channel = new firebase.notifications.Android.Channel(
      'fcm_pushnotification_default_channel',
      'Demo app name',
      firebase.notifications.Android.Importance.High,
    )
      .setDescription('Demo app description')
      .setSound('sampleaudio.mp3');
    firebase.notifications().android.createChannel(channel);

    /*
     * If your app is in background, you can lisFASten for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body} = notificationOpen.notification;
        console.log('onNotificationOpened:');
        // debugger;
        Alert.alert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    // debugger;
    if (notificationOpen) {
      const {title, body} = notificationOpen.notification;
      const {data} = notificationOpen.notification;
      console.log('getInitialNotification:');
      Alert.alert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      // debugger;
      console.log('JSON.stringify:', JSON.stringify(message));
    });
  }

  async componentDidMount() {
    this.checkPermission();
    this.createNotificationListeners(); //add this line
  }

  componentWillUnmount() {
    this.notificationListener;
    this.notificationOpenedListener;
  }

  render() {
    console.disableYellowBox = true;
    return (
      <View style={commonStyle.flex1}>
        <SafeAreaView style={{flex: 0, backgroundColor: color.Theme_Primary}} />
        <StatusBar barStyle="light-content" backgroundColor="#3f51b5" />
        <Index />
      </View>
    );
  }
}
export default App;
