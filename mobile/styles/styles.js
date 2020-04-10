import { StyleSheet, Dimensions } from 'react-native'

// Get screen height and width
const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

const styles = StyleSheet.create({
  container: {
    marginTop: 0.10 * screenHeight,
    marginLeft: 0.05 * screenWidth,
    marginRight: 0.05 * screenWidth
  }
})

export default styles
