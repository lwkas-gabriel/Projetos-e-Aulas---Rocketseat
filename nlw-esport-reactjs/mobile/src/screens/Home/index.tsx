import { View, Image, FlatList } from 'react-native';
import { styles } from './styles';

import logoImage from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard } from '../../components/GameCard';
import {GAMES} from '../../utils/games'


export function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={logoImage}
        style={styles.logo}
      />
      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <GameCard
        data={GAMES[0]}
      />

    </View>
  );
}