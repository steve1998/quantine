import React, { useState, useContext, useEffect } from 'react'
import { View, Dimensions, ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'

import * as Font from 'expo-font'

import colors from '../styles/colors'
import styles from '../styles/styles'

import AuthContext from '../context/AuthContext'

// Get screen height and width
const screenHeight = Math.round(Dimensions.get('window').height)

Login.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
}

function Login (props) {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isFontLoaded, setIsFontLoaded] = useState(false)

  const { navigate } = props.navigation

  const { signIn } = useContext(AuthContext)

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
        <View style={{ marginVertical: 0.1 * screenHeight }}>
          <View style={{ marginBottom: 80 }}>
            <Text style={{ fontFamily: 'open-sans-regular', fontSize: 16, color: colors.main }}>An inventory management app to help during the COVID-19 crisis</Text>
            <Text style={{ fontFamily: 'open-sans-regular', fontSize: 52 }}>Quantine</Text>
          </View>
          <View>
            <View style={{ marginBottom: 44 }}>
              <Input
                placeholder="Email"
                returnKeyType={'next'}
                returnKeyLabel={'next'}
                inputStyle={{ fontFamily: 'open-sans-light' }}
                value={userEmail}
                onChange={setUserEmail}/>
            </View>
            <View style={{ marginBottom: 72 }}>
              <Input
                placeholder="Password"
                returnKeyType={'done'}
                returnKeyLabel={'done'}
                inputStyle={{ fontFamily: 'open-sans-light' }}
                value={userPassword}
                onChange={setUserPassword}/>
            </View>
          </View>
          <View style={{ marginHorizontal: 44 }}>
            <View style={{ marginBottom: 12 }}>
              <Button
                raised {...true}
                buttonStyle={{ backgroundColor: colors.main }}
                title="Sign In"
                titleStyle={{ fontFamily: 'open-sans-light' }}
                onPress={() => signIn({ userEmail, userPassword })}
              />
            </View>
            <View>
              <Button
                type="clear"
                title="Sign up, if you haven't joined"
                titleStyle={{ fontFamily: 'open-sans-light', color: colors.main }}
                onPress={() => navigate('SignUpScreen', { key: 'LoginScreenKey' })}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    ) : null
  )
}

export default Login
