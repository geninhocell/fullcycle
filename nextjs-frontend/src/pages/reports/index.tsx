import { useKeycloak } from '@react-keycloak/ssr';
import { format, parseISO } from 'date-fns';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import AddIcon from '@material-ui/icons/Add';
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

import { useAuthSwr } from '../../hooks/useAuhtSwr';
import { Page } from '../../components/Page';
import { HeadTitle } from '../../components/Head';
import { withAuth } from '../../hof/withAuth';
import makeHttp from '../../utils/http';

const columns: Column[] = [
  {
    name: 'start_date',
    title: 'Inicio',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
  {
    name: 'end_date',
    title: 'Fim',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
  {
    name: 'status',
    title: 'Status',
  },
  {
    name: 'file_url',
    title: 'Download',
  },
  {
    name: 'created_at',
    title: 'Criado em',
    getCellValue: (row: any, columnName: string) => {
      return format(parseISO(row[columnName].slice(0, 10)), 'dd/MM/yyyy');
    },
  },
];

interface ReportsListPageProps {
  reports: {
    id: string;
    start_date: string;
    end_date: string;
    file_url?: string;
    status: string;
    account_id: string;
    created_at: string;
    update_at: string;
  }[];
}

const ReportsListPage: NextPage<ReportsListPageProps> = ({ reports }) => {
  const router = useRouter();
  const { data } = useAuthSwr('reports', {
    refreshInterval: 20000,
    fallbackData: reports,
  });

  return (
    <Page>
      <HeadTitle title="Meus relatórios" />
      <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
        Relatórios
      </Typography>

      <Button
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        onClick={() => router.push('/reports/new')}
      >
        Criar
      </Button>

      <Grid rows={data} columns={columns}>
        <Table />
        <SortingState
          defaultSorting={[
            {
              columnName: 'created_at',
              direction: 'desc',
            },
          ]}
        />
        <SearchState defaultValue="" />
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

export default ReportsListPage;

export const getServerSideProps = withAuth(async (ctx, { token }) => {
  const { data: reports } = await makeHttp(token).get('reports');

  return {
    props: {
      reports,
    },
  };
});
