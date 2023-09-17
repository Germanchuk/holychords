import { getServerSession } from 'next-auth';
import React from 'react'
import WhoAmIButton from './WhoAmIButton';

export default async function ServerActionPage() {
    const whoAmI = async () => {
        "use server";
        const session = await getServerSession();
        return session?.user?.name || "Not logged in"
    };

  return (
    <div>
        <WhoAmIButton whoAmIAction={whoAmI} />
    </div>
  )
}
