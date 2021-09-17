import {
  Column,
  IntegratedFiltering,
  SortingState,
  IntegratedPaging,
  SearchState,
  PagingState,
} from '@devexpress/dx-react-grid';
import { Typography, Button } from '@material-ui/core';
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableHeaderRow,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import { NextPage } from 'next';
import { format, parseISO } from 'date-fns';
import AddIcon from '@material-ui/icons/Add';
import { useRouter } from 'next/router';
import makeHttp from '../../utils/http';
import { Transaction } from '../../utils/models';
import { Page } from '../../components/Page';
import { withAuth } from '../../hof/withAuth';
import { HeadTitle } from '../../components/Head';

interface TransactionsPageProps {
  transactions: Transaction[];
}

const columns: Column[] = [
  {
    name: 'payment_date',
    title: 'Data pag',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
  {
    name: 'name',
    title: 'Nome',
  },
  {
    name: 'category',
    title: 'Categoria',
  },
  {
    name: 'type',
    title: 'Operação',
  },
  {
    name: 'created_at',
    title: 'Criado em',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
];

const TransactionsPage: NextPage<TransactionsPageProps> = ({
  transactions,
}) => {
  const router = useRouter();
  return (
    <Page>
      <HeadTitle title="Minhas transações" />
      <Typography component="h1" variant="h4">
        Minhas transações
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push('/transactions/new')}
      >
        Criar
      </Button>

      <Grid rows={transactions} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[
            {
              columnName: 'created_at',
              direction: 'desc',
            },
          ]}
        />
        <SearchState defaultValue="Conta de luz" />
        <PagingState defaultCurrentPage={0} pageSize={5} />
        <TableHeaderRow showSortingControls />
        <IntegratedFiltering />
        <Toolbar />
        <SearchPanel />
        <PagingPanel />
        <IntegratedPaging />
      </Grid>
    </Page>
  );
};

export const getServerSideProps = withAuth(async (ctx, { token }) => {
  const { data } = await makeHttp(token).get('/transactions');

  return {
    props: { transactions: data },
  };
});

export default TransactionsPage;
