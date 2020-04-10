import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

import { MaterialIcons } from '@expo/vector-icons'

import * as Font from 'expo-font'

import colors from '../styles/colors'
import styles from '../styles/styles'

SignUp.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

function SignUp (props) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  const { navigation } = props

  useEffect(() => {
    const loadFonts = async () => {
      // Load custom fonts on mount
      await Font.loadAsync({
        'open-sans-light': require('../assets/fonts/OpenSans-Light.ttf'),
        'open-sans-regular': require('../assets/fonts/OpenSans-Regular.ttf')
      })

      setIsFontLoaded(true)
    }

    loadFonts()
  }, [])

  return (
    isFontLoaded ? (
      <ScrollView style={styles.container}>
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack({ key: 'LoginScreenKey' })}>
            <MaterialIcons
              name="arrow-back"
              size={32}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontFamily: 'open-sans-light', fontSize: 44, marginBottom: 44 }}>Sign Up</Text>
        </View>
        <View>
          <View style={{ marginBottom: 44 }}>
            <Input
              placeholder="Create Username"
              returnKeyType={'next'}
              returnKeyLabel={'next'}
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={username}
              onChange={setUsername}/>
          </View>
          <View style={{ marginBottom: 44 }}>
            <Input
              placeholder="Create Password"
              returnKeyType={'next'}
              returnKeyLabel={'next'}
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={password}
              onChange={setPassword}/>
          </View>
          <View style={{ marginBottom: 44 }}>
            <Input
              placeholder="Enter First Name"
              returnKeyType={'next'}
              returnKeyLabel={'next'}
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={firstName}
              onChange={setFirstName}/>
          </View>
          <View style={{ marginBottom: 44 }}>
            <Input
              placeholder="Enter Last Name"
              returnKeyType={'done'}
              returnKeyLabel={'done'}
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={lastName}
              onChange={setLastName}/>
          </View>
        </View>
        <View>
          <View>
            <Button
              raised {...true}
              buttonStyle={{ backgroundColor: colors.main }}
              title="Sign Up"
              titleStyle={{ fontFamily: 'open-sans-light' }}
              onPress={() => navigation.goBack({ key: 'LoginScreenKey' })}
            />
          </View>
        </View>
      </ScrollView>
    ) : null
  )
}

export default SignUp
