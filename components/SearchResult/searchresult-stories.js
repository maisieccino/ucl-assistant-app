import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text } from "@storybook/addon-knobs";
import SearchResult from "./";
import CenterView from "../CenterView";

storiesOf("Search Result", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("location", () => (
    <SearchResult
      topText={text("top text", "UCL Main Library")}
      bottomText={text("bottom text", "Rather busy")}
      type="location"
    />
  ));
