import { useAuthContext } from '@/hooks/useAuthContext'
import { withApollo } from '@/services/apollo'
import React from 'react'

export const IndexPage = () => {
  const auth = useAuthContext()
  console.log(auth.userCredential);
  return (
    <div>
      <h1>YES</h1>
      <button onClick={() => auth.logIn('google')}>
        Google Login
      </button>
      <button onClick={() => auth.logIn('facebook')}>
        Faceboook Login
      </button>

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
  );
}

export default withApollo()(IndexPage)