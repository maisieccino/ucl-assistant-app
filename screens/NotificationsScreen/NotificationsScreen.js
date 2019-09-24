import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import {
  BodyText,
  TitleText,
} from "../../components/Typography"
import { AssetManager } from "../../lib"
import Styles from "../../styles/Containers"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
  },
  notifyImage: {
    height: 200,
    marginTop: 15,
  },
  subdescription: {
    marginBottom: 30,
  },
})

class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <TitleText>Be Notified</TitleText>
          <Image
            source={AssetManager.undraw.notify}
            resizeMethod="scale"
            style={[Styles.image, styles.notifyImage]}
            resizeMode="contain"
          />
          <View style={styles.description}>
            <BodyText>
              Find out when there&apos;s a new feature on UCL Assistant,&nbsp;
              when your timetable changes, or if there&apos;s an upcoming event that might&nbsp;
              interest you.
            </BodyText>
          </View>
          <View style={styles.subdescription}>
            <BodyText>
              You can disable notifications later at any time.
            </BodyText>
          </View>
          <Button>
            Enable Notifications
          </Button>
        </View>
      </Page>
    )
  }
}

export default NotificationsScreen
