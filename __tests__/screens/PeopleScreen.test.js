import "react-native"

import React from "react"
import renderer from "react-test-renderer"

import { RecentResults } from "../../screens/PeopleScreen/RecentResults"
// import { PeopleScreen } from "../../screens/PeopleScreen"

// it(`renders the PeopleScreen`, async () => {
//   const mockNavigation = {
//     navigate: jest.fn(),
//   }
//   const props = {
//     isSearching: false,
//     navigation: mockNavigation,
//     recents: [],
//     searchResults: [],
//   }
//   const tree = renderer.create(
//     <PeopleScreen
//       {...props}
//     />
//   ).toJSON()
//   expect(tree).toMatchSnapshot()
// })

it(`renders an empty RecentResults`, async () => {
  const props = {
    clearRecents: jest.fn(),
    navigation: {
      navigate: jest.fn(),
    },
    recents: [],
  }
  const tree = renderer.create(<RecentResults {...props} />).toJSON()
  expect(tree).toBe(null)
})
