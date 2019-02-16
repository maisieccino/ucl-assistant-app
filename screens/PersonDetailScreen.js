import React, { Component } from "react";
import { ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchPerson } from "../actions/peopleActions";
import MailManager from "../lib/MailManager";
import Button from "../components/Button";
import { PaddedIcon, PageNoScroll, Spacer } from "../components/Containers";
import {
  BodyText,
  ErrorText,
  TitleText,
  ButtonText,
} from "../components/Typography";
import Colors from "../constants/Colors";

class PersonDetailScreen extends Component {
  static navigationOptions = {
    title: "Person Detail",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
    fetchPerson: PropTypes.func,
    /* eslint-disable react/no-unused-prop-types */
    name: PropTypes.string,
    department: PropTypes.string,
    email: PropTypes.string,
    status: PropTypes.string,
    isFetching: PropTypes.bool,
    error: PropTypes.string,
    /* eslint-enable react/no-unused-prop-types */
  };

  static defaultProps = {
    token: "",
    fetchPerson: () => {},
    name: "",
    department: "",
    email: "",
    status: "",
    isFetching: false,
    error: "",
  };

  static mapStateToProps = state => ({
    name: state.people.person.name,
    department: state.people.person.department,
    email: state.people.person.email,
    status: state.people.person.status,
    token: state.user.token,
    isFetching: state.people.isFetching,
    error: state.people.fetchError,
  });

  static mapDispatchToProps = dispatch => ({
    fetchPerson: (token, email) => dispatch(fetchPerson(token, email)),
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = { ...params };
  }

  componentDidMount() {
    this.props.fetchPerson(this.props.token, this.state.email);
  }
  sendEmail = () => {
    MailManager.composeAsync({
      recipients: [this.state.email],
    });
  };

  render() {
    const { name, status, department, email, isFetching, error } = this.props;
    return isFetching ? (
      <PageNoScroll>
        <ActivityIndicator size="large" />
      </PageNoScroll>
    ) : (
      <PageNoScroll>
        <TitleText>{name}</TitleText>
        {error.length > 0 && <ErrorText>Error: {error}</ErrorText>}
        <BodyText>
          {status}, {department}
        </BodyText>
        <BodyText>Email: {email}</BodyText>
        <Spacer />
        <Button onPress={this.sendEmail}>
          <PaddedIcon name="mail" size={24} color={Colors.pageBackground} />
          <ButtonText>Send Email</ButtonText>
        </Button>
      </PageNoScroll>
    );
  }
}

export default connect(
  PersonDetailScreen.mapStateToProps,
  PersonDetailScreen.mapDispatchToProps,
)(PersonDetailScreen);
