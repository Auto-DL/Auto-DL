import React, {useState}from "react";

// UI Components
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

// Colors
import { green } from "@mui/material/colors";

function ProfileFieldBlock(props) {
  const [fields, setFields] = React.useState([]);

  // Form State
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");

  const handleFname = (val) => {
    setFname(val);
  }

   const handleLname = (val) => {
    setLname(val);
  }

   const handleDisplayName = (val) => {
    setDisplayName(val);
  }

   const handleEmail = (val) => {
    setEmail(val);
  }

  // Life Cycle
  React.useEffect(() => {
    setFields(props.data);
  }, [props.data]);

  // Dynamic Field Controller
  const dynamicInputFieldController = (input) => {
    switch(input.toLowerCase().trim().split(" ")[0]){
      case "first":
        return [
          fname, handleFname
        ];
        break
      case "last":
        return [
          lname, handleLname
        ];
        break
      case "display":
        return [
          displayName, handleDisplayName
        ];
        break
      case "email":
        return [
          email, handleEmail
        ];
        break
      default:
        return false;
        break
    }
  }

  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          p: 2,
          borderRadius: 3,
          bgcolor: `${props.theme === "light" ? "#bdbdbd" : "#21212B"}`,
        }}
      >
        {/* Fields */}
        <Stack spacing={2}>
          {fields?.map((field) => {
            return (
              <>
                {field.buttonProps ? (
                  <ProfileField
                    key={field.name + "-" + field.id}
                    nameLabel={field.name}
                    defaultValue={field.value}
                    buttonLabel={field.btnLabel}
                    btnProps={field.buttonProps}
                    data={field}
                    theme={props.theme}

                    inputVal={dynamicInputFieldController(field.name)[0]}
                    handlerFunc={dynamicInputFieldController(field.name)[1]}
                  />
                ) : (
                  <ProfileField
                    key={field.id}
                    nameLabel={field.name}
                    defaultValue={field.value}
                    buttonLabel={field.btnLabel}
                    data={field}
                    theme={props.theme}

                    inputVal={dynamicInputFieldController(field.name)[0]}
                    handlerFunc={dynamicInputFieldController(field.name)[1]}
                  />
                )}
              </>
            );
          })}
        </Stack>
      </Box>
    </>
  );
}

const ProfileField = ({
  nameLabel,
  defaultValue,
  buttonLabel,
  btnProps,
  data,
  theme,
  inputVal,
  handlerFunc
}) => {
  const [fieldValue, setFieldValue] = React.useState(defaultValue);
  const [inputValue, setInputValue] = React.useState(inputVal);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = () => {
    setFieldValue(inputValue.trim());
    handlerFunc(inputValue.trim());
    setIsEditing(false);
    // TODO - Update user details on Server Asynchronously
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    handlerFunc(e.target.value);
  };

  return (
    <Box
      xs={{
        height: "auto",
        width: "100%"
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        {/* Form */}
        <Stack spacing={0}>
          {/* Label */}
          {!isEditing ? (
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "400",
                color: "#3f51b5"
              }}
              variant="caption"
            >
              {nameLabel}
            </Typography>
          ) : null}

          {/* Value */}
          {isEditing ? (
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" }
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="filled-basic"
                label={nameLabel}
                variant="filled"
                size="small"
                defaultValue={fieldValue}
                color="info"
                onChange={handleChange}
                type={data.type ? data.type : "text"}
              />
            </Box>
          ) : (
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "500",
                color: `${theme === "light" ? "#181820" : "#ffffff"}`,
              }}
            >
              {data.type === "password"
                ? "*".repeat(fieldValue.length)
                : fieldValue}
            </Typography>
          )}
        </Stack>

        {/* Change */}
        {isEditing ? (
          <Button
            {...btnProps}
            size="small"
            variant="container"
            sx={{
              bgcolor: green[500],
              borderRadius: 2,
              fontSize: "14px",
              color: "#fff",
              fontWeight: 400,
              textTransform: "capitalize"
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
          <Button
            {...btnProps}
            size="small"
            variant="container"
            sx={{
              bgcolor: `${theme === "light" ? "#aaa" : "#252934"}`,
              borderRadius: 2,
              fontSize: "14px",
              color: `${theme === "light" ? "#131313" : "#fff"}`,
              fontWeight: `${theme === "light" ? 700 : 400}`,
              textTransform: "capitalize"
            }}
            onClick={() => setIsEditing(!isEditing)}
          >
            {buttonLabel}
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default ProfileFieldBlock;
