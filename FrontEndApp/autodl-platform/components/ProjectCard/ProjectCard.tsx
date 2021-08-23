import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

type Props = {
  projectName: string | string[] | undefined;
}

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
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
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
        <Link href={`/project?projectName=${projectName}`}>
          <Button size="small">Open</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
