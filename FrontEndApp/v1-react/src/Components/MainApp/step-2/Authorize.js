import React from "react";
// import HomeService from "./HomeService";

import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";

const AuthorizeGitHub = () => {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");

    const publish_code_to_github = async () => {
        console.log("publishingggggggg");
        const username = JSON.parse(localStorage.getItem("username"));
        const token = JSON.parse(localStorage.getItem("token"));
        const details = JSON.parse(localStorage.getItem("publish_details"));
        if (code && username && details) {
            const data = { username, code, details };
            console.log("data is", data);
            const res = await HomeService.publish_to_github(token, data);
            if (res.status === 200) {
                console.log("doneeeeeeeeeeee");
                history.push({
                    pathname: '/github/publish',
                    state: {
                        message: "success"
                    }
                });
            }
            else {

                history.push({
                    pathname: '/github/publish',
                    state: {
                        message: "failed"
                    }
                });
            }
            // localStorage.removeItem("publish_details");

        } else {
        }
    };

    publish_code_to_github();

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Authorize GitHub</h1>
                </div>
            </div>
        </div>
    );
};

export default AuthorizeGitHub;
