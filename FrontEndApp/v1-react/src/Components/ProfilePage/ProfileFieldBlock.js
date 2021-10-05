import * as React from "react";

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

  React.useEffect(() => {
    setFields(props.data);
  }, [props.data]);

  return (
    <>
      <Box
        sx={{
          height: "auto",
          width: "100%",
          p: 2,
          borderRadius: 3,
          bgcolor: "#21212B"
        }}
      >
        {/* Fields */}
        <Stack spacing={2}>
          {fields?.map((field) => {
            return (
              <>
                {field.buttonProps ? (
                  <ProfileField
                    key={field.id}
                    nameLabel={field.name}
                    defaultValue={field.value}
                    buttonLabel={field.btnLabel}
                    btnProps={field.buttonProps}
                    data={field}
                  />
                ) : (
                  <ProfileField
                    key={field.id}
                    nameLabel={field.name}
                    defaultValue={field.value}
                    buttonLabel={field.btnLabel}
                    data={field}
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
  data
}) => {
  const [fieldValue, setFieldValue] = React.useState(defaultValue);
  const [inputValue, setInputValue] = React.useState("");
  const [isEditing, setIsEditing] = React.useState(false);

  const handleSave = () => {
    setFieldValue(inputValue.trim());
    setIsEditing(false);
    // TODO - Update user details on Server Asynchronously
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
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
                color: "#0066FF"
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
                color: "#fff"
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
              bgcolor: "#252934",
              borderRadius: 2,
              fontSize: "14px",
              color: "#fff",
              fontWeight: 400,
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
