import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles';
import { THEME } from '../../theme';
import LogoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { DuoMatch } from '../../components/DuoMatch';



export function Game() {
    const [duos, setDuos] = useState<DuoCardProps[]>([]);
    const [discordSelected, setDiscordSelected] = useState('')
    const navigation = useNavigation();
    const route = useRoute();
    const game = route.params as GameParams;

    function handleGoBack(){
        navigation.goBack()
    }

    async function getDiscordUser(adsId: string) {
        fetch(`http://Ip do Back end  mais porta/ads/${adsId}/discord`).then(response => response.json()).then(data => setDiscordSelected(data.discord));
        
      }

    useEffect(() => {
        fetch(`http://Ip do Back end  mais porta/games/${game.id}/ads`).then(response => response.json()).then(data => setDuos(data))
      }, [])
  return (
    <Background>
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoBack}>
                    <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
                </TouchableOpacity>

                <Image source={LogoImg} style={styles.logo} />

                <View style={styles.right}></View>
            </View>

            <Image source={{ uri: game.bannerUrl }} style={styles.cover} resizeMode="cover" />

            <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

            <FlatList data={duos} keyExtractor={item => item.id} renderItem={({item}) => (<DuoCard data={item} onConect={() => {getDiscordUser(item.id)}} />)} horizontal showsHorizontalScrollIndicator={false} style={styles.containerList} contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent ]} ListEmptyComponent={() => (<Text style={styles.emptyListGame}>Não há anúncios publicados para esse jogo ainda</Text>)} />

            <DuoMatch visible={discordSelected.length > 0}  discord={discordSelected} onClose={() => setDiscordSelected('')} />
            
        </SafeAreaView>
    </Background>
  );
}