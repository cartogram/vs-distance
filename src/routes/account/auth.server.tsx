import {Suspense} from 'react';
import url from 'url';
import {
  CacheNone,
  Seo,
  gql,
  type HydrogenRouteProps,
  HydrogenRequest,
  HydrogenApiRouteOptions,
} from '@shopify/hydrogen';

import {AccountAuthenticationPlaceholder} from '~/components';
import {Layout} from '~/components/index.server';

export default function Auth({response, request, params}: HydrogenRouteProps) {
  response.cache(CacheNone());

  const searchParams = new URLSearchParams(request.url);

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Authenticating'}} />
      </Suspense>
      <AccountAuthenticationPlaceholder code={searchParams.get('code')} />
    </Layout>
  );
}

export async function api(
  request: HydrogenRequest,
  {session}: HydrogenApiRouteOptions,
) {
  if (!session) {
    return new Response('Session storage not available.', {status: 400});
  }

  const jsonBody = await request.json();

  const body = {
    client_secret: Oxygen.env.STRAVA_CLIENT_SECRET,
    client_id: Oxygen.env.STRAVA_CLIENT_ID,
    code: jsonBody.code,
    grant_type: 'authorization_code',
  };

  console.log(body);

  const response = await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  console.log(data);

  if (data?.access_token) {
    await session.set('stravaAccessToken', data.access_token);

    return new Response(null, {
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        error: 'Could not authenticate with Strava.',
      }),
      {status: 401},
    );
  }
}
