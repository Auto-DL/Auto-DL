import React from "react";
import Link from '@material-ui/core/Link';

import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import CircularProgress from '@material-ui/core/CircularProgress';

const GitHubResponse = (response) => {
    var message = "";
    var repo_full_name = "";
    var repo_link = "";


    console.log(response.location.state);
    if (response && response.location && response.location.state) {
        message = response.location.state.message;
        repo_full_name = response.location.state.repo_full_name;
        repo_link = `https://github.com/${repo_full_name}`
    }

    const linkHandler = (event) => {
        event.preventDefault();
        window.open(repo_link, "_blank");
    }

    return (
        <div className="container">

            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={5}>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        {message === "success" ?
                            <div>
                                <Typography variant="h5"  > <b>Successfully published</b></Typography>
                                <Typography variant="h6" >Check it out <Link href={repo_link} onClick={linkHandler}>
                                    here
                                </Link> </Typography>

                            </div>
                            :
                            <div>
                                <Typography variant="h5" color="secondary"><b>Failed to publish</b></Typography>
                                <Typography variant="h6" >Please try again.</Typography>
                            </div>


                        }
                    </div>


                </Grid>



            </Grid>

        </div >
    );
};

export default GitHubResponse;
