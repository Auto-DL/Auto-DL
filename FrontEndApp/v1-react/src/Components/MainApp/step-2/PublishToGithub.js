import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";
import { Grid } from "@material-ui/core";


const PublishToGithub = () => {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    useEffect(() => {
        async function publish_code_to_github() {
            console.log("publishingggggggg");
            const username = JSON.parse(localStorage.getItem("username"));
            const token = JSON.parse(localStorage.getItem("token"));
            const details = JSON.parse(localStorage.getItem("publish_details"));
            if (code && username && token && details) {
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
                history.push("/home");
            }
            localStorage.removeItem("publish_details");
        }

        publish_code_to_github();

    });



    return (
        <div className="container">
            <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={5}>
                    Publish to Github
                </Grid>

            </Grid>
        </div >
    );
};

export default PublishToGithub;
