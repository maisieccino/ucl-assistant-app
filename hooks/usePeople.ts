import { QueryResult, useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'
import { JWT, Person } from '../types/uclapi'

const usePeople = (token: JWT, query: string): QueryResult<Person[], Error> => useQuery(
  [`people`, token, query],
  (_, t: string, q: string) => ApiManager.people.search(t, q),
  {
    enabled: query && query.length > 0,
  },
)

export default usePeople
