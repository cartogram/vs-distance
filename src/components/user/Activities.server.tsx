import {fetchSync, Link, useSession, CacheLong} from '@shopify/hydrogen';
import {Heading} from '~/components';

export function Activities() {
  const {stravaAccessToken} = useSession();
  const data = fetchSync('https://www.strava.com/api/v3/athlete/activities', {
    headers: {
      Authorization: `Bearer ${stravaAccessToken}`,
    },
    cache: CacheLong(),
  }).json();

  if (data.errors) {
    if (data.message === 'Authorization error') {
      fetchSync('/account/logout', {method: 'POST'});

      return (
        <p>
          Error {data.message} <Link to="account/login">Login</Link>
        </p>
      );
    }
  }

  return (
    <Heading as="h1" size="copy">
      Activities {data.length}
    </Heading>
  );
}
