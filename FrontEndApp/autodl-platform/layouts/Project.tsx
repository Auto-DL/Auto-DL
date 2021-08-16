import React, { ReactNode } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import PrimaryAppBar from "../components/AppBar/AppBar";
import SideBar from "../components/SideBar/SideBar";

type Props = {
  children?: ReactNode;
  name: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbar: {
      marginLeft: theme.spacing(7) + 1
    }
  }),
);

export default function Project({ children, name }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.navbar}>
      <PrimaryAppBar projectName={name}/>
      <SideBar projectName={name}/>
      <Container maxWidth='lg'>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
