import { useAuthContext } from '@/hooks/useAuthContext'
import { withApollo } from '@/services/apollo'
import React from 'react'

export const IndexPage = () => {
  const auth = useAuthContext()
  const queryStr = "query MyQuery { users { id email } }"
  const query = { query: queryStr }

  const fetchUsers = () => {
    fetch('https://vast-viper-60.hasura.app/v1/graphql', {
      method: 'POST',
      body: JSON.stringify(query)
    }).then(response => {
      response.json().then(result => {
        console.log(result.data)
      })
    })
  }

  return (
    <div>
      <h1>YES</h1>
      <button onClick={() => auth.logIn('google')}>
        Google Login
      </button>
      <button onClick={() => auth.logIn('facebook')}>
        Faceboook Login
      </button>
      <button onClick={() => auth.logOut()}>
        Logout
      </button>
      <button onClick={fetchUsers}>
        fetch
      </button>

        <div>
          <div>
            status: {auth.userCredential.status}
          </div>
          <div>
            user: {auth.userCredential.user?.name}
          </div>
          <div>
            token: {auth.userCredential.token}
          </div>
        </div>

    </div>
  );
}

export default withApollo()(IndexPage)