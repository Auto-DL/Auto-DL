import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    display: 'flex',
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

const PublishToGithub = () => {
    const classes = useStyles();
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");


    async function publish_code_to_github() {
        const username = JSON.parse(localStorage.getItem("username"));
        const token = JSON.parse(localStorage.getItem("token"));
        const details = JSON.parse(localStorage.getItem("publish_details"));
        console.log("publishingggggggg");
        if (code && username && token && details) {
            console.log("kushal")
            const data = { username, code, details };
            const res = await HomeService.publish_to_github(token, data);
            if (res.status === 200) {
                history.push({
                    pathname: '/github/status',
                    state: {
                        message: "success",
                        repo_full_name: res.data.repo_full_name
                    }
                });
            }
            else {
                history.push({
                    pathname: '/github/status',
                    state: {
                        message: "failed",
                        repo_link: res.repo_full_name

                    }
                });
            }
        }
        else {
            // console.log("self push")
            // history.push("/home");
        }
        localStorage.removeItem("publish_details");
    }
    useEffect(() => {
        publish_code_to_github();

    }, []);



    return (
        <div style={{ marginTop: "20px" }}>

            {/* <CircularProgress color="secondary" disableShrink /> */}
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"

            >
                <CircularProgress size={50} color="primary" />

            </Grid>




        </div >
    );
};

export default PublishToGithub;
