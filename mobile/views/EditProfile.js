import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Input, Button } from 'react-native-elements'
import PropTypes from 'prop-types'
import { MaterialIcons } from '@expo/vector-icons'

import * as Font from 'expo-font'

import colors from '../styles/colors'
import styles from '../styles/styles'

// Get screen height and width
const screenHeight = Math.round(Dimensions.get('window').height)

const editProfileStyles = StyleSheet.create({
  input: {
    marginTop: 0.10 * screenHeight,
    marginBottom: 44
  }
})

EditProfile.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired
  }).isRequired
}

function EditProfile ({ navigation }) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isFontLoaded, setIsFontLoaded] = useState(false)

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
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 20 }}>
          <TouchableOpacity onPress={() => navigation.goBack({ key: 'ProfileScreenKey' })}>
            <MaterialIcons
              name="arrow-back"
              size={32}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontSize: 44, fontFamily: 'open-sans-light' }}>Edit Profile</Text>
        </View>
        <View style={editProfileStyles.input}>
          <View style={{ marginBottom: 24 }}>
            <Input
              placeholder="Edit First Name"
              returnKeyType={'next'}
              returnKeyLabel={'next'}
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={firstName}
              onChange={setFirstName}
            />
          </View>
          <View>
            <Input
              placeholder="Edit Last Name"
              inputStyle={{ fontFamily: 'open-sans-light' }}
              value={lastName}
              onChange={setLastName}
            />
          </View>
        </View>
        <View>
          <Button
            raised {...true}
            buttonStyle={{ backgroundColor: colors.success }}
            title="Save"
            titleStyle={{ fontFamily: 'open-sans-light' }}
            onPress={() => {
              alert('Update DB')
              navigation.goBack({ key: 'ProfileScreenKey' })
            }}
          />
        </View>
      </ScrollView>
    ) : null
  )
}

export default EditProfile
