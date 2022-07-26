import {fetchSync, Image, useSession, CacheLong} from '@shopify/hydrogen';
import {Heading} from '~/components';

export function User() {
  const {stravaAccessToken} = useSession();
  const data = fetchSync('https://www.strava.com/api/v3/athlete', {
    headers: {
      Authorization: `Bearer ${stravaAccessToken}`,
    },
    cache: CacheLong(),
  }).json();

  if (data.errors) {
    return <p>Error {data.message}</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <Heading as="h1" size="copy">
      <Image
        className="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
        src={data.profile || 'placeholder.jpg'}
        alt={data.username}
        width={100}
        height={100}
      />
      <div className="text-center space-y-2 sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">{data.username}</p>
        </div>
        <div className="space-y-0.5">
          <p className="text-lg text-black font-semibold">
            {data.firstname} {data.lastname}
          </p>
        </div>
      </div>
    </Heading>
  );
}
