import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Text } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AmberPalette, TextColor, TitleColor } from '../../util/ColorPalette';
import { RootStackParamList } from '../navigation/RootStackScreenScreen';

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpScreen'
>;

const SignUpScreen = ({ navigation }: NavigationProps) => {
  const [data, setData] = useState({
    username: '',
    usernameIsCorrect: false,
    fullname: '',
    fullnameIsCorrect: false,
    email: '',
    emailIsCorrect: false,
    password: '',
    showPassword: false,
    confirmPassword: '',
    showConfirmPassword: false,
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

  const handleFullNameTextInputChange = (value: string) => {
    if (value.length !== 0) {
      setData({
        ...data,
        fullname: value,
        fullnameIsCorrect: true,
      });
    } else {
      setData({
        ...data,
        fullname: value,
        fullnameIsCorrect: false,
      });
    }
  };

  const handleEmailTextInputChange = (value: string) => {
    if (value.length !== 0) {
      setData({
        ...data,
        email: value,
        emailIsCorrect: true,
      });
    } else {
      setData({
        ...data,
        email: value,
        emailIsCorrect: false,
      });
    }
  };

  const handlePasswordTextInputChange = (value: string) => {
    setData({
      ...data,
      password: value,
    });
  };

  const handleConfirmPasswordTextInputChange = (value: string) => {
    setData({
      ...data,
      confirmPassword: value,
    });
  };

  const changePasswordVisibility = () => {
    setData({
      ...data,
      showPassword: !data.showPassword,
    });
  };

  const changeConfirmPasswordVisibility = () => {
    setData({
      ...data,
      showConfirmPassword: !data.showConfirmPassword,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AmberPalette[1]} barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.textHeader}>Sign up</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.card}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.textCard}>Username</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={TextColor} size={20} />
            <TextInput
              placeholder="Your username"
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
          <Text style={[styles.textCard, { marginTop: 35 }]}>Full name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={TextColor} size={20} />
            <TextInput
              placeholder="Your full name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleFullNameTextInputChange(value)}
            />
            {data.fullnameIsCorrect ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          <Text style={[styles.textCard, { marginTop: 35 }]}>Email</Text>
          <View style={styles.action}>
            <MaterialIcons name="alternate-email" color={TextColor} size={20} />
            <TextInput
              placeholder="Your email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) => handleEmailTextInputChange(value)}
            />
            {data.emailIsCorrect ? (
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
          <Text style={[styles.textCard, { marginTop: 35 }]}>
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="black" size={20} />
            <TextInput
              placeholder="Your password again"
              secureTextEntry={!data.showConfirmPassword}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(value) =>
                handleConfirmPasswordTextInputChange(value)
              }
            />
            <TouchableOpacity onPress={changeConfirmPasswordVisibility}>
              {data.showConfirmPassword ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <LinearGradient
              colors={[AmberPalette[0], AmberPalette[3]]}
              style={styles.signIn}
            >
              <Text style={[styles.textSign, { color: '#fff' }]}>Sign Up</Text>
            </LinearGradient>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={[
                styles.signIn,
                { borderColor: AmberPalette[0], borderWidth: 1, marginTop: 15 },
              ]}
            >
              <Text style={[styles.textSign, { color: AmberPalette[1] }]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollView: {
    paddingHorizontal: 20,
  },
  card: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 0,
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

export default SignUpScreen;
