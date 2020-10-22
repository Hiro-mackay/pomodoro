import React from 'react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import App, { AppContext } from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import { createApolloClient } from './createApolloClient';
import { ApolloClient } from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { AuthProvider } from '@/authentication';

interface NextPageContextWithApollo extends NextPageContext {
  apolloClient: ApolloClient<NormalizedCacheObject> | null;
  apolloState: NormalizedCacheObject;
  ctx: NextPageContextApp;
}

type NextPageContextApp = NextPageContextWithApollo & AppContext;

// On the client, we store the Apollo Client in the following variable.
// This prevents the client from reinitializing between page transitions.
let globalApolloClient: ApolloClient<NormalizedCacheObject> | null = null;


/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
export const initOnContext = (ctx: NextPageContextApp) => {
  const inAppContext = Boolean(ctx.ctx);

  // We consider installing `withApollo({ ssr: true })` on global App level
  // as antipattern since it disables project wide Automatic Static Optimization.
  if (process.env.NODE_ENV === 'development') {
    if (inAppContext) {
      console.warn(
        'Warning: You have opted-out of Automatic Static Optimization due to `withApollo` in `pages/_app`.\n' +
          'Read more: https://err.sh/next.js/opt-out-auto-static-optimization\n'
      );
    }
  }

  // Initialize ApolloClient if not already done
  const apolloClient =
    ctx.apolloClient ||
    initApolloClient(ctx.apolloState || {}, inAppContext ? ctx.ctx : ctx);

  // We send the Apollo Client as a prop to the component to avoid calling initApollo() twice in the server.
  // Otherwise, the component would have to call initApollo() again but this
  // time without the context. Once that happens, the following code will make sure we send
  // the prop as `null` to the browser.
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

async function getHeaders(ctx) {
  if (typeof window !== 'undefined') return null;
  if (typeof ctx.req === 'undefined') return null;
   
  const a = new AuthProvider()
  const authState = await a.onAuthState()

  if (!authState ) return null

  const [_, token] = authState;

  return {
    authorization: `Bearer ${token}`
  }
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (initialState: NormalizedCacheObject, ctx?: any) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx);
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx);
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo = (PageComponent: React.ComponentType<any> & { getInitialProps?: Function }, { ssr = true } = {}) => {

  return class ApolloClient extends React.Component {
    // static userCredential = useAuthContext().userCredential;
    static displayName = `withApollo(${PageComponent?.displayName || PageComponent?.name || 'Component'})`;
    private apolloClient: any;
  
    static async getInitialProps(ctx: NextPageContextApp) {
      const inAppContext = Boolean(ctx.ctx);

      const apolloClient = (ctx.apolloClient = initApolloClient(null, await getHeaders(ctx)))

      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx);
      }

      if (typeof window === 'undefined') {
        const { AppTree } = ctx;

        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && (ctx.res.headersSent || ctx.res.finished)) {
          return pageProps;
        }

        if (ssr && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import('@apollo/react-ssr');

            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            let props: any;
            if (inAppContext) {
              props = { ...pageProps, apolloClient };
            } else {
              props = { pageProps: { ...pageProps, apolloClient } };
            }

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            // eslint-disable-next-line react/jsx-props-no-spreading
            await getDataFromTree(<AppTree {...props} />);

          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }
          Head.rewind();
        }

      }
      
      return {
        ...pageProps,
        // Extract query data from the Apollo store
        apolloState: apolloClient?.cache.extract(),
      };

    }

    constructor(props: any) {
      super(props);
      this.apolloClient = initApolloClient(props.apolloState);
    }

    render() {

      return (
        <ApolloProvider client={this.apolloClient}>
          <PageComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};


