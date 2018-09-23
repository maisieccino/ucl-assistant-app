import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
import TextInput from "./";
import CenterView from "../../CenterView";

storiesOf("Text Input", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <TextInput
      value={text("value", "hello world")}
      placeholder="Enter some text..."
    />
  ));
