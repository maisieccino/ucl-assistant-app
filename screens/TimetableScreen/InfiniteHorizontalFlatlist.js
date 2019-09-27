import PropTypes from 'prop-types'
import React from 'react'
import { FlatList } from 'react-native'
import { generate } from "shortid"

class InfiniteHorizontalFlatlist extends React.Component {
  static propTypes = {
    onScrollBack: PropTypes.func,
    onScrollForward: PropTypes.func,
  }

  static defaultProps = {
    onScrollBack: () => { },
    onScrollForward: () => { },
  }

  constructor() {
    super()
    this.state = {
      data: [{}, {}, {}],
      width: 0,
    }
    this.flatList = null
  }

  onLayout = ({ nativeEvent }) => {
    const { width: curWidth } = nativeEvent.layout
    this.setState({ width: curWidth })
  }

  onScroll = ({ nativeEvent: { contentOffset: { x } } }) => {
    const { width, data } = this.state
    const scrollForward = (x === ((data.length - 1) * width))
    const scrollBack = (x === 0)
    if (scrollBack || scrollForward) {
      // always reset to middle element
      this.flatList.scrollToIndex({ animated: false, index: 1 })

      const { onScrollBack, onScrollForward } = this.props
      if (scrollBack) {
        onScrollBack()
      }
      if (scrollForward) {
        onScrollForward()
      }
    }
  }

  onScrollFailed = () => this.flatList.scrollToIndex({ animated: false, index: 1 })

  render() {
    const { data } = this.state
    return (
      <FlatList
        {...this.props}
        ref={(el) => { this.flatList = el }}
        onLayout={this.onLayout}
        onScroll={this.onScroll}
        onScrollToIndexFailed={this.onScrollFailed}
        data={data}
        keyExtractor={() => generate()}
        initialScrollIndex={1}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    )
  }
}

export default InfiniteHorizontalFlatlist
