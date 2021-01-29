import React, { useState, useEffect } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import PropTypes from "prop-types";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  App: {
    // padding: "10px",
    marginLeft:'5.3%',
    marginRight:'10px',
    // backgroundColor:'grey',
  },
  column1: {
    padding: "0px",
    // backgroundColor:'grey',
  },
  column2: {
    padding: "0px",
    // backgroundColor:'blue',
  },
  column3: {
    width: "95%",
    padding: "0px",
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
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "auto",
  },
  droppableColtarget: {
    width: "95%",
    backgroundColor: "orange",
    padding: "10px 10px 10px 10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    maxHeight: "500px",
    maxWidth: "100%",
  },
  body3: {
    width: "100%",
    backgroundColor: "#D8D8D8",
    padding: "10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "525px",
    maxHeight: "525px",
    // marginTop: "55px",
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
    borderRadius: "7px 7px 7px 7px",
    width: "85%",
    // float: "right",
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
    paddingLeft:"10%",
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
    minHeight: "80px",
  },
  title: {
    float: "left",
    width: "45%",
    minHeight: "70px",
    textAlign: "center",
    transform: "translateY(30%)",
  },
  spancss:{
    marginLeft:'40%',
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
  delete:{
    width: "97%",
    backgroundColor: "#D8D8D8",
    padding: "10px",
    borderRadius: "7px",
    minHeight: "40px",
    maxHeight: "60px",
    minWeight: "60px",
    minWeight: "60px",
    margin:'10px',
    // paddingTop:'3px',
    textAlign: "center",
  },
}));

