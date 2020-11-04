import { useAuthContext } from '@/hooks/useAuthContext'
import { withApollo } from '@/services/aplloClient'
import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';



const GET_MY_CREDENTIAL = gql`
query getMyCredential {
  user(where: { is_public: { _eq: false} }) {
    id
    name
    email
}
}`

export const IndexPage = () => {
  const auth = useAuthContext();
  const { loading, error, data } = useQuery(GET_MY_CREDENTIAL);



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

      <div>
        <div>
          status: {auth.userCredential.status}
        </div>
        <div>
          user: {auth.userCredential.user?.name}
        </div>
      </div>
      
      <div>
        {loading && <p>Loading...</p>}
      </div>
      <div>
        {data && data.user.name}
      </div>

      <div>
        {error && error.message}
      </div>

    </div>
  );
}

export default withApollo(IndexPage)
