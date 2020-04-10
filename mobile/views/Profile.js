import React, { useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { Text, Button } from 'react-native-elements'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import * as Font from 'expo-font'

import colors from '../styles/colors'
import styles from '../styles/styles'

import AuthContext from '../context/AuthContext'

// Get screen height and width
const screenHeight = Math.round(Dimensions.get('window').height)

const profileStyles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center'
  },
  profileSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 0.10 * screenHeight
  }
})

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

function Profile () {
  const [firstName, setFirstName] = useState('John')
  const [lastName, setLastName] = useState('Doe')
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  const { signOut } = useContext(AuthContext)

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
        'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf')
      })

      setIsFontLoaded(true)
    }

    loadFonts()
  })

  return (
    isFontLoaded ? (
      <ScrollView style={styles.container}>
        <View style={profileStyles.profileHeader}>
          <View>
            <MaterialCommunityIcons name="account-circle" size={120}/>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 44, marginBottom: 30, fontFamily: 'open-sans-light' }}>{ firstName }</Text>
            <Text style={{ fontSize: 44, marginBottom: 30, fontFamily: 'open-sans-light' }}>{ ' ' }</Text>
            <Text style={{ fontSize: 44, marginBottom: 30, fontFamily: 'open-sans-light' }}>{ lastName }</Text>
          </View>
          <View>
            <Button
              raised {...true}
              buttonStyle={{ backgroundColor: colors.danger }}
              title="Log Out"
              titleStyle={{ fontFamily: 'open-sans-light' }}
              onPress={() => signOut()}
            />
          </View>
        </View>
      </ScrollView>
    ) : null
  )
}

export default Profile
