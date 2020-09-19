import React from 'react'

import { View, StyleSheet } from 'react-native'
import { PageNoScroll } from '../../../components/Containers'
import { BodyText } from '../../../components/Typography'

const styles = StyleSheet.create({
  container: {

  },
})

const StudySpacesNoticeScreen = () => (
    <PageNoScroll>
      <View style={styles.container}>
        <BodyText>Hello world</BodyText>
      </View>
    </PageNoScroll>
)

export default StudySpacesNoticeScreen
