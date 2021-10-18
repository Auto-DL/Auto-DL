import React, { useState, useEffect } from "react";

// History API
import { useHistory } from "react-router-dom";

// External Components
import ProfileFieldBlock from "./ProfileFieldBlock";

// UI Components
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";

// Layout UIs
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";

// Text UIs
import Typography from "@mui/material/Typography";

// Display
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Button UIs
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
// import LoadingButton from "@mui/lab/LoadingButton";

// Icon UIs
import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Custom Input Component
const Input = styled("input")({
  display: "none"
});

function ProfileIndex(props) {
  // History
  const history = useHistory();

  // State variables
  const [avatarSrc, setAvatarSrc] = React.useState("");
  const [userName, setUserName] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // UI State Variables
  const [theme, setTheme] = useState("light");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageChange = (evt) => {
    let name = evt.target.files[0].name.split(".")[0];
    // let path = evt.target.value;
    let url = URL.createObjectURL(evt.target.files[0]);
    console.log(name);
    setAvatarSrc(url);
  };

  // Logout
  const logout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  // Life Cycle
  useEffect(() => {
    // code goes in here
  }, [avatarSrc]);

  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="xl"
        disableGutters={true}
        sx={{
          height: "100vh",
          width: "100vw",
          overflowX: "hidden",
          overflowY: "scroll",
          bgcolor: `${theme === "light" ? "#E5E5E5" : "#181820"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      >
        {/* Inner Wrapper */}
        <Container
          maxWidth="sm"
          disableGutters={true}
          sx={{
            height: "auto",
            width: "100vw",
            pt: { xs: 7, sm: 7 },
            bgcolor: `${theme === "light" ? "#E5E5E5" : "#181820"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {/* User Card Wrapper */}
          <Box
            sx={{
              bgcolor: `${theme === "light" ? "#E5E5E5" : "#181820"}`,
              height: "100%",
              width: "100%"
            }}
            // pl={{ xs: 7, sm: 0 }}
          >
            <Stack spacing={2} direction="column">
              {/* <Box
                sx={{
                  height: 70,
                  width: "100%",
                  bgcolor: "#21212B"
                }}
              ></Box> */}

              {/* Profile Card */}
              <Box
                sx={{
                  height: "100%",
                  width: "100%"
                }}
              >
                {/* Profile Sections */}
                <Stack
                  sx={{
                    p: 2,
                    px: 3
                  }}
                  spacing={2}
                  direction="column"
                >
                  {/* Top Section */}
                  <Box
                    sx={{
                      height: 50,
                      width: "100%",
                      bgcolor: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Stack
                      alignItems="center"
                      justifyContent="space-between"
                      direction="row"
                      sx={{
                        height: "100%",
                        width: "100%"
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        {/* Back Button */}
                        <Box
                          sx={{
                            bgcolor: "#3f51b5",
                            height: "30px",
                            width: "30px",
                            borderRadius: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <IconButton
                            size="large"
                            sx={{ color: "#fff" }}
                            aria-label="Overflow Button"
                            onClick={() => history.goBack()}
                          >
                            <KeyboardArrowLeftIcon fontSize="inherit" />
                          </IconButton>
                        </Box>
                        <Typography
                          variant="body1"
                          fontWeight={400}
                          sx={{
                            color: `${theme === "light" ? "#181820" : "#ffffff"}`,
                            ml: 1
                          }}
                        >
                          My Profile
                        </Typography>
                      </Stack>

                      {/* Overflow Btn */}
                      <Box sx={{ display: { xs: "block", sm: "block", md: "block", lg: "none" } }}>
                        <IconButton
                          size="large"
                          sx={{ 
                            color: `${theme === "light" ? "#aaa" : "#3f51b5"}`
                            }}
                          aria-label="Overflow Button"
                          id="basic-button"
                          aria-controls="basic-menu"
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}
                        >
                          <MoreHorizIcon fontSize="inherit" />
                        </IconButton>

                        <Menu
                          id="basic-menu"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                          MenuListProps={{
                            "aria-labelledby": "basic-button"
                          }}
                        >
                          <MenuItem onClick={logout}>Logout</MenuItem>
                          <MenuItem onClick={handleClose}>
                            Delete Account
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Profile Section */}
                  <Box
                    sx={{
                      height: 100,
                      width: "100%",
                      bgcolor: "inherit",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-start"
                      spacing={2}
                      sx={{
                        width: "100%"
                      }}
                    >
                      {/* Avatar */}
                      <Box sx={{}}>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                          }}
                          badgeContent={
                            <label htmlFor="icon-button-file">
                              <Input
                                accept="image/*"
                                id="icon-button-file"
                                type="file"
                                onChange={handleImageChange}
                              />
                              <Box
                                aria-label="upload picture"
                                sx={{
                                  color: `${theme === "light" ? "#E5E5E5" : "#181820"}`,
                                  bgcolor: "#fff",
                                  borderRadius: "100%",
                                  p: 2,
                                  height: 30,
                                  width: 30,
                                  border: `${theme === "light" ? "3px solid #E5E5E5" : "3px solid #181820"}`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  cursor: "pointer"
                                }}
                              >
                                <PhotoCamera fontSize="small" />
                              </Box>
                            </label>
                          }
                        >
                          <Avatar
                            sx={{
                              height: 90,
                              width: 90
                            }}
                            alt={userName}
                            src={avatarSrc}
                          />
                        </Badge>
                      </Box>

                      {/* User Detail */}
                      <Box>
                        <Stack spacing={1}>
                          <Typography
                            fontWeight={700}
                            variant="body1"
                            sx={{
                              color: `${theme === "light" ? "#181820" : "#ffffff"}`,
                            }}
                          >
                            John Doe
                          </Typography>
                          <Box
                            sx={{
                              height: "35px",
                              width: "90px",
                              border: "2px solid #fff",
                              borderImageSlice: 1,
                              borderImageSource:
                                "linear-gradient(to left, #1D87F6, #4BCB90)",
                              borderRadius: "7px",
                              borderColor: "primary.main",
                              color: `${theme === "light" ? "#181820" : "#ffffff"}`,
                              fontSize: "14px",
                              fontWeight: "400",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            USER
                          </Box>
                        </Stack>
                      </Box>
                    </Stack>
                  </Box>

                  {/* Field Block */}
                  <ProfileFieldBlock
                    theme={theme}
                    data={[
                      {
                        id: 1,
                        name: "First Name",
                        value: "John",
                        btnLabel: "Edit",
                        buttonProps: { disabled: true }
                      },
                      {
                        id: 2,
                        name: "Last Name",
                        value: "Doe",
                        btnLabel: "Edit",
                        buttonProps: { disabled: true }
                      }
                    ]}
                  />

                  {/* Field Block */}
                  <ProfileFieldBlock
                    theme={theme}
                    data={[
                      {
                        id: 1,
                        name: "Display Name",
                        value: "John Doe",
                        btnLabel: "Edit",
                        buttonProps: { disabled: true }
                      },
                      {
                        id: 2,
                        name: "Email",
                        value: "johndoe@gmail.com",
                        btnLabel: "Default",
                        buttonProps: { disabled: true }
                      }
                      // {
                      //   id: 3,
                      //   name: "Password",
                      //   value: "**********",
                      //   btnLabel: "Change",
                      //   type: "password",
                      //   buttonProps: { disabled: true }
                      // }
                    ]}
                  />

                  {/* Signout CTA */}
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      disableElevation
                      variant="contained"
                      size="large"
                      color="error"
                      sx={{
                        width: { xs: "100%", sm: "150px" },
                        mx: "auto",
                        bgcolor: `${theme === "light" ? "#aaa" : "#252934"}`,
                        color: `${theme === "light" ? "#131313" : "#fff"}`,
                        fontWeight: `${theme === "light" ? 700 : 500}`,
                      }}
                      onClick={logout}
                    >
                      Sign Out
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Container>
    </>
  );
}

export default ProfileIndex;
