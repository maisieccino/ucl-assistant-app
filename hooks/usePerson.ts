import { QueryResult, useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'
import { JWT, Person } from '../types/uclapi'

const usePerson = (token: JWT, email: string): QueryResult<Person, Error> => useQuery(
  [`person`, token, email],
  (_, t: string, e: string) => ApiManager.people.fetchPerson(t, e),
  { enabled: email && email.length > 0 },
)

export default usePerson
