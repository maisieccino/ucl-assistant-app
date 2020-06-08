import { RouteProp } from '@react-navigation/native'
import React, { Component } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"

import Svg from "../../../components/Svg"
import type { AppStateType } from '../../../configureStore'
import ApiManager from "../../../lib/ApiManager"
import type { StudySpacesNavigatorParamList } from '../StudySpacesNavigator'


const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  webview: {
    flex: 1,
  },
})
interface Props extends PropsFromRedux {
  route: RouteProp<
    StudySpacesNavigatorParamList,
    // eslint-disable-next-line quotes
    'LiveSeatingMap'
  >,
}

interface State {
  svg: string,
}

class LiveSeatingMapScreen extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      svg: null,
    }
  }

  componentDidMount() {
    const { route, token } = this.props
    const { surveyId, mapId } = route.params
    ApiManager.workspaces
      .getLiveImage(token, { mapId, surveyId })
      .then((base64) => {
        this.setState({ svg: base64 })
      })
  }

  render() {
    const { svg } = this.state
    if (!svg) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <Svg
        uri={svg}
        style={styles.webview}
        scrollEnabled
        bounces
        pointerEvents="auto"
      />
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(LiveSeatingMapScreen)
