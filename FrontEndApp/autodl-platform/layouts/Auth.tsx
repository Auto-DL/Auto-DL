import React, { ReactChild } from "react";
import { createStyles, makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PrimaryAppBar from "components/AppBar/AppBar";

type Props = {
  children?: ReactChild;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 'auto',
      marginTop: '3rem',
      width: '35%',
    }
  }),
);

export default function Auth({ children }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {/* To be configured with Redux - isAuthenticated */}
      <PrimaryAppBar isAuthenticated={false} />
      <Container maxWidth='lg'>
        {children!}
      </Container>
    </Box>
  );
}
