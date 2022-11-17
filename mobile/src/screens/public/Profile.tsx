import { DrawerScreenProps } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DrawerParamList } from '../navigation/DrawerNavigation';

type NavigationProps = DrawerScreenProps<DrawerParamList, 'Profile'>;

const ProfileScreen = ({ route, navigation }: NavigationProps) => {
  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
      <Button
        mode="outlined"
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('ReduxTest', { username: 'Guest' })}
      >
        Go to test screen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
