import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";
import { Grid } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";

const AuthorizeGithub = () => {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    const token = JSON.parse(localStorage.getItem("token"));
    const username = JSON.parse(localStorage.getItem("username"));

    async function authorize() {

        const data = { username, code };
        console.log(data);
        const response = await HomeService.authorize_github(token, data);
        console.log("respone from auth", response);
        if (response.status === 200) {
            history.push({
                pathname: "/github/status",
                state: {
                    message: "success",
                    response: "authorize"

                },
            });
        }
        else {
            history.push({
                pathname: "/github/status",
                state: {
                    message: "failed",
                    response: "authorize"
                },
            });
        }
    }
    useEffect(() => {
        authorize();
    }, []);

    return (
        <div style={{ marginTop: "20px" }}>
            <Grid container direction="column" alignItems="center" justify="center">
                <CircularProgress size={50} color="primary" />
            </Grid>
        </div>
    );
};

export default AuthorizeGithub;
