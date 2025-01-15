```javascript
// pages/index.js
import { Suspense } from 'react';
import MyServerComponent from './MyServerComponent';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyServerComponent/>
    </Suspense>
  );
}

// pages/MyServerComponent.js

export default function MyServerComponent() {
  const data = useServerData();
  return (
    <div>
      <p>Data from server: {JSON.stringify(data)}</p>
      <ClientComponent data={data}/>
    </div>
  );
}

// pages/ClientComponent.js

export default function ClientComponent({ data }) {
  return (
    <div>
      <p>Client Component:</p>
      <p>Data received: {JSON.stringify(data)}</p>
    </div>
  );
}

// pages/api/data.js

import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = { timestamp: Date.now(), someData: Math.random() };
  res.status(200).json(data);
}

// pages/useServerData.js

import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useServerData() {
  const { data } = useSWR('/api/data', fetcher);
  return data;
}
```