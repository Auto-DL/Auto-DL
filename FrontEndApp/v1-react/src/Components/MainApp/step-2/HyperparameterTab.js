import { Fragment } from "react";
import { Grid, FormControl, FormControlLabel, InputLabel, Select, TextField, Button, Checkbox } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles.js";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const HyperparameterTab = ({ TabPanel, value, project_details, state_hyperparam, handleChange_hyperparameter, handleChange_hyperparameter_l_o, all_optimizer, all_loss, showoptimizer, selected_optimizer, selected_loss, _hyper, save_value_hyper, showloss, generate_code, Train }) => {
  const theme = useTheme();
  const classes = useStyles();

  return (
      <TabPanel value={value} index={2} dir={theme.direction}>
      <Grid container>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        <Grid item lg={10} md={10} sm={10} xs={10}>
          <Grid container>
            {project_details.lib === "Pytorch" ? (
              <>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl variant="outlined" className={classes._hyper}>
                    <InputLabel>optimizer</InputLabel>
                    <Select
                      native
                      value={state_hyperparam.optimizer}
                      onChange={handleChange_hyperparameter_l_o("optimizer")}
                      label="optimizer"
                      inputProps={{
                        name: "optimizer",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Object.keys(all_optimizer).map((name, index) => {
                        return (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>

                  {showoptimizer ? (
                    <div className={classes.card}>
                      {Object.keys(selected_optimizer).map((key, index) => (
                        <Fragment key={index}>
                          {key === "name" ||
                          key === "id" ||
                          key === "type" ? null : (
                            <div className={classes.batch}>
                              <div className={classes.title}>
                                {" "}
                                {key}
                                &nbsp;{" "}
                                {selected_optimizer[key]["Required"] === 1 ? (
                                  <span>*</span>
                                ) : (
                                  <span></span>
                                )}
                              </div>

                              <div
                                className={classes.infoicon}
                                title={selected_optimizer[key]["Description"]}
                              >
                                <HelpOutlineIcon />
                              </div>
                              {selected_optimizer[key]["Datatype"] ===
                              "select" ? (
                                <div className={classes.value}>
                                  <FormControl
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  >
                                    <Select
                                      native
                                      value={
                                        selected_optimizer[key]["value"]
                                          ? selected_optimizer[key]["value"]
                                          : selected_optimizer[key]["Default"]
                                      }
                                      onChange={save_value_hyper(
                                        key,
                                        "optimizer"
                                      )}
                                    >
                                      {selected_optimizer[key]["Options"].map(
                                        (arr, index) => (
                                          <option key={index} value={arr}>
                                            {arr}
                                          </option>
                                        )
                                      )}{" "}
                                    </Select>
                                  </FormControl>
                                </div>
                              ) : (
                                <div className={classes.value}>
                                  <TextField
                                    required
                                    size="small"
                                    value={
                                      selected_optimizer[key]["value"]
                                        ? selected_optimizer[key]["value"]
                                        : selected_optimizer[key]["Default"]
                                    }
                                    variant="outlined"
                                    onChange={save_value_hyper(
                                      key,
                                      "optimizer"
                                    )}
                                    helperText={`Example - ${selected_optimizer[key]["Example"]}`}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Fragment>
                      ))}

                      <Button
                        className={classes.action_btn}
                        variant="contained"
                        color="default"
                        onClick={() => _hyper("optimizer", "cancle")}
                      >
                        Cancle
                      </Button>

                      <Button
                        className={classes.action_btn}
                        variant="contained"
                        color="primary"
                        onClick={() => _hyper("optimizer", "save")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : null}
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl variant="outlined" className={classes._hyper}>
                    <InputLabel>Loss</InputLabel>
                    <Select
                      native
                      value={state_hyperparam.loss}
                      onChange={handleChange_hyperparameter_l_o("loss")}
                      label="loss"
                      inputProps={{
                        name: "loss",
                      }}
                    >
                      <option aria-label="None" value="" />
                      {Object.keys(all_loss).map((name, index) => {
                        return (
                          <option key={index} value={name}>
                            {name}
                          </option>
                        );
                      })}
                    </Select>
                  </FormControl>

                  {showloss ? (
                    <div className={classes.card}>
                      {Object.keys(selected_loss).map((key, index) => (
                        <Fragment key={index}>
                          {key === "name" ||
                          key === "id" ||
                          key === "type" ? null : (
                            <div className={classes.batch}>
                              <div className={classes.title}>
                                {" "}
                                {key}
                                &nbsp;{" "}
                                {selected_loss[key]["Required"] === 1 ? (
                                  <span>*</span>
                                ) : (
                                  <span></span>
                                )}
                              </div>

                              <div
                                className={classes.infoicon}
                                title={selected_loss[key]["Description"]}
                              >
                                <HelpOutlineIcon />
                              </div>
                              {selected_loss[key]["Datatype"] === "select" ? (
                                <div className={classes.value}>
                                  <FormControl
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  >
                                    <Select
                                      native
                                      value={
                                        selected_loss[key]["value"]
                                          ? selected_loss[key]["value"]
                                          : selected_loss[key]["Default"]
                                      }
                                      onChange={save_value_hyper(key, "loss")}
                                    >
                                      {selected_loss[key]["Options"].map(
                                        (arr, index) => (
                                          <option key={index} value={arr}>
                                            {arr}
                                          </option>
                                        )
                                      )}{" "}
                                    </Select>
                                  </FormControl>
                                </div>
                              ) : (
                                <div className={classes.value}>
                                  <TextField
                                    required
                                    size="small"
                                    id="outlined-required"
                                    value={
                                      selected_loss[key]["value"]
                                        ? selected_loss[key]["value"]
                                        : selected_loss[key]["Default"]
                                    }
                                    variant="outlined"
                                    onChange={save_value_hyper(key, "loss")}
                                    helperText={`Example - ${selected_loss[key]["Example"]}`}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Fragment>
                      ))}

                      <Button
                        className={classes.action_btn}
                        variant="contained"
                        color="default"
                        onClick={() => _hyper("loss", "cancle")}
                      >
                        Cancle
                      </Button>

                      <Button
                        className={classes.action_btn}
                        variant="contained"
                        color="primary"
                        onClick={() => _hyper("loss", "save")}
                      >
                        Save
                      </Button>
                    </div>
                  ) : null}
                </Grid>
              </>
            ) : (
              <>
                <FormControl variant="outlined" className={classes.sel}>
                  <InputLabel>optimizer</InputLabel>
                  <Select
                    native
                    value={state_hyperparam.optimizer}
                    onChange={handleChange_hyperparameter("optimizer")}
                    label="optimizer"
                    inputProps={{
                      name: "optimizer",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"sgd"}>sgd</option>
                    <option value={"rmsprop"}>rmsprop</option>
                    <option value={"adam"}>adam</option>
                    <option value={"adadelta"}>adadelta</option>
                    <option value={"adagrad"}>adagrad</option>
                  </Select>
                </FormControl>

                <FormControl variant="outlined" className={classes.sel}>
                  <InputLabel>loss</InputLabel>
                  <Select
                    native
                    value={state_hyperparam.loss}
                    onChange={handleChange_hyperparameter("loss")}
                    label="loss"
                    inputProps={{
                      name: "loss",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"binary_crossentropy"}>
                      binary_crossentropy
                    </option>
                    <option value={"categorical_crossentropy"}>
                      categorical_crossentropy
                    </option>
                    <option value={"poisson"}>poisson</option>
                    <option value={"mean_squared_error"}>
                      mean_squared_error
                    </option>
                    <option value={"mean_absolute_error"}>
                      mean_absolute_error
                    </option>
                    <option value={"cosine_similarity"}>
                      cosine_similarity
                    </option>
                    <option value={"hinge"}>hinge</option>
                  </Select>
                </FormControl>
              </>
            )}

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                label="epochs"
                value={state_hyperparam.epochs}
                onChange={handleChange_hyperparameter("epochs")}
                variant="outlined"
                className={classes.sel}
              />

              <TextField
                label="learning rate"
                value={state_hyperparam.learning_rate}
                onChange={handleChange_hyperparameter("learning_rate")}
                variant="outlined"
                className={classes.sel}
              />

              <FormControl variant="outlined" className={classes.sel}>
                <InputLabel>verbose</InputLabel>
                <Select
                  native
                  value={state_hyperparam.verbose}
                  onChange={handleChange_hyperparameter("verbose")}
                  label="verbose"
                  inputProps={{
                    name: "verbose",
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </Select>
              </FormControl>

              {project_details.lib === "Pytorch" ? (
                <FormControl variant="outlined" className={classes.sel}>
                  <InputLabel>metrics</InputLabel>
                  <Select
                    native
                    value={state_hyperparam.metrics}
                    onChange={handleChange_hyperparameter("metrics")}
                    label="metrics"
                    inputProps={{
                      name: "metrics",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"AUC"}>AUC</option>
                    <option value={"Precision"}>Precision</option>
                    <option value={"Recall"}>Recall</option>
                    <option value={"True positives"}>True positives</option>
                    <option value={"True negatives"}>True negatives</option>
                    <option value={"False positives"}>False positives</option>
                    <option value={"False negatives"}>False negatives</option>
                    <option value={"Precision at recall"}>
                      Precision at recall
                    </option>
                    <option value={"Sensitivity at specificity"}>
                      Sensitivity at specificity
                    </option>
                    <option value={"Specificity at sensitivity"}>
                      Specificity at sensitivity
                    </option>
                  </Select>
                </FormControl>
              ) : (
                <FormControl variant="outlined" className={classes.sel}>
                  <InputLabel>metrics</InputLabel>
                  <Select
                    native
                    value={state_hyperparam.metrics}
                    onChange={handleChange_hyperparameter("metrics")}
                    label="metrics"
                    inputProps={{
                      name: "metrics",
                    }}
                  >
                    <option aria-label="None" value="" />
                    <option value={"Accuracy"}>Accuracy</option>
                    <option value={"BinaryCrossentropy"}>
                      BinaryCrossentropy
                    </option>
                    <option value={"CategoricalCrossentropy"}>
                      CategoricalCrossentropy
                    </option>
                    <option value={"RootMeanSquaredError"}>
                      CosineSimilarity
                    </option>
                    <option value={"AUC"}>Precision</option>
                    <option value={"Recall"}>Recall</option>
                    <option value={"MeanIoU"}>MeanIoU</option>
                    <option value={"Hinge"}>Hinge</option>
                  </Select>
                </FormControl>
              )}
              <FormControlLabel
                className={classes.save_plot}
                control={
                  <Checkbox
                    checked={state_hyperparam.plot}
                    onChange={handleChange_hyperparameter("plot")}
                    color="primary"
                  />
                }
                label="Save Graphs"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
      </Grid>

      <Grid container>
        <Grid item lg={4} md={4}></Grid>
        <Grid item lg={2} md={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => generate_code()}
          >
            Generate Code
          </Button>
        </Grid>

        <Grid item lg={2} md={2}>
          <Button variant="contained" color="primary" onClick={() => Train()}>
            Train the Model
          </Button>
        </Grid>
        <Grid item lg={4} md={4}></Grid>
      </Grid>
    </TabPanel>
  );
}
 
export default HyperparameterTab;