import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const useUserSession = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSessionId(session?.user?.email || null);
    };

    fetchSession();
  }, []);

  return sessionId;
};

export default useUserSession;
