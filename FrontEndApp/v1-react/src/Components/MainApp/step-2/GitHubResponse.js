import React from "react";
// import HomeService from "./HomeService";

import { useHistory } from "react-router-dom";

import { Grid } from "@material-ui/core";

const GitHubResponse = (response) => {
    var message = "";
    if (response && response.location && response.location.state) {
        message = response.location.state.message;
    }


    return (
        <div className="container">

            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={3}>
                    {message === "success" ? <h1 h1 > Successfully published </h1> : <h1 > Failed to publish </h1>}

                </Grid>

            </Grid>
            this
        </div >
    );
};

export default GitHubResponse;
