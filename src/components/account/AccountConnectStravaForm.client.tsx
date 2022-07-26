import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';
import {getInputStyleClasses} from '../../lib/styleUtils';

interface FormElements {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

const getStravaEndpoint = ({clientId, uri}: {clientId: string; uri: string}) =>
  `http://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${uri}&approval_prompt=force&scope=activity:read,read`;

const STRAVA_ENDPOINT = getStravaEndpoint({
  clientId: '73615',
  uri: 'http://localhost:3001/account/auth',
});

export function AccountConnectStravaForm() {
  const navigate = useNavigate();

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    event.preventDefault();
    navigate(STRAVA_ENDPOINT);
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          <ConnectButton />
        </form>
      </div>
    </div>
  );
}

function ConnectButton() {
  return (
    <div className="flex items-center justify-between">
      <button
        className="bg-primary rounded text-contrast py-2 px-4 focus:shadow-outline block w-full"
        type="submit"
      >
        Connect to Strava
      </button>
    </div>
  );
}
