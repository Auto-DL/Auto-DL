import React, { useState, useEffect } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CloseIcon from "@material-ui/icons/Close";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

const useStyles = makeStyles((theme) => ({
  App: {
    padding: "20px",
  },
  column1: {
    padding: "10px",
  },
  column2: {
    padding: "10px",
  },
  column3: {
    width: "95%",
    padding: "5px",
    overflow: "hidden",
  },

  grid1: {},
  grid2: {},
  grid3: {},
  droppableColsource: {
    width: "95%",
    backgroundColor: "yellow",
    padding: "10px 10px 0 10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "440px",
  },
  droppableColtarget: {
    width: "95%",
    backgroundColor: "orange",
    padding: "10px 10px 10px 10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "440px",
    maxWidth: "100%",
  },
  body3: {
    width: "100%",
    backgroundColor: "#D8D8D8",
    padding: "10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "440px",
    maxHeight: "440px",
    marginTop: "70px",
    overflowY: "auto",
  },
  item: {
    textAlign: "center",
    marginBottom: "10px",
    backgroundColor: "#FFC270",
    color: "black",
    border: "1px solid white",
    padding: "5px",
    borderRadius: "7px",
  },

  item1: {
    textAlign: "center",
    marginBottom: "10px",
    backgroundColor: "#FFC270",
    color: "black",
    border: "1px solid white",
    padding: "5px",
    borderRadius: "7px 0px 0px 7px",
    width: "85%",
    float: "left",
  },
  styleclose: {
    float: "right",
    height: "100%",
    cursor: "pointer",
    backgroundColor: "#FFC270",
    borderRadius: "0px 7px 7px 0px",
    border: "1px solid white",
    padding: "1px",
    marginBottom: "10px",
  },
  container: {
    position: "relative",
  },
  heading: {
    textAlign: "center",
    fontSize: "120%",
    fontWeigth: "900",
    paddingBottom: "4px",
  },
  batch: {
    marginBottom: "10px",
    backgroundColor: "#f2f2f2",
    color: "black",
    border: "1px solid white",
    padding: "5px",
    borderRadius: "7px",
    position: "relative",
    minHeight: "70px",
  },
  title: {
    float: "left",
    width: "45%",
    minHeight: "70px",
    textAlign: "center",
    transform: "translateY(30%)",
  },
  value: {
    float: "right",
    width: "45%",
    minHeight: "70px",
    transform: "translateY(15%)",
  },
  infoicon: {
    float: "right",
    width: "10%",
    textAlign: "center",
    transform: "translateY(50%)",
    cursor: "pointer",
  },
}));

