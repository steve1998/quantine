import React, { useReducer, useMemo, useEffect } from 'react'
import { Text, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import PropTypes from 'prop-types'

import Profile from './views/Profile'
import EditProfile from './views/EditProfile'
import Login from './views/Login'
import SignUp from './views/SignUp'

import AuthContext from './context/AuthContext'

import { SIGN_IN_URL } from 'react-native-dotenv'
import axios from 'axios'

const AuthStack = createStackNavigator()
const ProfileStack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Placeholder () {
  return (
    <Text>Replace me</Text>
  )
}

App.propTypes = {
  focused: PropTypes.object
}

export default function App () {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          }
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignOut: false,
            userToken: action.token
          }
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          }
        default:
          return {
            ...prevState
          }
      }
    },
    {
      isLoading: true,
      isSignOut: false,
      userToken: null
    }
  )

  useEffect(() => {
    let mounted = true

    const bootstrapAsync = async () => {
      let userToken

      try {
        userToken = await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log('Error: ' + e)
      }

      if (mounted) {
        dispatch({ type: 'RESTORE_TOKEN', token: userToken })
      }
    }

    bootstrapAsync()
    mounted = false
    return mounted
  }, [])

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        axios.post(SIGN_IN_URL, {
          email: 'admin@admin2.com',
          password: 'admin'
        })
          .then(response => {
            if (response.data.token) {
              dispatch({ type: 'SIGN_IN', token: response.data.token })
            }
          }).catch(error => {
            alert(error.message)
          })

        // fetch(SIGN_IN_URL, {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     email: data.userEmail,
        //     password: data.userPassword
        //   })
        // })
        // .then((response) => response.json())
        // .then((user) => {
        //   if(user.token) {
        //     dispatch({ type: 'SIGN_IN', token: user.token })
        //   }
        // })
        // .catch((error) => {
        //   console.error(error)
        // })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        fetch(SIGN_IN_URL, {
          method: 'POST',
          body: JSON.stringify({
            email: data.userEmail,
            password: data.userPassword
          })
        })
          .then((response) => response.json())
          .then((user) => {
            if (user.token) {
              dispatch({ type: 'SIGN_IN', token: user.token })
            }
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }), []
  )

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {state.userToken == null ? (
          <AuthStack.Navigator initialRouteName="LoginScreen" headerMode="none">
            <AuthStack.Screen
              name="LoginScreen"
              component={Login} />
            <AuthStack.Screen
              name="SignUpScreen"
              component={SignUp}
            />
          </AuthStack.Navigator>
        ) : (
          <Tab.Navigator
            initialRouteName="Placeholder"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused }) => {
                let iconName

                if (route.name === 'Placeholder') {
                  iconName = focused
                    ? 'cube'
                    : 'cube-outline'
                } else if (route.name === 'Profile') {
                  iconName = focused ? 'account' : 'account-outline'
                }

                return <MaterialCommunityIcons name={iconName} size={24}/>
              }
            })}
            tabBarOptions={{
              showIcon: true,
              showLabel: false
            }}>
            <Tab.Screen name="Placeholder" component={Placeholder}>
            </Tab.Screen>
            <Tab.Screen name="Profile">
              {() => (
                <ProfileStack.Navigator initialRouteName="ProfileScreen" headerMode="none">
                  <ProfileStack.Screen
                    name="ProfileScreen"
                    component={Profile}
                  />
                  <ProfileStack.Screen
                    name="EditProfileScreen"
                    component={EditProfile}
                  />
                </ProfileStack.Navigator>
              )}
            </Tab.Screen>
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  )
}
