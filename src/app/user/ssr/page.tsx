import React from 'react';

export const dynamic = 'force-dynamic';

function page() {
  const time = new Date().toLocaleTimeString();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">SSR USER</h1>
      <h2 className="text-lg font-bold">{time}</h2>
    </div>
  );
}

export default page;
