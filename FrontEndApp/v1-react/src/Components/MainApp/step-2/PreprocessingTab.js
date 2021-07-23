import { Fragment } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  TextField,
  Select,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles.js";

const PreprocessingTab = ({
  TabPanel,
  value,
  render_prepro,
  render_prepro_meta,
  all_prepro,
  handle_pre,
  handle_pre_meta,
  show_pre,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <TabPanel value={value} index={0} dir={theme.direction}>
      {value === 0 ? (
        <Grid container>
          <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
          <Grid item lg={10} md={10} sm={10} xs={10}>
            <Grid container>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                {/* meta */}
                {Object.keys(render_prepro_meta).map((key, index) => (
                  <Fragment key={index}>
                    <div className={classes.heading}>{key}</div>
                    <Grid container>
                      {Object.keys(render_prepro_meta[key]).map(
                        (key1, index1) =>
                          key1 === "name" ? null : (
                            <Fragment key={index1}>
                              <Grid
                                item
                                lg={3}
                                md={3}
                                sm={3}
                                xs={3}
                                className={classes.pad}
                              >
                                <FormControl fullWidth variant="outlined">
                                  <InputLabel>{key1}</InputLabel>
                                  <Select
                                    native
                                    value={
                                      `dataset-type` in all_prepro
                                        ? all_prepro[`dataset-type`]
                                        : ""
                                    }
                                    onChange={handle_pre_meta(
                                      key,
                                      key1,
                                      render_prepro_meta[key][key1]["DataType"]
                                    )}
                                    label={key1}
                                    inputProps={{
                                      name: { key1 },
                                    }}
                                  >
                                    <option aria-label="None" value="" />
                                    {render_prepro_meta[key][key1][
                                      "Options"
                                    ].map((op, i) => (
                                      <option key={i} value={op}>
                                        {op}
                                      </option>
                                    ))}
                                  </Select>
                                </FormControl>
                              </Grid>
                            </Fragment>
                          )
                      )}
                    </Grid>
                  </Fragment>
                ))}
                {/* pre */}

                {show_pre ? (
                  <>
                    {Object.keys(render_prepro[all_prepro["dataset-type"]]).map(
                      (key, index) => (
                        <span key={index}>
                          <div className={classes.heading}>{key}</div>
                          <Grid container>
                            {Object.keys(
                              render_prepro[all_prepro["dataset-type"]][key]
                            ).map((key1, index1) =>
                              key1 === "name" ||
                              key1 === "input_type" ? null : (
                                <Fragment key={index1}>
                                  <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    sm={3}
                                    xs={3}
                                    className={classes.pad}
                                  >
                                    {render_prepro[all_prepro["dataset-type"]][
                                      key
                                    ][key1]["DataType"] === "select" ? (
                                      <FormControl fullWidth variant="outlined">
                                        <InputLabel>{key1}</InputLabel>
                                        <Select
                                          native
                                          value={
                                            all_prepro
                                              ? all_prepro[
                                                  `${all_prepro["dataset-type"]}-${key}-${key1}`
                                                ]
                                              : ""
                                          }
                                          onChange={handle_pre(
                                            key,
                                            key1,
                                            render_prepro[
                                              all_prepro["dataset-type"]
                                            ][key][key1]["DataType"]
                                          )}
                                          label={key1}
                                          inputProps={{
                                            name: { key1 },
                                          }}
                                        >
                                          <option aria-label="None" value="" />
                                          {render_prepro[
                                            all_prepro["dataset-type"]
                                          ][key][key1]["Options"].map(
                                            (op, i) => (
                                              <option
                                                key={i}
                                                value={
                                                  op === "True"
                                                    ? true
                                                    : op === "False"
                                                    ? false
                                                    : op
                                                }
                                              >
                                                {op}
                                              </option>
                                            )
                                          )}
                                        </Select>
                                      </FormControl>
                                    ) : (
                                      <TextField
                                        fullWidth
                                        label={key1}
                                        value={
                                          all_prepro
                                            ? all_prepro[
                                                `${all_prepro["dataset-type"]}-${key}-${key1}`
                                              ]
                                            : ""
                                        }
                                        onChange={handle_pre(
                                          key,
                                          key1,
                                          render_prepro[
                                            all_prepro["dataset-type"]
                                          ][key][key1]["DataType"]
                                        )}
                                        variant="outlined"
                                        helperText={`Example - ${
                                          render_prepro[
                                            all_prepro["dataset-type"]
                                          ][key][key1]["Example"]
                                        }`}
                                      />
                                    )}
                                  </Grid>
                                </Fragment>
                              )
                            )}
                          </Grid>
                        </span>
                      )
                    )}
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        </Grid>
      ) : null}
    </TabPanel>
  );
};

export default PreprocessingTab;
