import { createContext, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { useAuthSwr } from '../hooks/useAuhtSwr';

export interface Tenant {
  id: string;
  name: string;
  subdomain: string;
  balance: number;
}

export const TenantContext = createContext<Tenant>(null as any);

export const TenantProvider: React.FunctionComponent = ({ children }) => {
  const [tenant, setTenant] = useState<Tenant>();

  const { data } = useAuthSwr('my-account', {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (!isEqual(data, tenant)) {
      setTenant(data);
    }
  }, [data, tenant]);

  return (
    <TenantContext.Provider value={tenant as any}>
      {children}
    </TenantContext.Provider>
  );
};
