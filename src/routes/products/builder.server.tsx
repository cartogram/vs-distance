import {Suspense} from 'react';
import {useLocalization, useRouteParams} from '@shopify/hydrogen';

import {Layout, User, Activities} from '~/components/index.server';
import {Section} from '~/components';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  return (
    <Layout>
      <Section padding="x" className="px-0">
        <div className="grid items-start md:gap-6 lg:gap-20 md:grid-cols-2 lg:grid-cols-3">
          <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full max-w-xl gap-8 p-6 md:mx-auto md:max-w-sm md:px-0">
              <Suspense>
                <User />
              </Suspense>
              <Suspense>
                <Activities />
              </Suspense>
            </section>
          </div>
        </div>
      </Section>
    </Layout>
  );
}
