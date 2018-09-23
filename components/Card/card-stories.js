import React from "react";
import { storiesOf } from "@storybook/react-native";
import { withKnobs, text, date } from "@storybook/addon-knobs";
import Card from "./";
import TimetableCard from "./TimetableCard";
import CenterView from "../CenterView";

storiesOf("Card", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Card title={text("Title", "Hello Card")}>
      {text("Text", "This is some card content")}
    </Card>
  ))
  .add("timetable specialised", () => (
    <TimetableCard
      moduleCode={text("Module Code", "COMP101P")}
      startTime={date("Start Time", new Date())}
      endTime={date("End Time", new Date())}
      location={text("Location", "TBA")}
      lecturer={text("Lecturer", "Unknown Lecturer")}
    />
  ));
