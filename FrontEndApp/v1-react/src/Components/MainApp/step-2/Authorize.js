import React from "react";
// import HomeService from "./HomeService";

import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";

const AuthorizeGitHub = () => {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    localStorage.setItem("code", JSON.stringify(code));

    const get_git_accesss_token = async () => {
        const code = JSON.parse(localStorage.getItem("code"));
        const username = JSON.parse(localStorage.getItem("username"));
        const token = JSON.parse(localStorage.getItem("token"));
        if (code && username) {
            const data = { username, code };
            console.log("data is", data);
            const res = await HomeService.set_git_access_token(token, data);
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
                // setalert({ ...values, msg: res.data.message, severity: "error" });
                // history.push("/home");
                history.push({
                    pathname: '/github/publish',
                    state: {
                        message: "failed"
                    }
                });
            }

        } else {
        }
    };

    const git_access_token = localStorage.getItem("git_access_token");
    if (git_access_token) {
        console.log("got the token");
    } else {
        get_git_accesss_token();
    }

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
