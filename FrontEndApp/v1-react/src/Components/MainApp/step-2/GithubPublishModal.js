import React, { useState } from "react";
import {
  Button,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { useStyles, DialogTitle, DialogContent } from "./styles.js";
import HomeService from "../HomeService";

import CircularProgress from "@material-ui/core/CircularProgress";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Backdrop from "@material-ui/core/Backdrop";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { useHistory } from "react-router-dom";
const GithubPublishModal = ({
  username,
  gitusername,
  token,
  project_details,
  handleClose,
  setOpenModal,
  handleToggle,
  setalert,
  setAlertopen,
  open,
  setOpen,
  setOpenGitHubDetails,
}) => {
  const history = useHistory();
  const classes = useStyles();

  const anchorRef = React.useRef(null);
  const [spinner, setSpinner] = useState(false);
  const CLIENT_ID = process.env.REACT_APP_GITHUB_APP_CLIENT_ID;
  const [publishOptions, setPublishOptions] = useState({
    commit_message: "Initial commit from Auto-DL",
    repo_name: project_details.project_name,
    filename: "",
    make_private: false,
  });
  const { make_private } = publishOptions;

  const handleGitLogout = async () => {
    const data = {
      username: username,
    };
    const res = await HomeService.logout_github(token, data);
    if (res.status === 200) {
      setalert({ msg: res.data.message, severity: "success" });
    } else {
      setalert({ msg: res.data.message, severity: "error" });
    }
    setAlertopen(true);
    setOpenGitHubDetails(false);
  };

  const handlePublishChange = (event) => {
    if (event.target.checked) {
      setPublishOptions({
        ...publishOptions,
        [event.target.name]: true,
      });
    } else
      setPublishOptions({
        ...publishOptions,
        [event.target.name]: event.target.value,
      });
  };
  const handleAuthorize = async () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`;
  };

  const handlePublishClick = async (e) => {
    e.preventDefault();

    if (
      publishOptions.commit_message &&
      publishOptions.commit_message.trim() !== "" &&
      publishOptions.repo_name &&
      publishOptions.repo_name.trim() !== "" &&
      publishOptions.filename &&
      publishOptions.filename.trim() !== "" &&
      publishOptions.make_private !== undefined
    ) {
      const details = {
        git_commit_message: publishOptions.commit_message.trim(),
        git_repo_name: publishOptions.repo_name.trim(),
        git_file_name: publishOptions.filename.trim(),
        make_private: publishOptions.make_private,
        project_id: project_details.project_id,
      };

      setSpinner(true);
      const data = { username, details };
      const res = await HomeService.publish_to_github(token, data);
      if (res.status === 200) {
        history.push({
          pathname: "/github/status",
          state: {
            message: "success",
            repo_full_name: res.data.repo_full_name,
            response_from: "publish",
          },
        });
      } else {
        history.push({
          pathname: "/github/status",
          state: {
            message: "failed",
            repo_link: res.repo_full_name,
            response_from: "publish",
          },
        });
      }
      setSpinner(false);
    }
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <>
      <DialogTitle id="alert-dialog-title">
        Publish to GitHub
        {gitusername ? (
          <>
            <Button
              variant="outlined"
              color="primary"
              style={{ float: "right" }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              {gitusername}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem onClick={handleGitLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ float: "right" }}
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleAuthorize}
          >
            Authorize
          </Button>
        )}
      </DialogTitle>
      <DialogContent dividers>
        <Backdrop
          className={classes.backdrop}
          open={spinner}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Typography variant="body1" gutterBottom>
          Enter the following details to proceed:
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Filename"
          name="filename"
          size="small"
          autoComplete="Filename"
          onChange={handlePublishChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Repository name (must be a new repo)"
          defaultValue={project_details.project_name}
          size="small"
          name="repo_name"
          autoComplete="Repository name"
          onChange={handlePublishChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="commit_message"
          label="Commit message"
          defaultValue={"Initial commit from Auto-DL"}
          onChange={handlePublishChange}
          size="small"
          autoComplete="Commit message"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={make_private}
              color="primary"
              onChange={handlePublishChange}
              name="make_private"
            />
          }
          label="Make private"
        />

        <Box my={1}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handlePublishClick(e)}
            disabled={gitusername ? false : true}
          >
            Publish
          </Button>
        </Box>
      </DialogContent>
    </>
  );
};

export default GithubPublishModal;
