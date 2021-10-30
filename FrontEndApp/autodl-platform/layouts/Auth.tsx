import React, { ReactChild } from "react";
import { Theme } from "@mui/material/styles";
import { createStyles, makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import PrimaryAppBar from "components/AppBar/AppBar";

type Props = {
  children?: ReactChild;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      marginTop: '3rem',
      width: '360px',
      [theme.breakpoints.up('sm')]: {
        width: '420px',
      },
      [theme.breakpoints.up('md')]: {
        width: '480px',
      },
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