function Step2() {
  const classes = useStyles();
  const theme = useTheme();
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
  const [value, setValue] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };

  console.log(components);
  if (project_details.lib === new String("Pytorch").valueOf() || project_details.library === new String("Pytorch").valueOf()) {
    var temp_pre={
      "Input": {
        "name": "Input",
        "type": {
          "Example": "image",
          "Default": "None",
          "Required": 1,
          "DataType": "String",
          "Options": ["image", "csv", "text"],
          "Description": "Type of input to model"
    
        },
        "path": {
          "Example": "/data/cats-vs-dogs/",
          "Default": "None",
          "Required": 1,
          "DataType": "String",
          "Options": [],
          "Description": "Path to the data either absolute or relative"
    
        }
      },
      
      "params": {
        "name": "params",
    
        "batch_size_train": {
          "Example": 32,
          "Default": 1,
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "how many samples per batch to load (Training) "
        },
        "n_batch_test": {
          "Example": 32,
          "Default": 1,
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "how many samples per batch to load (Test) "
        },
        "num_workers": {
          "Example": 2,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "how many subprocesses to use for data loading. 0 means that the data will be loaded in the main process "
    
        },
    
        "shuffle": {
          "Example": "False",
          "Default": "True",
          "Required": 0,
          "DataType": "select",
          "Options": ["True", "False"],
          "Description": "set to True to have the data reshuffled at every epoch"
        },
    
        "n_epochs": {
          "Example": 1,
          "Default": "NA",
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "Number of epochs to train the model"
    
        }
      },

      "CenterCrop": {
        "name": "augment",
        "input-type": "image",
    
        "size": {
          "Example": "10",
          "Default": "",
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "Output size of the cropped image "
        }
      },
    
      "Grayscale": {
        "name": "augment",
        "input-type": "image",
        "num_output_channels": {
          "Example": "1",
          "Default": "1",
          "Required": 1,
          "DataType": "number",
          "Options": [1, 3],
          "Description": "Number of output channels "
    
        }
      },
      "Resize": {
        "name": "augment",
        "input-type": "image",
        "size": {
          "Example": "10",
          "Default": "",
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "Output size of the image"
        },
        "interpolation": {
          "Example": "2",
          "Default": "2",
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "Desired interpolation enum defined by filters"
        }
      },
      "ToTensor": {
        "name": "augment",
        "input-type": "image"
      },

    };
    var temp_loss={
      "L1Loss": {
        "name": "l1loss",
        "type": "loss-function",
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "measures the mean absolute error (MAE) between each element in the input xx and target yy. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed."
    
        }
      },
    
      "MSELoss": {
        "name": "mseLoss",
        "type": "loss-function",
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'"
        }
    
    
    
    
      },
    
      "CrossEntropyLoss": {
        "name": "cross-entropy-loss",
        "type": "loss-function",
        "weight": {
          "Example": "torch.ones([64])",
          "Default": "None",
          "Required": 0,
          "DataType": "Tensor",
          "Options": [],
          "Description": " a manual rescaling weight given to each class. If given, has to be a Tensor of size C"
    
        },
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed."
    
        },
        "ignore_index": {
          "Example": "-100",
          "Default": "-100",
          "Required": 0,
          "DataType": "int",
          "Options": [],
          "Description": "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets"
    
        }
    
    
      },
    
      "NLLLoss": {
        "name": "nlloss",
        "type": "loss-function",
        "weight": {
          "Example": "torch.ones([64])",
          "Default": "None",
          "Required": 0,
          "DataType": "Tensor",
          "Options": [],
          "Description": " a manual rescaling weight given to each class. If given, has to be a Tensor of size C. Otherwise, it is treated as if having all ones."
        },
        "ignore_index": {
          "Example": "-100",
          "Default": "-100",
          "Required": 0,
          "DataType": "int",
          "Options": [],
          "Description": "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets"
    
        },
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'"
        }
    
    
      },
    
      "BCELoss": {
        "name": "bceLoss",
        "type": "loss-function",
        "weight": {
          "Example": "torch.ones([64])",
          "Default": "None",
          "Required": 0,
          "DataType": "Tensor",
          "Options": [],
          "Description": " a manual rescaling weight given to each class.  If given, has to be a Tensor of size nbatch."
    
        },
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed."
    
        }
    
    
      },
    
      "BCEWithLogitsLoss": {
        "name": "bce-logits-loss",
        "type": "loss-function",
        "weight": {
          "Example": "torch.ones([64])",
          "Default": "None",
          "Required": 0,
          "DataType": "Tensor",
          "Options": [],
          "Description": "a manual rescaling weight given to the loss of each batch element. If given, has to be a Tensor of size nbatch."
        },
    
        "pos_weight": {
          "Example": "torch.ones([64])",
          "Default": "None",
          "Required": 0,
          "DataType": "Tensor",
          "Options": [],
          "Description": " a weight of positive examples. Must be a vector with length equal to the number of classes."
        },
    
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'"
        }
    
    
    
      },

      "SmoothL1Loss": {
        "name": "mseLoss",
        "type": "loss-function",
        "reduction": {
          "Example": "sum",
          "Default": "mean",
          "Required": 0,
          "DataType": "select",
          "Options": ["none", "mean", "sum"],
          "Description": "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'"
        },
        "beta": {
          "Example": "0.5",
          "Default": "1.0",
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "Specifies the threshold at which to change between L1 and L2 loss. This value defaults to 1.0."
        }
    
      },
    };
    var temp_optimizer={
      "SGD": {
        "name": "SGD",
        "type": "optimizer",
        "lr": {
          "Example": 0.1,
          "Default": "NA",
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "learning rate"
        },
    
        "momentum": {
          "Example": 0.9,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "momentum factor"
    
    
        },
    
        "dampening": {
          "Example": 0.2,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "dampening for momentum"
        },
    
        "nesterov": {
          "Example": "True",
          "Default": "False",
          "Required": 0,
          "DataType": "select",
          "Options": ["True", "False"],
          "Description": "enables Nesterov momentum (default: False)"
        }
      },
    
      "Adagrad": {
        "lr": {
          "Example": 0.1,
          "Default": "NA",
          "Required": 1,
          "DataType": "number",
          "Options": [],
          "Description": "learning rate"
        },
        "lr_decay": {
          "Example": 0.1,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "learning rate decay"
        },
        "weight_decay ": {
    
          "Example": 0.1,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "weight decay (L2 penalty)"
        },
        "eps": {
          "Example": 0.1,
          "Default": 0.0000000001,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": " term added to the denominator to improve numerical stability "
        }
    
      },
    
      "Adam": {
        "lr": {
          "Example": 0.1,
          "Default": 0.001,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "learning rate"
        },
    
        "betas": {
          "Example": [0.2, 0.222],
          "Default": [0.9, 0.999],
          "Required": 0,
          "DataType": "Tuple",
          "Options": [],
          "Description": "(Tuple[float, float]) coefficients used for computing running averages of gradient and its square (default: (0.9, 0.999))"
    
        },
    
        "eps": {
          "Example": 0.0001,
          "Default": 0.00000001,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": " term added to the denominator to improve numerical stability  (default: 1e-8)"
        },
    
        "weight_decay": {
          "Example": 0.1,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "weight decay (L2 penalty) (default: 0)"
        },
    
        "amsgrad": {
          "Example": "True",
          "Default": "False",
          "Required": 0,
          "DataType": "select",
          "Options": ["True", "False"],
          "Description": "whether to use the AMSGrad variant of this algorithm from the paper On the Convergence of Adam and Beyond (default: False)"
        }
    
      },
    
      "RMSProp": {
        "lr": {
          "Example": 0.1,
          "Default": 0.01,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "learning rate"
        },
    
        "momentum": {
          "Example": 0.1,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "momentum factor"
        },
    
        "alpha": {
          "Example": 0.1,
          "Default": 0.99,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "smoothing constant"
        },
    
        "eps": {
          "Example": 0.0001,
          "Default": 0.000000001,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "term added to the denominator to improve numerical stability (default: 1e-8)"
        },
    
        "centered": {
          "Example": "True",
          "Default": "False",
          "Required": 0,
          "DataType": "select",
          "Options": ["True", "False"],
          "Description": " if True, compute the centered RMSProp, the gradient is normalized by an estimation of its variance"
        },
    
        "weight_decay": {
          "Example": 0.1,
          "Default": 0,
          "Required": 0,
          "DataType": "number",
          "Options": [],
          "Description": "weight decay (L2 penalty) (default: 0)"
        }
    
      }
    };
    var temp_json={
        
        "Linear": {
          "in_features ": {
            "Example": "3",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": " size of each input sample"
          },
          "out_features": {
            "Example": "3",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "size of each output sample"
      
          },
          "bias": {
            "Example": "False",
            "Default": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "If set to False, the layer will not learn an additive bias."
          }
        },
      
        "Conv2d": {
      
          "in_channels": {
            "Example": "3",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Number of channels in the input image."
          },
      
          "out_channels": {
            "Example": "6",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Number of channels in the output image."
      
      
          },
          "kernel_size": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Size of the convolving kernel."
          }
      
      
      
      
        },
        "LSTM": {
      
          "input_size": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "The number of expected features in the input x"
      
          },
          "hidden_size": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "The number of features in the hidden state h"
      
          },
          "num_layers": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Number of recurrent layers. E.g., setting num_layers=2 would mean stacking two LSTMs"
          },
          "bias": {
            "Example": "False",
            "Default": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Whether to use bias weights b_ih and b_hh"
      
          },
          "dropout": {
            "Example": "1",
            "Default": "0 ",
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": " If non-zero, introduces a Dropout layer on the outputs of each LSTM layer except the last layer, with dropout probability equal to dropout"
      
          }
        },
        "RNNBase": {
      
          "input_size ": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "The number of expected features in the input x"
      
          },
          "hidden_size": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "The number of features in the hidden state h"
      
          },
          "num_layers": {
            "Example": "5",
            "Default": "",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Number of recurrent layers. E.g., setting num_layers=2 would mean stacking two LSTMs"
          },
      
          "bias": {
            "Example": "False",
            "Default": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Whether to use bias weights b_ih and b_hh"
      
          },
      
          "dropout": {
            "Example": "1",
            "Default": "0 ",
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": " If non-zero, introduces a Dropout layer on the outputs of each LSTM layer except the last layer, with dropout probability equal to dropout"
      
          }
      
      
      
        },
      
        "Dropout": {
          "p": {
            "Example": "0.3",
            "Default": "0.5 ",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "probability of an element to be zeroed"
      
          },
          "inplace": {
      
            "Example": "True",
            "Default": "False",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Whether to do this operation in-place"
          }
      
        },
      
        "Flatten": {
          "start_dim ": {
            "Example": "1",
            "Default": "1",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "first dim to flatten"
      
          },
          "end_dim": {
            "Example": "1",
            "Default": "-1",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "last dim to flatten "
          }
        },
      
        "ZeroPad2d": {
          "padding": {
            "Example": "(1, 1, 2, 0)",
            "Default": "",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "Pads the input tensor boundaries with zero.  Uses (padding_left, paddding_right, padding_top, padding_bottom)"
      
      
          }
      
        },
        "AvgPool2d": {
          "kernel_size ": {
            "Example": "(3, 2)",
            "Default": "",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "the size of the window. The first, int is used for the height dimension, and the second int for the width dimension"
          },
          "stride": {
            "Example": "(2, 1)",
            "Default": "",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "the stride of the window. Default value is kernel_size. The first, int is used for the height dimension, and the second int for the width dimension"
          },
          "padding": {
            "Example": "(2, 2)",
            "Default": "",
            "Required": 0,
            "DataType": "Tuple",
            "Options": [],
            "Description": "implicit zero paddings to be added on both sides. The first, int is used for the height dimension, and the second int for the width dimension"
          }
        },
      
        "MaxPool2d": {
      
          "kernel_size ": {
            "Example": "(3, 2)",
            "Default": "",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "the size of the window. The first, int is used for the height dimension, and the second int for the width dimension"
          },
          "stride": {
            "Example": "(2, 1)",
            "Default": "",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "the stride of the window. Default value is kernel_size. The first, int is used for the height dimension, and the second int for the width dimension"
          },
          "padding": {
            "Example": "(2, 2)",
            "Default": "",
            "Required": 0,
            "DataType": "Tuple",
            "Options": [],
            "Description": "implicit zero paddings to be added on both sides. The first, int is used for the height dimension, and the second int for the width dimension"
          }
        },

        "ReLU": {
          "name": "relu",
          "type": "activation-layer",
          "inplace": {
            "Example": "True",
            "Default": "False",
            "Required": 0,
            "DataType": "Bool",
            "Options": ["True", "False"],
            "Description": "Applies the rectified linear unit function element-wise"
      
          }
      
        },
      
        "RReLU": {
          "name": "rectified-relu",
          "type": "activation-layer",
      
          "lower": {
            "Example": "0.2",
            "Default": "0.125",
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": "lower bound of the uniform distribution"
          },
      
          "upper": {
            "Example": "0.5",
            "Default": "0.333333",
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": "Upper bound of the uniform distribution"
          },
      
          "inplace": {
            "Example": "True",
            "Default": "False",
            "Required": 0,
            "DataType": "Bool",
            "Options": ["True", "False"],
            "Description": "Applies the rectified linear unit function element-wise"
      
          }
      
        },
      
        "Sigmoid": {
          "name": "sigmoid",
          "type": "activation-layer"
        },
      
        "Tanh": {
          "name": "tanh",
          "type": "activation-layer"
        },
      
        "Softmax": {
          "name": "softmax",
          "type": "activation-layer",
          "dim": {
            "Example": "1",
            "Default": "None",
            "Required": 0,
            "DataType": "int",
            "Options": [],
            "Description": "A dimension along which Softmax will be computed (so every slice along dim will sum to 1)."
          }
        },
      
        "Softmax2d": {
          "name": "softmax-2d",
          "type": "activation-layer"
        },
      
        "LogSoftmax": {
          "name": "logsoftmax",
          "type": "activation-layer",
          "dim": {
            "Example": "1",
            "Default": "None",
            "Required": 0,
            "DataType": "int",
            "Options": [],
            "Description": "A dimension along which Softmax will be computed (so every slice along dim will sum to 1)."
          }
        },
    };
  }
  else if(project_details.lib === new String("Keras").valueOf() || project_details.library === new String("Keras").valueOf()){
    var temp_json={
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
    };
  }
  console.log(temp_json);
  const [jsondata, setjsondata] = React.useState(temp_json);
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
      destination.droppableId === new String("delete").valueOf() &&
      source.droppableId === new String("target").valueOf()
    ) {
        const element = components[source.index];
        var temp = components.filter((item) => item !== element);
        setcomponents(temp);
        setselected_layer(-1);
        setselected_layer_name("");
        setselected_layer_type("");
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
  const Train = ()=>{
    console.log("train");
  };

  return (

        <div className={classes.App}>
          
          <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChangetabs}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Preprocessing" {...a11yProps(0)} />
                <Tab label="Model" {...a11yProps(1)} />
                <Tab label="Hyperparameters" {...a11yProps(2)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
            Preprocessing
            </TabPanel>

            <TabPanel value={value} index={1} dir={theme.direction}>
              
              <DragDropContext onDragEnd={handleDragEnd}>
              
              <Grid container>
                <Grid item lg={3} md={3} sm={4} xs={4} className={classes.grid1}>
                  <div key="source" className={classes.column1}>
                    <span className={classes.spancss}>Layers</span>

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
                    <span className={classes.spancss}>Model</span>

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

                                        {/* <div
                                          className={classes.styleclose}
                                          onClick={() => handledelete(el)}
                                        >
                                          <CloseIcon />
                                        </div> */}
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
                            {selected_layer_name}
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
                                      {selected_layer_type[key]["Required"] === 1 ? (
                                        <span>*</span>
                                      ) : (
                                        <span></span>
                                      )}
                                    </div>

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
                                        <FormControl
                                          fullWidth
                                          variant="outlined"
                                          size="small"
                                        >
                                        
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
                                            }
                                            onChange={save_value(key)}
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
                                        <TextField
                                          required
                                          size="small"
                                          id="outlined-required"
                                          value={
                                            components[selected_layer][key]["value"]
                                              ? components[selected_layer][key][
                                                  "value"
                                                ]
                                              : components[selected_layer][key][
                                                  "Default"
                                                ]
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
              
                <div className={classes.delete}>
                    <Droppable droppableId="delete">
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            // className={classes.droppableColtarget}
                          >
                          
                          <h3>Drag here to delete the layer</h3>

                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                    
                      
                      </div>
                
              </Grid>
             
            </DragDropContext>

              
            </TabPanel>

            <TabPanel value={value} index={2} dir={theme.direction}>
                  hyperparam
                  
                  <Grid container>
                    <Grid item lg={4} md={4}>
                    </Grid>
                    <Grid item lg={2} md={2}>
                          <Button
                          variant="contained"
                          color="primary"
                          onClick={() => generate_code()}
                        >
                          Generate Code
                        </Button>
                    </Grid>
                    <Grid item lg={1} md={1}>
                    </Grid>
                    <Grid item lg={1} md={1}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => Train()}
                        >
                          Train
                        </Button>
                    </Grid>
                    <Grid item lg={4} md={4}>
                    </Grid>
                  </Grid>
            
            </TabPanel>

        </div>

  );
}

export default Step2;
