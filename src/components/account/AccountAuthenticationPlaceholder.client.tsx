import {useCallback, useEffect, useRef} from 'react';

import {useNavigate} from '@shopify/hydrogen';

export function AccountAuthenticationPlaceholder({
  code,
}: {
  code: string | null;
}) {
  const navigate = useNavigate();
  const isInFlight = useRef(false);

  useEffect(() => {
    if (code && !isInFlight.current) {
      const authWithStrava = async () => {
        const response = await callLoginApi({
          code,
        });

        if (response.errors) {
          console.log(response.errors);
        } else {
          navigate('/products/builder');
        }

        isInFlight.current = true;
      };
      authWithStrava();
    }
  }, [code, navigate]);

  return (
    <>
      <p>Authenticating {code}</p>
      <p>Loading...</p>
    </>
  );
}

export async function callLoginApi({code}: {code: string}) {
  try {
    const res = await fetch(`/account/auth`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({code}),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (error: any) {
    return {
      error: error.toString(),
    };
  }
}

function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return useCallback(() => isMounted.current, []);
}
