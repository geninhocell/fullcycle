import { Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { HeadTitle } from '../../components/Head';
import { Page } from '../../components/Page';
import makeHttp from '../../utils/http';

const ReportsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('reports', data);
      router.push('/reports');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  if (
    typeof window !== 'undefined' &&
    initialized &&
    !keycloak?.authenticated
  ) {
    router.replace(`/login?from=${window?.location.pathname}`);

    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
      <HeadTitle title="Novo relatório" />
      <Typography component="h1" variant="h4">
        Novo relatório
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  {...register('start_date')}
                  type="date"
                  required
                  label="Início"
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('end_date')}
                  type="date"
                  label="Fim"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Box marginTop={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Page>
  ) : null;
};

export default ReportsNewPage;
