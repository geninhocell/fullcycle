import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoginPage: NextPage = () => {
  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  const { replace, query } = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { authenticated, login = () => {} } = keycloak || {};

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (!authenticated) {
      login();
    }
  }, [initialized, authenticated, login]);

  useEffect(() => {
    if (!initialized) {
      return;
    }
    if (authenticated) {
      replace((query.from as string) ?? '/');
    }
  }, [authenticated, initialized, query.from, replace]);

  return null;
};

export default LoginPage;
