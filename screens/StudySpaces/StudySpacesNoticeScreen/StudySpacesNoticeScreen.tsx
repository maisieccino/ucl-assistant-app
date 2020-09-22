import React from 'react'

import { View, StyleSheet } from 'react-native'
import { PageNoScroll } from '../../../components/Containers'
import { BodyText, SubtitleText, Link } from '../../../components/Typography'
import Button from "../../../components/Button"

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
})

const StudySpacesNoticeScreen: React.FC = () => (
    <PageNoScroll>
      <View style={styles.container}>
        <SubtitleText>StudySpaces</SubtitleText>
        <BodyText>
          StudySpaces are no longer available for walk-in use in light of the ongoing pandemic.
        </BodyText>
        <BodyText>
          You can find out more about current policy around using the studypaces at the
          {` `}
          <Link href="">Library website</Link>
        </BodyText>
        <Button>Book a StudySpace</Button>
      </View>
    </PageNoScroll>
)

export default StudySpacesNoticeScreen
