// lib/trpc.ts

import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { createServerSideHelpers } from '@trpc/react-query/server';
import superjson from 'superjson';
import { type AppRouter } from '~/server/api/root';

const proxyClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchLink({
        url: 'http://localhost:3000/api/trpc',
        transformer: superjson
    }),
  ],
});

const helpers = createServerSideHelpers({
  client: proxyClient,
});

export default helpers;