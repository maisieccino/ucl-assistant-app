import { Feather } from "@expo/vector-icons"
import React from 'react'
import {
  Text, TextStyle, ViewStyle,
} from 'react-native'

import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"


interface Props {
  containerStyle?: ViewStyle,
  style?: TextStyle,
  children: React.ReactElement | string,
  icon?: string,
}

const InfoText: React.FunctionComponent<Props> = ({
  children, icon = `info`, style, containerStyle,
}) => (
    <Horizontal style={[Style.infoTextContainer, containerStyle]}>
      <Feather size={18} color={Colors.infoColor} name={icon} />
      <Text style={[Style.infoText, style]}>{children}</Text>
    </Horizontal>
)

export default InfoText
