import React from "react";
import Link from "next/link";
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

type Props = {
  projectName: string | string[] | undefined;
};

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectCard({ projectName }: Props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Project Name
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Categories
        </Typography>
        <Typography variant="body2" component="p">
          This is the project description(150 chars max)
          <br />
          Status
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/project?projectName=${projectName}`} passHref>
          <Button size="small">Open</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
