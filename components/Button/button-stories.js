import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import Button from "./";
import RoundButton from "./RoundButton";
import CenterView from "../CenterView";

storiesOf("Button/Default", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Button
      onPress={action("clicked-text")}
      disabled={boolean("Disabled", false)}
      loading={boolean("Loading", false)}
    >
      {text("Text", "Hello Button")}
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>😀 😎 👍 💯</Button>
  ))
  .add("with disabled prop", () => (
    <Button disabled onPress={action("clicked-disabled")}>
      Disabled Button
    </Button>
  ));

storiesOf("Button/Round", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with icon", () => (
    <RoundButton
      onPress={action("clicked-round")}
      disabled={boolean("Disabled", false)}
      loading={boolean("Loading", false)}
    />
  ))
  .add("with disabled prop", () => (
    <RoundButton
      onPress={action("clicked-round")}
      loading={boolean("Loading", false)}
      disabled
    />
  ));
