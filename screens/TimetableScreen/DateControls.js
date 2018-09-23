import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { momentObj } from "react-moment-proptypes";
import DateTimerPicker from "react-native-modal-datetime-picker";
import { Horizontal, Spacer } from "./../../components/Containers";
import Button, { RoundButton } from "./../../components/Button";

class DateControls extends Component {
  static propTypes = {
    onDateChanged: PropTypes.func,
    date: momentObj,
  };

  static defaultProps = {
    onDateChanged: () => {},
    date: moment().startOf("day"),
  };

  constructor(props) {
    super(props);
    this.state = {
      isDatePickerVisible: false,
    };
  }

  onDatePickerConfirm(date) {
    this.props.onDateChanged(moment(date));
    this.setState({ isDatePickerVisible: false });
  }

  render() {
    const { onDateChanged, date } = this.props;
    return (
      <Horizontal>
        <RoundButton
          onPress={() => onDateChanged(date.subtract(1, "day"))}
          icon="chevron-left"
        />
        <Spacer />
        <DateTimerPicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={d => this.onDatePickerConfirm(d)}
          onCancel={() => this.setState({ isDatePickerVisible: false })}
          date={date.toDate()}
        />
        <Button onPress={() => this.setState({ isDatePickerVisible: true })}>
          Jump To Date
        </Button>
        <Spacer />
        <RoundButton
          onPress={() => onDateChanged(date.add(1, "day"))}
          icon="chevron-right"
        />
      </Horizontal>
    );
  }
}

export default DateControls;
