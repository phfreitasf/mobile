import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { Background } from './src/components/Background';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter'
import { Subscription } from 'expo-modules-core'
import * as Notifications from 'expo-notifications'

import { Loading } from './src/components/Loading';
import { Routes } from './src/routes';

import './src/services/notificationConfigs'; //configs sobre notificação
import { getPushNotificationToken } from './src/services/getPushNotificationToken'



export default function App() {
  const getNotificationListener = useRef<Subscription>()
  const responseNotificationListener = useRef<Subscription>()

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })
    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
      console.log(notification)
    })

    return () => {
      if(getNotificationListener.current && responseNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responseNotificationListener.current)
      }
    }
  })

  const [fontsLoaded] = useFonts({
    Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black
  })
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>

  );
}

