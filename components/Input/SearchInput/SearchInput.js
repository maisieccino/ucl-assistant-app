import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { Horizontal } from "../../Containers"
import { SmallButton } from "../../Button"
import TextInput from "../TextInput"

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginRight: 10,
  },
})

const SearchInput = ({
  query, clear, onChangeQuery, placeholder,
}) => (
    <Horizontal>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeQuery}
        value={query}
        clearButtonMode="always"
        style={styles.textInput}
      />
      {query.length > 0 ? (
        <SmallButton onPress={clear}>Clear</SmallButton>
      ) : null}
    </Horizontal>
)

SearchInput.propTypes = {
  query: PropTypes.string,
  clear: PropTypes.func,
  placeholder: PropTypes.string,
  onChangeQuery: PropTypes.func,
}

SearchInput.defaultProps = {
  query: ``,
  clear: () => { },
  placeholder: `Search`,
  onChangeQuery: () => { },
}

export default SearchInput