function Step2() {
  const classes = useStyles();

  var project_details = JSON.parse(localStorage.getItem("project_details"));
  var json_data = JSON.parse(localStorage.getItem("json_data"));
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  console.log(project_details);
  console.log(json_data);

  const [components, setcomponents] = React.useState([]);
  const [selected_layer_type, setselected_layer_type] = React.useState("");
  const [selected_layer, setselected_layer] = React.useState(-1);
  const [selected_layer_name, setselected_layer_name] = React.useState("");

  const [jsondata, setjsondata] = React.useState({
    Conv2D: {
      filters: {
        Example: 32,
        Default: "NA",
        Required: 1,
        Datatype: "number",
        Options: [],
        Description:
          "the dimensionality of the output space [i.e.the number of output filters in the convolution]",
      },

      data_format: {
        Example: "channels_last",
        Default: "channels_last",
        Required: 0,
        Datatype: "select",
        Options: ["channels_last", "channels_first"],
        Description:
          "A string, one of channels_last [default] or channels_first.",
      },

      kernel_size: {
        Example: [2, 2],
        Default: "NA",
        Required: 1,
        Datatype: "Tuple",
        Options: [],
        Description:
          "Specifies the height and width of the 2D convolution window",
      },
      strides: {
        Example: [1, 1],
        Default: "[1, 1]",
        Required: 0,
        Datatype: "Tuple",
        Options: [],
        Description:
          "Specifies the strides of the convolution along the height and width.",
      },

      padding: {
        Example: "valid",
        Default: "valid",
        Required: 0,
        Datatype: "select",
        Options: ["valid", "same"],
        Description:
          '"valid" means no padding. "same" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input.',
      },

      kernel_initializer: {
        Example: "glorot_uniform",
        Default: "glorot_uniform",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the kernel weights matrix",
      },
      bias_initializer: {
        "Example ": "zeros",
        Default: "zeros",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the bias vector",
      },
    },

    Dense: {
      units: {
        Example: 32,
        Default: "NA",
        Required: 1,
        Datatype: "number",
        Options: [],
        Description: "Positive integer, dimensionality of the output space.",
      },

      use_bias: {
        Example: "True",
        Default: "True",
        Required: 0,
        Datatype: "select",
        Options: ["True", "False"],
        Description: "Boolean, whether the layer uses a bias vector.",
      },
      activation: {
        Example: "relu",
        Default: "NA",
        Required: 1,
        Datatype: "select",
        Options: [
          "relu",
          "sigmoid",
          "softmax",
          "softplus",
          "softsign",
          "tanh",
          "selu",
          "elu",
        ],
        Description: "Activation function, if required",
      },

      kernel_initializer: {
        Example: "glorot_uniform",
        Default: "glorot_uniform",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the kernel weights matrix",
      },

      bias_initializer: {
        Example: "zeros",
        Default: "zeros",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the bias vector",
      },
    },

    LSTM: {
      units: {
        Example: 32,
        Default: "NA",
        Required: 1,
        Datatype: "number",
        Options: [],
        Description: "Positive integer, dimensionality of the output space.",
      },

      activation: {
        Example: "tanh",
        Default: "tanh",
        Required: 1,
        Datatype: "select",
        Options: [
          "relu",
          "sigmoid",
          "softmax",
          "softplus",
          "softsign",
          "tanh",
          "selu",
          "None",
          "elu",
        ],
        Description:
          'Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. "linear " activation: a[x] = x]',
      },

      recurrent_activation: {
        Example: "sigmoid",
        Default: "sigmoid",
        Required: 1,
        Datatype: "select",
        Options: [
          "relu",
          "sigmoid",
          "softmax",
          "softplus",
          "softsign",
          "tanh",
          "selu",
          "None",
          "elu",
        ],
        Description:
          'Activation function to use for the recurrent step. Default: sigmoid [sigmoid]. If you pass None, no activation is applied [ie. "linear " activation: a[x] = x].',
      },

      kernel_initializer: {
        Example: "glorot_uniform",
        Default: "glorot_uniform",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the kernel weights matrix",
      },

      bias_initializer: {
        "Example ": "zeros ",
        Default: "zeros",
        Required: 0,
        Datatype: "select",
        Options: [
          "random_normal",
          "random_uniform",
          "truncated_normal",
          "truncated_uniform",
          "zeros",
          "ones",
          "glorot_normal",
          "glorot_uniform",
          "identity",
        ],
        Description: "Initializer for the bias vector",
      },

      dropout: {
        Default: 0,
        Example: 0.4,
        Required: 0,
        Datatype: "number",
        Options: [],
        Description:
          "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0.",
      },

      return_sequences: {
        Default: "False",
        Example: "True",
        Required: 0,
        Datatype: "select",
        Options: ["True", "False"],
        Description:
          "Boolean. Whether to return the last output. in the output sequence, or the full sequence. Default: False",
      },

      return_state: {
        Default: "False",
        Example: "True",
        Required: 0,
        Datatype: "select",
        Options: ["True", "False"],
        Description:
          "Boolean. Whether to return the last state in addition to the output. Default: False.",
      },
    },

    BaseRNN: {
      cell: {
        Default: "NA",
        Example: "cell",
        Required: 1,
        Datatype: "text",
        Options: [],
        Description: "An RNN cell instance",
      },
    },

    SimpleRNN: {
      units: {
        Example: 32,
        Default: "NA",
        Required: 1,
        Datatype: "number",
        Options: [],
        Description: "Positive integer, dimensionality of the output space.",
      },

      activation: {
        Example: "tanh",
        Default: "tanh",
        Required: 1,
        Datatype: "select",
        Options: [
          "relu",
          "sigmoid",
          "softmax",
          "softplus",
          "softsign",
          "tanh",
          "selu",
          "None",
          "elu",
        ],
        Description:
          'Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. "linear " activation: a[x] = x]',
      },

      use_bias: {
        Example: "True",
        Default: "True",
        Required: 0,
        Datatype: "select",
        Options: ["True", "False"],
        Description: "Boolean, whether the layer uses a bias vector.",
      },
      dropout: {
        Default: 0,
        Example: 0.4,
        Required: 0,
        Datatype: "number",
        Options: [],
        Description:
          "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0.",
      },
    },

    Dropout: {
      rate: {
        Default: "NA",
        Example: 0.4,
        Required: 1,
        Datatype: "number",
        Options: [],
        Description:
          "Float between 0 and 1. Fraction of the input units to drop.",
      },

      noise_shape: {
        Default: "None",
        Example: "[batch_size, 1, features]",
        Required: 0,
        Datatype: "Tuple",
        Options: [],
        Description:
          "1D integer tensor representing the shape of the binary dropout mask that will be multiplied with the input. For instance, if your inputs have shape [batch_size, timesteps, features] and you want the dropout mask to be the same for all timesteps, you can use noise_shape=[batch_size, 1, features]",
      },

      seed: {
        Default: "NA",
        Example: 42,
        Required: 0,
        Datatype: "number",
        Options: [],
        Description: "A Python integer to use as random seed",
      },
    },

    Flatten: {
      data_format: {
        Example: "channels_last",
        Default: "channels_last",
        Required: 0,
        Datatype: "select",
        Options: ["channels_last", "channels_first"],
        Description:
          "A string, one of channels_last [default] or channels_first.",
      },
    },

    ZeroPadding2D: {
      padding: {
        Example: [
          [1, 1],
          [2, 2],
        ],
        Default: "NA",
        Required: 1,
        Datatype: "Tuple",
        Options: [],
        Description:
          "The Tuple interpreted as [[top_pad, bottom_pad], [left_pad, right_pad]]",
      },

      data_format: {
        Example: "channels_last",
        Default: "channels_last",
        Required: 0,
        Datatype: "select",
        Options: ["channels_last", "channels_first"],
        Description:
          "A string, one of channels_last [default] or channels_first.",
      },
    },

    AveragePooling2D: {
      pool_size: {
        Example: [2, 2],
        Default: "NA",
        Required: 1,
        Datatype: "Tuple",
        Options: [],
        Description:
          "integer or Tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimension. If only one integer is specified, the same window length will be used for both dimensions",
      },

      strides: {
        Example: [2, 2],
        Default: "NA",
        Required: 0,
        Datatype: "Tuple",
        Options: [],
        Description:
          "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size.",
      },

      data_format: {
        Example: "channels_last",
        Default: "channels_last",
        Required: 0,
        Datatype: "select",
        Options: ["channels_last", "channels_first"],
        Description:
          "A string, one of channels_last [default] or channels_first.",
      },

      padding: {
        Example: "valid",
        Default: "valid",
        Required: 0,
        Datatype: "select",
        Options: ["valid", "same"],
        Description:
          '"valid" means no padding. "same" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input.',
      },
    },

    MaxPooling2D: {
      pool_size: {
        Example: [2, 2],
        Default: "NA",
        Required: 1,
        Datatype: "Tuple",
        Options: [],
        Description:
          "integer or Tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimensions. If only one integer is specified, the same window length will be used for both dimensions",
      },

      strides: {
        Example: [2, 2],
        Default: "NA",
        Required: 0,
        Datatype: "Tuple",
        Options: [],
        Description:
          "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size.",
      },

      data_format: {
        Example: "channels_last",
        Default: "channels_last",
        Required: 0,
        Datatype: "select",
        Options: ["channels_last", "channels_first"],
        Description:
          "A string, one of channels_last [default] or channels_first.",
      },

      padding: {
        Example: "valid",
        Default: "valid",
        Required: 0,
        Datatype: "select",
        Options: ["valid", "same"],
        Description:
          '"valid" means no padding. "same" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input.',
      },
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    if (destination.droppableId === new String("source").valueOf()) {
      return;
    }

    if (
      destination.droppableId === new String("target").valueOf() &&
      source.droppableId === new String("target").valueOf()
    ) {
      components.splice(
        destination.index,
        0,
        components.splice(source.index, 1)[0]
      );
      setcomponents(components);
    }
    if (
      destination.droppableId === new String("target").valueOf() &&
      source.droppableId === new String("source").valueOf()
    ) {
      const list_names_of_source = Object.keys(jsondata);
      const temp = jsondata[list_names_of_source[source.index]];
      var dic = _.cloneDeep(temp);
      for (var key1 in dic) {
        for (var key2 in dic[key1]) {
          if (key2 === "value") {
            delete dic[key1][key2];
          }
        }
      }
      dic["id"] = `${list_names_of_source[source.index]}-${destination.index}`;
      dic["name"] = list_names_of_source[source.index];
      const layer_name = list_names_of_source[source.index];

      components.splice(destination.index, 0, dic);

      setcomponents(components);
    }
  };

  const handledelete = (element) => {
    console.log(element);
    var temp = components.filter((item) => item !== element);
    setcomponents(temp);
    setselected_layer(-1);
    setselected_layer_name("");
    setselected_layer_type("");
  };
  const showdetails = (element) => {
    console.log(element);

    setselected_layer_type(element);

    var ele = components;
    var index = ele.lastIndexOf(element);
    console.log(index, element.name);
    setselected_layer(index);
    setselected_layer_name(element.name);
  };
  const save_value = (prop) => (event) => {
    var param = prop;
    var index = selected_layer;
    const pervstate = Object.assign([], components);
    pervstate[index][param]["value"] = event.target.value;
    console.log(event.target.value);

    setcomponents(pervstate);
  };

  const generate_code = () => {
    var final_dict = {};
    const temp = components;
    var dic = _.cloneDeep(temp);
    var i = 0;
    for (let [key0, value0] of Object.entries(dic)) {
      console.log(key0, value0);
      i = i + 1;
      for (var key1 in value0) {
        console.log(key1);
        if (!(key1 === "name" || key1 === "id")) {
          for (var key2 in dic[key0][key1]) {
            if (key2 === new String("value").valueOf()) {
              console.log(i);
              console.log(dic[key0].name);
              console.log(key1);
              console.log(dic[key0][key1][key2]);

              if (dic[key0][key1].Datatype === new String("number").valueOf()) {
                final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = parseInt(
                  dic[key0][key1][key2]
                );
              } else if (
                dic[key0][key1].Datatype === new String("tuple").valueOf()
              ) {
                const temp = dic[key0][key1][key2].split(",");
                console.log(temp);
                console.log(temp[0]);
                console.log(temp[1]);

                final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = [
                  parseInt(temp[0]),
                  parseInt(temp[1]),
                ];
              } else {
                final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] =
                  dic[key0][key1][key2];
                console.log(dic[key0][key1][key2]);
              }
            } else if (dic[key0].name === new String("Flatten").valueOf()) {
              console.log("Flatten");
              final_dict[`Layer-${i}-${dic[key0].name}` + "-data_format"] =
                dic[key0][key1]["Default"];
            }
          }
        }
      }
    }
    console.log(final_dict);

    var _dict = {
      // "Layer-1-Conv2D-filters": 32,
      // "Layer-1-Conv2D-kernel_size": [
      //     3, 3
      // ],
      // "Layer-1-Conv2D-activation": "relu",
      // "Layer-1-Conv2D-padding": "same",
      // "Layer-1-Conv2D-input_shape": [
      //     200, 200, 3
      // ],

      // "Layer-2-MaxPooling2D-pool_size": [
      //     2, 2
      // ],

      // "Layer-3-Flatten-": {},

      // "Layer-4-Dense-units": 128,
      // "Layer-4-Dense-activation": "relu",
      // "Layer-4-Dense-kernel_initializer": "he_uniform",

      // "Layer-5-Dense-units": 1,
      // "Layer-5-Dense-activation": "sigmoid",

      "dataset-type": "image",
      "dataset-path": "../data/dogs_and_cats",

      "image-augment-rotation_range": 40,
      "image-augment-width_shift_range": 0.2,
      "image-augment-height_shift_range": 0.2,
      "image-augment-horizontal_flip": "True",
      "image-augment-rescale": 0.0039215,

      "image-params-target_size": [200, 200],
      "image-params-batch_size": 64,
      "image-params-class_mode": "binary",

      optimizer: "sgd",
      loss: "binary_crossentropy",
      metrics: ["accuracy"],
      epochs: 5,

      verbose: 1,
      plot: "True",
      save_plots: "True",
    };
    var dict_call = Object.assign({}, final_dict, _dict);
    console.log(dict_call);
    const test_data = {
      username: username,
      project_name: project_details.project_name,
      training_params: dict_call,
    };
    console.log(test_data);
    axios
      .post(`v1/generate/`, test_data, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className={classes.App}>
      {/* <h1>hey</h1> */}
      <DragDropContext onDragEnd={handleDragEnd}>
        {/* {_.map(jsondata, (data, key) => {
          return( */}
        <Grid container>
          <Grid item lg={3} md={3} sm={4} xs={4} className={classes.grid1}>
            <div key="source" className={classes.column1}>
              <h3>source</h3>

              <Droppable droppableId="source">
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.droppableColsource}
                    >
                      {Object.keys(jsondata).map((el, index) => {
                        return (
                          <Draggable key={el} index={index} draggableId={el}>
                            {(provided, snapshot) => {
                              // console.log(snapshot)
                              return (
                                <div
                                  className={classes.item}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Grid>

          <Grid item lg={5} md={5} sm={4} xs={4} className={classes.grid2}>
            <div key="target" className={classes.column2}>
              <h3>target</h3>

              <Droppable droppableId="target">
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.droppableColtarget}
                    >
                      {components.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              // console.log(snapshot)
                              return (
                                <div
                                  className={classes.container}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={classes.item1}
                                    onClick={() => showdetails(el)}
                                  >
                                    {el.name}
                                  </div>

                                  <div
                                    className={classes.styleclose}
                                    onClick={() => handledelete(el)}
                                  >
                                    <CloseIcon />
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Grid>

          <Grid item lg={4} md={4} sm={4} xs={4} className={classes.grid3}>
            <div className={classes.column3}>
              <div className={classes.body3}>
                {Object.keys(selected_layer_type).length === 0 ? (
                  <h3>please select some layer first</h3>
                ) : (
                  <div className={classes.innerpad}>
                    <div className={classes.heading}>
                      {components[selected_layer].name}
                    </div>
                    {Object.keys(components[selected_layer]).map(
                      (key, index) => (
                        <>
                          {key === "name" || key === "id" ? null : (
                            <div className={classes.batch}>
                              <div className={classes.title}>
                                {" "}
                                {key}
                                &nbsp;{" "}
                                {/* The Parameter name is <b>{key}</b> and this is a  */}
                                {selected_layer_type[key]["Required"] == 1 ? (
                                  <span>*</span>
                                ) : (
                                  <span></span>
                                )}
                                {/* Parameter */}{" "}
                              </div>

                              {/* <div class="tooltip" title={components[selected_layer][key]["Description"]}>                                
                                  <HelpOutlineIcon />
                                  <span class="tooltiptext">{components[selected_layer][key]["Description"]}</span>
                                </div> */}

                              <div
                                className={classes.infoicon}
                                title={
                                  components[selected_layer][key]["Description"]
                                }
                              >
                                <HelpOutlineIcon />
                              </div>
                              {components[selected_layer][key]["Datatype"] ==
                              "select" ? (
                                <div className={classes.value}>
                                  {/* {components[selected_layer][key]["value"] ? components[selected_layer][key]["value"] : components[selected_layer][key]["Default"]} */}
                                  {/* {components[selected_layer][key]["Default"]} */}
                                  <FormControl
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  >
                                    <InputLabel htmlFor="outlined-age-native-simple">
                                      {key}
                                    </InputLabel>
                                    <Select
                                      native
                                      value={
                                        components[selected_layer][key]["value"]
                                          ? components[selected_layer][key][
                                              "value"
                                            ]
                                          : components[selected_layer][key][
                                              "Default"
                                            ]
                                        // selected_layer_type[key].hasOwnProperty(key) ? selected_layer_type[key]["value"] : selected_layer_type[key]["Default"]
                                      }
                                      // onChange={handleChange}
                                      onChange={save_value(key)}
                                      label={key}
                                      // inputstate={{
                                      // name: 'age',
                                      // id: 'outlined-age-native-simple',
                                      // }}
                                    >
                                      {components[selected_layer][key][
                                        "Options"
                                      ].map((arr) => (
                                        <option value={arr}>{arr}</option>
                                      ))}{" "}
                                    </Select>
                                  </FormControl>
                                </div>
                              ) : (
                                <div className={classes.value}>
                                  {/* {components[selected_layer][key]["value"] ? components[selected_layer][key]["value"] : components[selected_layer][key]["Default"]} */}
                                  {/* {components[selected_layer][key]["Default"]} */}
                                  <TextField
                                    required
                                    size="small"
                                    id="outlined-required"
                                    label="Required"
                                    value={
                                      // selected_layer_type[key]["Default"]

                                      components[selected_layer][key]["value"]
                                        ? components[selected_layer][key][
                                            "value"
                                          ]
                                        : components[selected_layer][key][
                                            "Default"
                                          ]
                                      // selected_layer_type[key].hasOwnProperty(key) ? selected_layer_type[key]["value"] : selected_layer_type[key]["Default"]
                                    }
                                    variant="outlined"
                                    onChange={save_value(key)}
                                    helperText={`Example - ${components[selected_layer][key]["Example"]}`}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )
                    )}
                  </div>
                )}{" "}
              </div>
            </div>
          </Grid>
        </Grid>

        {/* )
        })} */}
      </DragDropContext>

      <Button
        variant="contained"
        color="primary"
        onClick={() => generate_code()}
      >
        Generate Code
      </Button>
    </div>
  );
}

export default Step2;
