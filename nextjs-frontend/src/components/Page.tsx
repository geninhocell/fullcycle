import { Container, makeStyles } from '@material-ui/core';
import { NextPage } from 'next';

import { NavBar } from './NavBar';

const useStyles = makeStyles({
  container: {
    height: 'calc(100% - 64px)',
  },
});

export const Page: NextPage = ({ children }) => {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container className={classes.container}>{children}</Container>
    </>
  );
};
