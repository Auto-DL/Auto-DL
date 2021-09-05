import { Fragment,useState } from "react";
import { Grid, FormControl, InputLabel, TextField, Select} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { useStyles } from "./styles.js";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

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
  const [selected_InputFieldDesc,setselected_InputFieldDesc]=useState("");
  const handleDescriptionPre=(index) =>{

    setselected_InputFieldDesc(index);
    console.log("index of pre is ",selected_InputFieldDesc);


  }

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
                    {Object.keys(
                      render_prepro[all_prepro["dataset-type"]]
                    ).map((key, index) => (
                      <span key={index}>
                        <div className={classes.heading}>{key}</div>
                        <Grid container  >
                          {Object.keys(
                            render_prepro[all_prepro["dataset-type"]][key]
                          ).map((key1, index1) =>
                            key1 === "name" ||
                            key1 === "input_type" ? null : (
                              <Fragment key={index1} >
                                <Grid
                                  item
                                  lg={3}
                                  md={3}
                                  sm={3}
                                  xs={3}
                                  className={classes.pad}
                                  style={{display:"flex"}}
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
                                      {
                                          selected_InputFieldDesc===key1?
                                          <p style={{fontSize:"80%",marginTop:"1px",fontWeight:"100",color:"#a2a4a8",marginLeft:"5%"}}>
                                          {render_prepro[all_prepro["dataset-type"]][key][key1]["Description"]}
                                          </p>
                                          :<p style={{fontSize:"80%",marginTop:"1px",fontWeight:"100",color:"#a2a4a8",marginLeft:"5%"}}>
                                            Example-{render_prepro[all_prepro["dataset-type"]][key][key1]["Example"]}
                                          </p>
                                        }
                                    </FormControl>
                                  ) : (
                                    <TextField
                                      fullWidth
                                      label={key1}
                                      defaultValue={
                                        all_prepro? 
                                          // all_prepro[
                                          //     `${all_prepro["dataset-type"]}-${key}-${key1}`
                                          //   ]
                                           render_prepro[all_prepro["dataset-type"]][key][key1]["Default"]
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
                                      // helperText={`Example - ${
                                      //   render_prepro[
                                      //     all_prepro["dataset-type"]
                                      //   ][key][key1]["Example"]
                                      // }`}
                                      helperText={
                                        `${selected_InputFieldDesc===key1 ? render_prepro[
                                            all_prepro["dataset-type"]
                                          ][key][key1]["Description"] : `Example-${render_prepro[
                                            all_prepro["dataset-type"]
                                          ][key][key1]["Example"]}`}`


                                        }
                                    />
                                  )}
                                </Grid>
                                <div className={classes.infoiconPre} >
                                      <HelpOutlineIcon 
                                      fontSize="small" 
                                      // onMouseOver={() => handleDescriptionPre(key1)}
                                      // onMouseLeave={() => setselected_InputFieldDesc("")}
                                      onClick={() => {
                                        handleDescriptionPre(key1);
                                        setTimeout(()=> setselected_InputFieldDesc(""),3000);
                                      }}
                                      />
                                </div>
                              </Fragment>
                            )
                          )}
                        </Grid>
                      </span>
                    ))}
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
