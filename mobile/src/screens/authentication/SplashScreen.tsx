import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-paper';
import Svg, { Text as SvgText } from 'react-native-svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  AlternativeTextColor,
  AmberPalette,
  TitleColor,
} from '../../util/ColorPalette';
import { RootStackParamList } from '../navigation/RootStackScreen';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SplashScreen'
>;

const SplashTitle = () => (
  <>
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
      style={styles.splashTitle1}
    >
      <SvgText
        stroke="black"
        strokeWidth="0.5"
        fill={AmberPalette[0]}
        fontSize="20"
        fontWeight={800}
      >
        Stock
      </SvgText>
    </Svg>
    <Svg
      height="100%"
      width="100%"
      viewBox="0 0 100 100"
      style={styles.splashTitle2}
    >
      <SvgText
        stroke="black"
        strokeWidth="0.5"
        fill={AmberPalette[3]}
        fontSize="20"
        fontWeight={700}
      >
        Simulator
      </SvgText>
    </Svg>
  </>
);

const SplashScreen = ({ navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Image
          source={{
            uri: 'https://source.unsplash.com/featured/?cryptocurrency',
          }}
          style={styles.logo}
          resizeMode="cover"
          blurRadius={10}
        />
        <SplashTitle />
        <Animatable.View style={styles.card} animation="fadeInUpBig">
          <Text style={styles.title}>Trade with cryptocurrencies!</Text>
          <Text style={styles.text}>Try your luck without risk!</Text>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignInScreen')}
            >
              <LinearGradient
                colors={[AmberPalette[0], AmberPalette[3]]}
                style={styles.signIn}
              >
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons name="navigate-next" color="#fff" size={20} />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('screen');
const splashTitle1Top = 60;
const splashTitle2Top = splashTitle1Top + 75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle1: {
    position: 'absolute',
    top: splashTitle1Top,
    left: 20,
    fontSize: 40,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  splashTitle2: {
    position: 'absolute',
    top: splashTitle2Top,
    left: 20,
    fontSize: 40,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  card: {
    flex: 1,
    position: 'absolute',
    top: height * 0.6,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: width,
    height: height,
  },
  title: {
    color: TitleColor,
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: AlternativeTextColor,
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
