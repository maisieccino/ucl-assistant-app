// adapted from https://github.com/kkemple/react-native-sideswipe (MIT License)

/* @flow */
import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  FlatList,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native'

import type {
  CarouselProps,
  GestureEvent,
  GestureState,
} from './types'

const { width: screenWidth } = Dimensions.get(`window`)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

type State = {
  animatedValue: Animated.Value,
  currentIndex: number,
  itemWidthAnim: Animated.Value,
  scrollPosAnim: Animated.Value,
}

const styles = StyleSheet.create({
  flatList: {
    flexGrow: 1,
  },
})

class Carousel extends Component<CarouselProps, State> {
  panResponder: PanResponder;

  list: typeof FlatList;

  static defaultProps = {
    contentOffset: 0,
    data: [],
    extractKey: (item: *, index: number) => `sideswipe-carousel-item-${index}`,
    itemWidth: screenWidth,
    onEndReached: () => { },
    onEndReachedThreshold: 0.9,
    onGestureRelease: () => { },
    onGestureStart: () => { },
    onIndexChange: () => { },
    renderItem: () => null,
    shouldCapture: ({ dx }: GestureState) => (dx * dx) > 1,
    shouldRelease: () => false,
    threshold: 0,
    useNativeDriver: true,
    useVelocityForIndex: true,
  };

  constructor(props: CarouselProps) {
    super(props)

    const currentIndex: number = props.index || 0
    const initialOffset: number = currentIndex * props.itemWidth
    const scrollPosAnim: Animated.Value = new Animated.Value(initialOffset)
    const itemWidthAnim: Animated.Value = new Animated.Value(props.itemWidth)
    const animatedValue: Animated.Value = Animated.divide(
      scrollPosAnim,
      itemWidthAnim
    )

    this.state = {
      animatedValue,
      currentIndex,
      itemWidthAnim,
      scrollPosAnim,
    }

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this.handleGestureCapture,
      onPanResponderGrant: this.handleGestureStart,
      onPanResponderMove: this.handleGestureMove,
      onPanResponderRelease: this.handleGestureRelease,
      onPanResponderTerminationRequest: this.handleGestureTerminationRequest,
      onStartShouldSetPanResponder: () => true,
    })
  }

  componentDidUpdate = (prevProps: CarouselProps) => {
    const { contentOffset, index, itemWidth } = this.props

    if (prevProps.itemWidth !== itemWidth) {
      const { itemWidthAnim } = this.state
      itemWidthAnim.setValue(itemWidth)
    }

    if (Number.isInteger(index) && index !== prevProps.index) {
      const { currentIndex } = this.state
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState(
        () => ({ currentIndex: index }),
        () => {
          setTimeout(() => this.list.scrollToIndex({
            animated: true,
            index: currentIndex,
            viewOffset: contentOffset,
          }))
        }
      )
    }
  };

  render = () => {
    const {
      contentContainerStyle,
      contentOffset,
      data,
      extractKey,
      flatListStyle,
      renderItem,
      style,
      onEndReached,
      onEndReachedThreshold,
      useNativeDriver,
    } = this.props
    const { animatedValue, currentIndex, scrollPosAnim } = this.state
    const dataLength = data.length

    return (
      <View
        style={[{ width: screenWidth }, style]}
        {...this.panResponder.panHandlers}
      >
        <AnimatedFlatList
          horizontal
          contentContainerStyle={[
            { paddingHorizontal: contentOffset },
            contentContainerStyle,
          ]}
          data={data}
          getItemLayout={this.getItemLayout}
          keyExtractor={extractKey}
          initialScrollIndex={currentIndex}
          ref={this.getRef}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          style={[styles.flatList, flatListStyle]}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollPosAnim } } }],
            { useNativeDriver }
          )}
          renderItem={({ item, index }) => renderItem({
            animatedValue,
            currentIndex,
            item,
            itemCount: dataLength,
            itemIndex: index,
          })}
        />
      </View>
    )
  };

  getRef = (ref: *) => {
    if (ref) {
      // eslint-disable-next-line no-underscore-dangle
      this.list = ref._component ? ref._component : ref
    }
  }

  getItemLayout = (data: Array<*>, index: number) => {
    const { itemWidth, contentOffset } = this.props
    return {
      index,
      length: itemWidth,
      offset: itemWidth * index + contentOffset,
    }
  }

  handleGestureTerminationRequest = (e: GestureEvent, s: GestureState) => {
    const { shouldRelease } = this.props
    shouldRelease(s)
  }

  handleGestureCapture = (e: GestureEvent, s: GestureState) => {
    const { shouldCapture } = this.props
    shouldCapture(s)
  }

  handleGestureStart = (e: GestureEvent, s: GestureState) => {
    const { onGestureStart } = this.props
    onGestureStart(s)
  }

  handleGestureMove = (e: GestureEvent, { dx }: GestureState) => {
    const { currentIndex } = this.state
    const { itemWidth } = this.props

    const currentOffset: number = currentIndex * itemWidth
    const resolvedOffset: number = currentOffset - dx

    this.list.scrollToOffset({
      animated: false,
      offset: resolvedOffset,
    })
  }

  handleGestureRelease = (e: GestureEvent, { dx, vx }: GestureState) => {
    const { currentIndex } = this.state
    const {
      itemWidth,
      threshold,
      useVelocityForIndex,
      data,
      contentOffset,
      onIndexChange,
      onGestureRelease,
    } = this.props

    const currentOffset: number = currentIndex * itemWidth
    const resolvedOffset: number = currentOffset - dx
    const resolvedIndex: number = Math.round(
      (resolvedOffset
        + (dx > 0 ? -threshold : threshold))
      / itemWidth
    )

    let newIndex: number
    if (useVelocityForIndex) {
      const absoluteVelocity: number = Math.round(Math.abs(vx))
      const velocityDifference: number = absoluteVelocity < 1 ? 0 : absoluteVelocity - 1

      newIndex = dx > 0
        ? Math.max(resolvedIndex - velocityDifference, 0)
        : Math.min(
          resolvedIndex + velocityDifference,
          data.length - 1
        )
    } else {
      newIndex = dx > 0
        ? Math.max(resolvedIndex, 0)
        : Math.min(resolvedIndex, data.length - 1)
    }

    this.list.scrollToIndex({
      animated: true,
      index: newIndex,
      viewOffset: contentOffset,
    })

    this.setState(
      () => ({ currentIndex: newIndex }),
      () => {
        onIndexChange(newIndex)
        onGestureRelease()
      },
    )
  }
}

export default Carousel
