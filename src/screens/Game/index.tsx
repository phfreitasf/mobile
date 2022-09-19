import { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import logoImg from '../../assets/logo-nlw-esports.png'
import { styles } from './styles';
import { FlatList, Image, ImageBackground, TouchableOpacity, View } from 'react-native';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Text } from 'react-native';
import { DuoMatch } from '../../components/DuoMatch';


interface RouteParams {
  id: string,
  title: string,
  bannerUrl: string
}

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as RouteParams


  useEffect(() => {
    fetch(`http://192.168.1.198:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(response => setDuos(response))
  }, [])

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.1.198:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then(response => setDiscordDuoSelected(response.discord))
  }

  return (
    <Background>

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              style={styles.entypo}
              name="chevron-thin-left" />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo} />
          <View style={styles.right} />
        </View>
        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover} />

        <Heading
          title={game.title}
          subtitle='Conecte-se e começe a jogar'
        />

        <FlatList
          style={styles.list}
          contentContainerStyle={duos.length > 0 ? styles.contentList : styles.emptyListContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
          )}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}> Não há anúncios publicados ainda.</Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')} />
      </SafeAreaView>
    </Background>
  );
}