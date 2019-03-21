import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import {
  TitleText,
  SubtitleText,
  BodyText,
  Link,
} from "../../components/Typography";
import { Page } from "../../components/Containers";
import Button from "../../components/Button";
import WebBrowserManager from "../../lib/WebBrowserManager";

const styles = StyleSheet.create({
  githubLink: {
    marginTop: 20,
  },
  padder: {
    height: 20,
  },
  section: {
    marginVertical: 10,
  },
});

class FAQScreen extends Component {
  static navigationOptions = {
    title: "FAQs",
  };

  render() {
    return (
      <Page>
        <TitleText>Frequently Asked Questions</TitleText>
        <View style={styles.section}>
          <SubtitleText>How does this app work?</SubtitleText>
          <BodyText>
            This app is powered by the&nbsp;
            <Link href="https://uclapi.com">UCL API</Link>
            &nbsp;– a student-run platform for interacting with data not usually
            made available, or that is difficult to access through other UCL
            systems.
          </BodyText>
        </View>
        <View style={styles.section}>
          <SubtitleText>
            How do we work out how busy study spaces are?
          </SubtitleText>
          <BodyText>
            Under almost every desk in UCL{"'"}s libraries, there is a sensor
            that detects the presence of a person, and reports this information
            back to the UCL Library team. UCL Assistant can then request this
            information to display in the app. We can even count the number of
            occupied seats in each study space to give you a real time overview
            of which locations are the most busy!
          </BodyText>
        </View>

        <View style={styles.section}>
          <SubtitleText>Does this violate students{"'"} privacy?</SubtitleText>
          <BodyText>
            The sensors don{"'"}t capture any photos or broadcast anything other
            than whether the desk is occupied or not.
          </BodyText>
        </View>

        <SubtitleText>
          What about people who get up and leave their belongings on the desk?
        </SubtitleText>
        <BodyText>
          Desks remain marked as {'"'}occupied{'"'} for roughly 30 minutes after
          they stop detecting a person, to account for these rest breaks.
        </BodyText>

        <SubtitleText>What do the charts show?</SubtitleText>
        <BodyText>
          The charts displayed show the average numbers of seats occupied
          throughout the day. This can be useful in working out when the
          quietest times in the day are, and how likely you are to get a seat.
        </BodyText>
        <BodyText>
          These averages are taken over the last thirty days, so they should
          account for peculiarities like exam season or holidays.
        </BodyText>

        <SubtitleText>What does the red bar mean on the charts?</SubtitleText>
        <BodyText>
          This shows you the current number of occupied seats at the current
          time of day against the average. You can then see if the space is
          busier or quieter than normal.
        </BodyText>

        <SubtitleText>More questions?</SubtitleText>
        <BodyText>
          We{"'"}d love to hear from you if you have any more questions or want
          to learn more about UCL Assistant. You can reach out to the team by
          creating an issue on our GitHub page.
        </BodyText>
        <Button
          style={styles.githubLink}
          onPress={() =>
            WebBrowserManager.openLink(
              "https://github.com/uclapi/ucl-assistant-app",
            )
          }
        >
          Open GitHub
        </Button>
        <View style={styles.padder} />
      </Page>
    );
  }
}

export default FAQScreen;
