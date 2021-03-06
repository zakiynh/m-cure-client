import * as React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useEffect } from 'react';
import { Text, View } from "react-native";
import axios from 'axios';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailUser } from '../src/store/actions/userActions';
const baseUrl = "https://m-cure-postgres.herokuapp.com"

export default function Payment() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [url, setUrl] = React.useState("")
  const { access_token, detailUser } = useSelector((state) => {
    return state.user
  })

  async function addTicket() {
    try {
      let response = await axios.patch(`${baseUrl}/users/ticket`, {}, {
        headers: {
          access_token
        }
      })

    } catch (error) {
      console.log(error)
    }
  }


  function backToExpo(param) {
    const { url } = param;

    if (!url) return;

    if (url.includes('status_code=200')) {
      addTicket()
      dispatch(getDetailUser(access_token))
      // .then(() => {
      navigation.navigate('App', { screen: 'Home Screen' })
      // })
    }

  }

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      async function pay() {
        let response = await axios.post("https://m-cure-postgres.herokuapp.com/users/payment", {
          email: detailUser.email
        }, {});
        // console.log(response.data, "====")
        setUrl(response.data.redirect_url)
      }
      pay()

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  // useEffect(() => {
  //   async function pay() {
  //     let response = await axios.post("https://m-cure-postgres.herokuapp.com/users/payment", {
  //       email: detailUser.email
  //     }, {});
  //     // console.log(response.data, "====")
  //     setUrl(response.data.redirect_url)
  //   }
  //   pay()
  // }, [])

  if (url === "") {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={"#B4E197"} />
      </View>
    )
  }
  return (
    <>
      <WebView
        style={styles.container}
        source={{ uri: url }}
        onNavigationStateChange={backToExpo}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})