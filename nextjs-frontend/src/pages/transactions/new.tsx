import {
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
} from '@material-ui/core';
import { useKeycloak } from '@react-keycloak/ssr';
import { KeycloakInstance } from 'keycloak-js';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { HeadTitle } from '../../components/Head';
import { Page } from '../../components/Page';
import makeHttp from '../../utils/http';

import {
  TransactionCategoryLabels,
  TransactionTypeLabels,
} from '../../utils/models';

const TransactionsNewPage: NextPage = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const { initialized, keycloak } = useKeycloak<KeycloakInstance>();

  async function onSubmit(data: any) {
    try {
      await makeHttp().post('transactions', data);
      router.push('/transactions');
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
    router.replace(`/login?from=${window.location.pathname}`);

    return null;
  }

  return keycloak?.authenticated ? (
    <Page>
      <HeadTitle title="Nova transacão" />
      <Typography component="h1" variant="h4">
        Nova transação
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <TextField
              {...register('payment_date')}
              type="date"
              required
              label="Data pagamento"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              {...register('name')}
              label="Nome"
              required
              fullWidth
              inputProps={{ maxLength: 255 }}
            />

            <TextField
              {...register('description')}
              label="Descrição"
              required
              fullWidth
            />

            <TextField
              {...register('category')}
              select
              label="Categoria"
              required
              fullWidth
            >
              {TransactionCategoryLabels.map((i, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              {...register('amount', { valueAsNumber: true })}
              type="number"
              label="Valor"
              required
              fullWidth
            />

            <TextField
              {...register('type')}
              select
              label="Tipo de operação"
              required
              fullWidth
            >
              {TransactionTypeLabels.map((i, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <MenuItem key={key} value={i.value}>
                  {i.label}
                </MenuItem>
              ))}
            </TextField>

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
      </form>
    </Page>
  ) : null;
};

export default TransactionsNewPage;
