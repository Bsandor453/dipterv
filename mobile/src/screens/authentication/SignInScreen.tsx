import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/action_creators/auth';
import { AppDispatch, RootState } from '../../redux/store';
import { AmberPalette, TextColor, TitleColor } from '../../util/ColorPalette';
import { RootStackParamList } from '../navigation/RootStackScreenScreen';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignInScreen'
>;

const SignInScreen = ({ navigation }: NavigationProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const loginStatus = useSelector((state: RootState) => state.auth.loginStatus);

  const [data, setData] = useState({
    username: '',
    usernameIsCorrect: false,
    password: '',
    showPassword: false,
  });

  const handleUsernameTextInputChange = (value: string) => {
    if (value.length !== 0) {
      setData({
        ...data,
        username: value,
        usernameIsCorrect: true,
      });
    } else {
      setData({
        ...data,
        username: value,
        usernameIsCorrect: false,
      });
    }
  };

  const handlePasswordTextInputChange = (value: string) => {
    setData({
      ...data,
      password: value,
    });
  };

  const changePasswordVisibility = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AmberPalette[1]} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Sign in</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.card}>
        <Text style={styles.textCard}>Username</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={TextColor} size={20} />
          <TextInput
            placeholder="Your username"
            autoComplete="username"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => handleUsernameTextInputChange(value)}
          />
          {data.usernameIsCorrect ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.textCard, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <Feather name="lock" color={TextColor} size={20} />
          <TextInput
            placeholder="Your password"
            autoComplete="password"
            secureTextEntry={!data.showPassword}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(value) => handlePasswordTextInputChange(value)}
          />
          <TouchableOpacity onPress={changePasswordVisibility}>
            {data.showPassword ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() =>
              dispatch(
                login({ username: data.username, password: data.password })
              )
            }
            disabled={!data.username || !data.password}
            style={styles.signIn}
          >
            <LinearGradient
              colors={
                !data.username || !data.password
                  ? ['#dedede', '#ededed']
                  : [AmberPalette[0], AmberPalette[3]]
              }
              style={styles.signIn}
            >
              {loginStatus === 'pending' ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={[
                    styles.textSign,
                    {
                      color:
                        !data.username || !data.password ? 'gray' : 'white',
                    },
                  ]}
                >
                  Sign In
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              { borderColor: AmberPalette[0], borderWidth: 1, marginTop: 15 },
            ]}
          >
            <Text style={[styles.textSign, { color: AmberPalette[1] }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AmberPalette[1],
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  textHeader: {
    color: TitleColor,
    fontWeight: 'bold',
    fontSize: 40,
  },
  card: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  textCard: {
    color: TextColor,
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: TextColor,
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignInScreen;
