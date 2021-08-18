import React from "react";
// import HomeService from "./HomeService";

import { useHistory } from "react-router-dom";
import HomeService from "../HomeService";

const AuthorizeGitHub = () => {
    const history = useHistory();
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const code = params.get("code");
    localStorage.setItem("code", code);

    const get_git_accesss_token = async () => {
        const code = localStorage.getItem("code");
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        if (code && username) {
            const data = { username, code };
            console.log("data is", data);

            const res = await HomeService.get_git_access_token(token, data);
            if (res.status === 200) {
                // localStorage.setItem("git_access_token", );
                localStorage.setItem("git_access_token", JSON.stringify(res.data.git_access_token));
                // localStorage.setItem("git_access_token", JSON.stringify(res.git_access_token.user));
                // setalert({ ...values, msg: res.data.message, severity: "success" });
                localStorage.removeItem("code");
                history.push("/home");
            }
            else {
                // setalert({ ...values, msg: res.data.message, severity: "error" });
                history.push("/home");
            }

        } else {
        }
    };

    const git_access_token = localStorage.getItem("git_access_token");
    if (git_access_token) {
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
