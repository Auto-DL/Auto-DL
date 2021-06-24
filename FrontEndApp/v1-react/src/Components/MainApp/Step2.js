import React, { useEffect } from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import fileDownload from "js-file-download";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import PropTypes from "prop-types";
import HomeService from "./HomeService";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import { Tooltip } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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
    marginLeft: "5.5%",
    marginRight: "10px",
  },
  column1: {
    padding: "0px",
  },
  column2: {
    padding: "0px",
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
    backgroundColor: "#c5e4ed",
    padding: "10px 10px 0 10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "auto",
    border: "1px solid black",
  },
  droppableColtarget: {
    width: "95%",
    backgroundColor: "#c5e4ed",
    padding: "10px 10px 10px 10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    maxHeight: "500px",
    maxWidth: "100%",
    overflowY: "auto",
    border: "1px solid black",
  },
  body3: {
    width: "100%",
    backgroundColor: "#D8D8D8",
    padding: "10px",
    borderRadius: "7px",
    display: "flex",
    flexDirection: "column",
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "auto",
  },
  item: {
    textAlign: "center",
    marginBottom: "10px",

    backgroundColor: "#adbce6",
    color: "black",
    border: "1px solid black",
    padding: "5px",
    borderRadius: "7px",
  },
  item1selected: {
    textAlign: "center",
    marginBottom: "10px",

    backgroundColor: "rgb(115,194,251)",
    color: "black",
    border: "1px solid black",
    padding: "5px",
    borderRadius: "7px 7px 7px 7px",
    width: "85%",
  },
  item1: {
    textAlign: "center",
    marginBottom: "10px",

    backgroundColor: "#adbce6",
    color: "black",
    border: "1px solid black",
    padding: "5px",
    borderRadius: "7px 7px 7px 7px",
    width: "85%",
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
    paddingLeft: "10%",
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
  spancss: {
    marginLeft: "40%",
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
  delete: {
    width: "97%",
    backgroundColor: "#D8D8D8",
    padding: "10px",
    borderRadius: "7px",
    minHeight: "80px",
    minWeight: "60px",
    margin: "10px",
    textAlign: "center",
  },
  sel: {
    width: "200px",
    margin: "20px",
  },
  _hyper: {
    width: "400px",
    margin: "20px",
    marginLeft: "30%",
  },
  save_plot: {
    marginTop: "25px",
  },
  action_btn: {
    float: "right",
    margin: "5px",
  },
  pad: {
    padding: "7px",
  },
}));

function Step2() {
  const classes = useStyles();
  const theme = useTheme();
  var project_details = JSON.parse(localStorage.getItem("project_details"));
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  const [components, setcomponents] = React.useState([]);
  const [selected_layer_type, setselected_layer_type] = React.useState("");
  const [selected_layer, setselected_layer] = React.useState(-1);
  const [value, setValue] = React.useState(0);
  const [state_hyperparam, setstate_hyperparam] = React.useState({
    metrics: "",
    epochs: 0,
    verbose: "",
    plot: true,
    optimizer: "",
    loss: "",
    learning_rate: 0,
  });
  const [showoptimizer, setshowoptimizer] = React.useState(false);
  const [selected_optimizer, setselected_optimizer] = React.useState({});
  const [showloss, setshowloss] = React.useState(false);
  const [selected_loss, setselected_loss] = React.useState({});
  const [openModal, setOpenModal] = React.useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const typecast_pre = () => {
    var dic = _.cloneDeep(all_prepro);

    for (var key in all_prepro) {
      try {
        dic[key] = JSON.parse(all_prepro[key]);
      } catch (err) {
        if (key.includes("target_size")) {
          if (typeof all_prepro[key] === "string") {
            const temp = all_prepro[key].split(",");
            dic[key] = [parseInt(temp[0]), parseInt(temp[1])];
          }
        } else {
          dic[key] = all_prepro[key];
        }
      }
    }
    return dic;
  };

  async function saveData() {
    const data = {
      username: username,
      project_id: project_details.project_id,
      layer_json: genrate_layers(),
      component_array: components,
    };

    const res = await HomeService.save_layers(token, data);

    if (res.status === 200) {
    } else {
    }
  }
  async function savepre() {
    const all_prepro_dub = await typecast_pre();

    const data = {
      username: username,
      project_id: project_details.project_id,
      preprocessing_params: all_prepro_dub,
    };

    const res = await HomeService.save_pre(token, data);

    if (res.status === 200) {
      // handleToggle_backdrop(false);
      // setAllProjects([...res.data.projects]);
      // setall_prepro(res.data.preprocessing);
    } else {
      // localStorage.clear();
      // history.push("/login");
    }
  }

  async function savehyper() {
    const hyper_data = generate_hyper();

    const data = {
      username: username,
      project_id: project_details.project_id,
      hyperparams: hyper_data,
    };
    const res = await HomeService.save_hyperparams(token, data);

    if (res.status === 200) {
    } else {
    }
  }

  const handleChangetabs = (event, newValue) => {
    if (newValue !== 1 && value === 1) {
      saveData();
    }
    if (newValue !== 0 && value === 0) {
      savepre();
    }
    if (newValue !== 2 && value === 2) {
      savehyper();
    }
    setValue(newValue);
  };

  if (
    project_details.lib === "Pytorch" ||
    project_details.library === "Pytorch"
  ) {
    var temp_pre_meta = {
      dataset: {
        name: "dataset",
        type: {
          Example: "image",
          Default: "None",
          Required: 1,
          DataType: "select",
          Options: ["image", "csv", "text"],
          Description: "Type of input to model",
        },
        // path: {
        //   Example: "/data/cats-vs-dogs/",
        //   Default: "None",
        //   Required: 1,
        //   DataType: "String",
        //   Options: [],
        //   Description: "Path to the data either absolute or relative",
        // },
      },
    };
    var temp_pre = {
      // is param in image processing?
      image: {
        params: {
          name: "params",
          input_type: "image",
          batch_size_train: {
            Example: 32,
            Default: 1,
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "how many samples per batch to load (Training) ",
          },
          n_batch_test: {
            Example: 32,
            Default: 1,
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "how many samples per batch to load (Test) ",
          },
          num_workers: {
            Example: 2,
            Default: 0,
            Required: 0,
            DataType: "number",
            Options: [],
            Description:
              "how many subprocesses to use for data loading. 0 means that the data will be loaded in the main process ",
          },

          shuffle: {
            Example: "False",
            Default: "True",
            Required: 0,
            DataType: "select",
            Options: ["True", "False"],
            Description:
              "set to True to have the data reshuffled at every epoch",
          },

          n_epochs: {
            Example: 1,
            Default: "NA",
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "Number of epochs to train the model",
          },
        },

        CenterCrop: {
          name: "augment",
          input_type: "image",

          size: {
            Example: "10",
            Default: "",
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "Output size of the cropped image ",
          },
        },

        Grayscale: {
          name: "augment",
          input_type: "image",

          num_output_channels: {
            Example: "1",
            Default: "1",
            Required: 1,
            DataType: "number",
            Options: [1, 3],
            Description: "Number of output channels ",
          },
        },
        Resize: {
          name: "augment",
          input_type: "image",

          size: {
            Example: "10",
            Default: "",
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "Output size of the image",
          },
          interpolation: {
            Example: "2",
            Default: "2",
            Required: 0,
            DataType: "number",
            Options: [],
            Description: "Desired interpolation enum defined by filters",
          },
        },
      },
      csv: {},
      text: {},
    };
    var temp_loss = {
      L1Loss: {
        name: "l1loss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "measures the mean absolute error (MAE) between each element in the input xx and target yy. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
      },

      MSELoss: {
        name: "mseLoss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      CrossEntropyLoss: {
        name: "cross-entropy-loss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class. If given, has to be a Tensor of size C",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
        ignore_index: {
          Example: "-100",
          Default: "-100",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets",
        },
      },

      NLLLoss: {
        name: "nlloss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class. If given, has to be a Tensor of size C. Otherwise, it is treated as if having all ones.",
        },
        ignore_index: {
          Example: "-100",
          Default: "-100",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      BCELoss: {
        name: "bceLoss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class.  If given, has to be a Tensor of size nbatch.",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
      },

      BCEWithLogitsLoss: {
        name: "bce-logits-loss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            "a manual rescaling weight given to the loss of each batch element. If given, has to be a Tensor of size nbatch.",
        },

        pos_weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a weight of positive examples. Must be a vector with length equal to the number of classes.",
        },

        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      SmoothL1Loss: {
        name: "mseLoss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
        beta: {
          Example: "0.5",
          Default: "1.0",
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            "Specifies the threshold at which to change between L1 and L2 loss. This value defaults to 1.0.",
        },
      },
    };
    var temp_optimizer = {
      SGD: {
        name: "SGD",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: "NA",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        momentum: {
          Example: 0.9,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "momentum factor",
        },

        dampening: {
          Example: 0.2,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "dampening for momentum",
        },

        nesterov: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "enables Nesterov momentum (default: False)",
        },
      },

      Adagrad: {
        name: "Adagrad",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: "NA",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },
        lr_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate decay",
        },
        "weight_decay ": {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty)",
        },
        eps: {
          Example: 0.1,
          Default: 0.0000000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " term added to the denominator to improve numerical stability ",
        },
      },

      Adam: {
        name: "Adam",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: 0.001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        betas: {
          Example: [0.2, 0.222],
          Default: [0.9, 0.999],
          Required: 0,
          DataType: "Tuple",
          Options: [],
          Description:
            "(Tuple[float, float]) coefficients used for computing running averages of gradient and its square (default: (0.9, 0.999))",
        },

        eps: {
          Example: 0.0001,
          Default: 0.00000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " term added to the denominator to improve numerical stability  (default: 1e-8)",
        },

        weight_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty) (default: 0)",
        },

        amsgrad: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description:
            "whether to use the AMSGrad variant of this algorithm from the paper On the Convergence of Adam and Beyond (default: False)",
        },
      },

      RMSProp: {
        name: "RMSProp",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: 0.01,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        momentum: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "momentum factor",
        },

        alpha: {
          Example: 0.1,
          Default: 0.99,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "smoothing constant",
        },

        eps: {
          Example: 0.0001,
          Default: 0.000000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            "term added to the denominator to improve numerical stability (default: 1e-8)",
        },

        centered: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description:
            " if True, compute the centered RMSProp, the gradient is normalized by an estimation of its variance",
        },

        weight_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty) (default: 0)",
        },
      },
    };
    var temp_json = {
      Linear: {
        in_features: {
          Example: "3",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: " size of each input sample",
        },
        out_features: {
          Example: "3",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "size of each output sample",
        },
        bias: {
          Example: "False",
          Default: "True",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description:
            "If set to False, the layer will not learn an additive bias.",
        },
      },

      Conv2d: {
        in_channels: {
          Example: "3",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "Number of channels in the input image.",
        },

        out_channels: {
          Example: "6",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "Number of channels in the output image.",
        },
        kernel_size: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "Size of the convolving kernel.",
        },
      },
      LSTM: {
        input_size: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "The number of expected features in the input x",
        },
        hidden_size: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "The number of features in the hidden state h",
        },
        num_layers: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description:
            "Number of recurrent layers. E.g., setting num_layers=2 would mean stacking two LSTMs",
        },
        bias: {
          Example: "False",
          Default: "True",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "Whether to use bias weights b_ih and b_hh",
        },
        dropout: {
          Example: "1",
          Default: "0 ",
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " If non-zero, introduces a Dropout layer on the outputs of each LSTM layer except the last layer, with dropout probability equal to dropout",
        },
      },
      RNNBase: {
        input_size: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "The number of expected features in the input x",
        },
        hidden_size: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "The number of features in the hidden state h",
        },
        num_layers: {
          Example: "5",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description:
            "Number of recurrent layers. E.g., setting num_layers=2 would mean stacking two LSTMs",
        },

        bias: {
          Example: "False",
          Default: "True",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "Whether to use bias weights b_ih and b_hh",
        },

        dropout: {
          Example: "1",
          Default: "0 ",
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " If non-zero, introduces a Dropout layer on the outputs of each LSTM layer except the last layer, with dropout probability equal to dropout",
        },
      },

      Dropout: {
        p: {
          Example: "0.3",
          Default: "0.5 ",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "probability of an element to be zeroed",
        },
        inplace: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "Whether to do this operation in-place",
        },
      },

      Flatten: {
        start_dim: {
          Example: "1",
          Default: "1",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "first dim to flatten",
        },
        end_dim: {
          Example: "1",
          Default: "-1",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "last dim to flatten ",
        },
      },

      ZeroPad2d: {
        padding: {
          Example: "(1, 1, 2, 0)",
          Default: "",
          Required: 1,
          DataType: "Tuple",
          Options: [],
          Description:
            "Pads the input tensor boundaries with zero.  Uses (padding_left, paddding_right, padding_top, padding_bottom)",
        },
      },
      AvgPool2d: {
        kernel_size: {
          Example: "(3, 2)",
          Default: "",
          Required: 1,
          DataType: "Tuple",
          Options: [],
          Description:
            "the size of the window. The first, int is used for the height dimension, and the second int for the width dimension",
        },
        stride: {
          Example: "(2, 1)",
          Default: "",
          Required: 1,
          DataType: "Tuple",
          Options: [],
          Description:
            "the stride of the window. Default value is kernel_size. The first, int is used for the height dimension, and the second int for the width dimension",
        },
        padding: {
          Example: "(2, 2)",
          Default: "",
          Required: 0,
          DataType: "Tuple",
          Options: [],
          Description:
            "implicit zero paddings to be added on both sides. The first, int is used for the height dimension, and the second int for the width dimension",
        },
      },

      MaxPool2d: {
        "kernel_size ": {
          Example: "(3, 2)",
          Default: "",
          Required: 1,
          DataType: "Tuple",
          Options: [],
          Description:
            "the size of the window. The first, int is used for the height dimension, and the second int for the width dimension",
        },
        stride: {
          Example: "(2, 1)",
          Default: "",
          Required: 1,
          DataType: "Tuple",
          Options: [],
          Description:
            "the stride of the window. Default value is kernel_size. The first, int is used for the height dimension, and the second int for the width dimension",
        },
        padding: {
          Example: "(2, 2)",
          Default: "",
          Required: 0,
          DataType: "Tuple",
          Options: [],
          Description:
            "implicit zero paddings to be added on both sides. The first, int is used for the height dimension, and the second int for the width dimension",
        },
      },

      ReLU: {
        name: "relu",
        type: "activation-layer",
        inplace: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "Bool",
          Options: ["True", "False"],
          Description:
            "Applies the rectified linear unit function element-wise",
        },
      },

      RReLU: {
        name: "rectified-relu",
        type: "activation-layer",

        lower: {
          Example: "0.2",
          Default: "0.125",
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "lower bound of the uniform distribution",
        },

        upper: {
          Example: "0.5",
          Default: "0.333333",
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "Upper bound of the uniform distribution",
        },

        inplace: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "Bool",
          Options: ["True", "False"],
          Description:
            "Applies the rectified linear unit function element-wise",
        },
      },

      Sigmoid: {
        name: "sigmoid",
        type: "activation-layer",
      },

      Tanh: {
        name: "tanh",
        type: "activation-layer",
      },

      Softmax: {
        name: "softmax",
        type: "activation-layer",
        dim: {
          Example: "1",
          Default: "None",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "A dimension along which Softmax will be computed (so every slice along dim will sum to 1).",
        },
      },

      Softmax2d: {
        name: "softmax-2d",
        type: "activation-layer",
      },

      LogSoftmax: {
        name: "logsoftmax",
        type: "activation-layer",
        dim: {
          Example: "1",
          Default: "None",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "A dimension along which Softmax will be computed (so every slice along dim will sum to 1).",
        },
      },
    };
  } else if (
    project_details.lib === "Keras" ||
    project_details.library === "Keras"
  ) {
    temp_json = {
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
          Default: "1, 1",
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
          Datatype: "float",
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
    temp_loss = {
      L1Loss: {
        name: "l1loss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "measures the mean absolute error (MAE) between each element in the input xx and target yy. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
      },

      MSELoss: {
        name: "mseLoss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      CrossEntropyLoss: {
        name: "cross-entropy-loss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class. If given, has to be a Tensor of size C",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
        ignore_index: {
          Example: "-100",
          Default: "-100",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets",
        },
      },

      NLLLoss: {
        name: "nlloss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class. If given, has to be a Tensor of size C. Otherwise, it is treated as if having all ones.",
        },
        ignore_index: {
          Example: "-100",
          Default: "-100",
          Required: 0,
          DataType: "int",
          Options: [],
          Description:
            "Specifies a target value that is ignored and does not contribute to the input gradient. When size_average is True, the loss is averaged over non-ignored targets",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      BCELoss: {
        name: "bceLoss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a manual rescaling weight given to each class.  If given, has to be a Tensor of size nbatch.",
        },
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed.",
        },
      },

      BCEWithLogitsLoss: {
        name: "bce-logits-loss",
        type: "loss-function",
        weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            "a manual rescaling weight given to the loss of each batch element. If given, has to be a Tensor of size nbatch.",
        },

        pos_weight: {
          Example: "torch.ones([64])",
          Default: "None",
          Required: 0,
          DataType: "Tensor",
          Options: [],
          Description:
            " a weight of positive examples. Must be a vector with length equal to the number of classes.",
        },

        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
      },

      SmoothL1Loss: {
        name: "mseLoss",
        type: "loss-function",
        reduction: {
          Example: "sum",
          Default: "mean",
          Required: 0,
          DataType: "select",
          Options: ["none", "mean", "sum"],
          Description:
            "Specifies the reduction to apply to the output: 'none' | 'mean' | 'sum'. 'none': no reduction will be applied, 'mean': the sum of the output will be divided by the number of elements in the output, 'sum': the output will be summed. Note: size_average and reduce are in the process of being deprecated, and in the meantime, specifying either of those two args will override reduction. Default: 'mean'",
        },
        beta: {
          Example: "0.5",
          Default: "1.0",
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            "Specifies the threshold at which to change between L1 and L2 loss. This value defaults to 1.0.",
        },
      },
    };
    temp_optimizer = {
      SGD: {
        name: "SGD",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: "NA",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        momentum: {
          Example: 0.9,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "momentum factor",
        },

        dampening: {
          Example: 0.2,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "dampening for momentum",
        },

        nesterov: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "enables Nesterov momentum (default: False)",
        },
      },

      Adagrad: {
        name: "Adagrad",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: "NA",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },
        lr_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate decay",
        },
        "weight_decay ": {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty)",
        },
        eps: {
          Example: 0.1,
          Default: 0.0000000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " term added to the denominator to improve numerical stability ",
        },
      },

      Adam: {
        name: "Adam",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: 0.001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        betas: {
          Example: [0.2, 0.222],
          Default: [0.9, 0.999],
          Required: 0,
          DataType: "Tuple",
          Options: [],
          Description:
            "(Tuple[float, float]) coefficients used for computing running averages of gradient and its square (default: (0.9, 0.999))",
        },

        eps: {
          Example: 0.0001,
          Default: 0.00000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            " term added to the denominator to improve numerical stability  (default: 1e-8)",
        },

        weight_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty) (default: 0)",
        },

        amsgrad: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description:
            "whether to use the AMSGrad variant of this algorithm from the paper On the Convergence of Adam and Beyond (default: False)",
        },
      },

      RMSProp: {
        name: "RMSProp",
        type: "optimizer",
        lr: {
          Example: 0.1,
          Default: 0.01,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "learning rate",
        },

        momentum: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "momentum factor",
        },

        alpha: {
          Example: 0.1,
          Default: 0.99,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "smoothing constant",
        },

        eps: {
          Example: 0.0001,
          Default: 0.000000001,
          Required: 0,
          DataType: "number",
          Options: [],
          Description:
            "term added to the denominator to improve numerical stability (default: 1e-8)",
        },

        centered: {
          Example: "True",
          Default: "False",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description:
            " if True, compute the centered RMSProp, the gradient is normalized by an estimation of its variance",
        },

        weight_decay: {
          Example: 0.1,
          Default: 0,
          Required: 0,
          DataType: "number",
          Options: [],
          Description: "weight decay (L2 penalty) (default: 0)",
        },
      },
    };
    temp_pre_meta = {
      dataset: {
        name: "dataset",
        type: {
          Example: "image",
          Default: "None",
          Required: 1,
          DataType: "select",
          Options: ["image", "csv", "text"],
          Description: "Type of input to model",
        },
        // path: {
        //   Example: "/data/cats-vs-dogs/",
        //   Default: "None",
        //   Required: 1,
        //   DataType: "String",
        //   Options: [],
        //   Description: "Path to the data either absolute or relative",
        // },
      },
    };
    temp_pre = {
      image: {
        augment: {
          name: "augment",
          input_type: "image",

          rotation_range: {
            Example: 40,
            Default: 0,
            Required: 0,
            DataType: "number",
            Options: [],
            Description: "Degree range for random rotations",
          },
          width_shift_range: {
            Example: "0.1",
            Default: "0.0",
            Required: 0,
            DataType: "number",
            Options: [],
            Description: "fraction of total width",
          },

          height_shift_range: {
            Example: "0.1",
            Default: "0.0",
            Required: 0,
            DataType: "number",
            Options: [],
            Description: "fraction of total height",
          },

          horizontal_flip: {
            Example: "True",
            Default: "",
            Required: 0,
            DataType: "select",
            Options: ["True", "False"],
            Description: "Whether you want to flip images horizontally",
          },

          rescale: {
            Example: 0.0039215,
            Default: 0,
            Required: 0,
            DataType: "number",
            Options: [],
            Description: "multiplies the data by the value provided",
          },
        },

        params: {
          name: "params",
          input_type: "image",

          target_size: {
            Example: [200, 200],
            Default: "None",
            Required: 1,
            DataType: "tuple",
            Options: [],
            Description: "Target size of the image",
          },
          batch_size: {
            Example: 64,
            Default: 32,
            Required: 1,
            DataType: "number",
            Options: [],
            Description: "Size of the batches of data",
          },

          class_mode: {
            Example: "binary",
            Default: "categorical",
            Required: 1,
            DataType: "select",
            Options: [
              "binary",
              "categorical",
              "input",
              "multi_output",
              "raw",
              "sparse",
              "None",
            ],
            Description: "Mode for yielding the targets",
          },
        },
      },
      csv: {},
      text: {},
    };
    var hyper = {
      params: {
        name: "params",
        input_type: "all",
        optimizer: {
          Example: "sgd",
          Default: "rmsprop",
          Required: 1,
          DataType: "select",
          Options: ["sgd", "rmsprop", "adam", "adadelta", "adagrad"],
          Description:
            "Optimizers tie together the loss function and model parameters by updating the model in response to the output of the loss function",
        },
        loss: {
          Example: "binary_crossentropy",
          Default: "None",
          Required: 1,
          DataType: "select",
          Options: [
            "binary_crossentropy",
            "categorical_crossentropy",
            "poisson",
            "mean_squared_error",
            "mean_absolute_error",
            "cosine_similarity ",
            "hinge",
          ],
          Description:
            "The purpose of loss functions is to compute the quantity that a model should seek to minimize during training.",
        },
        metrics: {
          Example: ["Accuracy"],
          Default: "None",
          Required: 1,
          DataType: "Tuple",
          Options: [
            "Accuracy",
            "BinaryCrossentropy",
            "CategoricalCrossentropy",
            "RootMeanSquaredError",
            "CosineSimilarity",
            "AUC",
            "Precision",
            "Recall",
            "MeanIoU",
            "Hinge",
          ],
          Description:
            "A metric is a function that is used to judge the performance of your model. Metric functions are similar to loss functions, except that the results from evaluating a metric are not used when training the model.",
        },
        epochs: {
          Example: 5,
          Default: "None",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "Number of iterations for training",
        },
        verbose: {
          Example: 1,
          Default: 1,
          Required: 0,
          DataType: "number",
          Options: [1, 0],
          Description: "Verbosity level",
        },
        plot: {
          Example: "False",
          Default: "True",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "Whether to plot training graphs",
        },
        save_plots: {
          Example: "False",
          Default: "True",
          Required: 0,
          DataType: "select",
          Options: ["True", "False"],
          Description: "Whether to save training graphs",
        },
      },
    };
  }

  const all_optimizer = temp_optimizer;
  const all_loss = temp_loss;
  const render_prepro_meta = temp_pre_meta;
  const render_prepro = temp_pre;
  const jsondata = temp_json;

  const [all_prepro, setall_prepro] = React.useState({});
  const [show_pre, setshow_pre] = React.useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
        project_id: project_details.project_id,
      };

      const res = await HomeService.get_layers(token, data);

      if (res.status === 200) {
        setcomponents(res.data.components);
      } else {
      }
    }
    fetchData();
    async function fetchDataPre() {
      const data = {
        username: username,
        project_id: project_details.project_id,
      };

      const res = await HomeService.get_pre(token, data);

      if (res.status === 200) {
        setall_prepro(res.data.preprocessing);

        if ("dataset-type" in res.data.preprocessing) {
          setshow_pre(true);
        }
      } else {
      }
    }
    fetchDataPre();

    async function fetchDataHyper() {
      const data = {
        username: username,
        project_id: project_details.project_id,
      };

      const res = await HomeService.get_hyperparams(token, data);

      if (res.status === 200) {
        var temp = res.data.hyperparams;
        setstate_hyperparam(temp);
      } else {
      }
    }
    fetchDataHyper();
  }, [project_details, token, username]);

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

    if (destination.droppableId === "source") {
      return;
    }
    if (
      destination.droppableId === "delete" &&
      source.droppableId === "target"
    ) {
      const element = components[source.index];
      var temp = components.filter((item) => item !== element);
      setcomponents(temp);
      setselected_layer(-1);
    }
    if (
      destination.droppableId === "target" &&
      source.droppableId === "target"
    ) {
      components.splice(
        destination.index,
        0,
        components.splice(source.index, 1)[0]
      );
      for (var i = 0; i < components.length; i++) {
        components[i]["id"] = components[i]["id"] + i;
        if (i === 0) {
          if (!("input_size" in components[i])) {
            components[i]["input_size"] = {
              Example: [200, 200, 3],
              Default: "NA",
              Required: 1,
              Datatype: "Tuple",
              Options: [],
              Description: "Input shape for the first layer",
            };
          }
        } else {
          try {
            delete components[i]["input_size"];
          } catch (err) {}
        }
      }
      setcomponents(components);
    }
    if (
      destination.droppableId === "target" &&
      source.droppableId === "source"
    ) {
      const list_names_of_source = Object.keys(jsondata);
      const temp = jsondata[list_names_of_source[source.index]];
      var dic = _.cloneDeep(temp);

      if (Array.isArray(components) && components.length === 0) {
      }

      for (var key1 in dic) {
        for (var key2 in dic[key1]) {
          if (key2 === "value") {
            delete dic[key1][key2];
          }
        }
      }
      dic["id"] = `${list_names_of_source[source.index]}-${source.index}-${
        destination.index
      }`;
      dic["name"] = list_names_of_source[source.index];

      components.splice(destination.index, 0, dic);

      for (i = 0; i < components.length; i++) {
        components[i]["id"] = components[i]["id"] + i;
        if (i === 0) {
          if (!("input_size" in components[i])) {
            components[i]["input_size"] = {
              Example: [200, 200, 3],
              Default: "NA",
              Required: 1,
              Datatype: "Tuple",
              Options: [],
              Description: "Input shape for the first layer",
            };
          }
        } else {
          try {
            delete components[i]["input_size"];
          } catch (err) {}
        }
      }

      setcomponents(components);
    }
  };
  const showdetails = (element) => {
    setselected_layer_type(element);

    var ele = components;
    var index = ele.lastIndexOf(element);

    setselected_layer(index);
  };
  const save_value = (prop) => (event) => {
    var param = prop;
    var index = selected_layer;
    const pervstate = Object.assign([], components);
    pervstate[index][param]["value"] = event.target.value;

    setcomponents(pervstate);
  };

  const genrate_layers = () => {
    var final_dict = {};
    const temp = components;
    var dic = _.cloneDeep(temp);
    var i = 0;
    if (project_details.lib === "Pytorch") {
      for (let [key0, value0] of Object.entries(dic)) {
        i = i + 1;
        for (var key1 in value0) {
          if (!(key1 === "name" || key1 === "id")) {
            if (key1 === "type") {
              final_dict[
                `activation_function-${i}-${dic[key0].name}-selected`
              ] = true;
            } else {
              for (var key2 in dic[key0][key1]) {
                if (key2 === "value") {
                  if (dic[key0][key1].Datatype === "number") {
                    final_dict[
                      `Layer-${i}-${dic[key0].name}-${key1}`
                    ] = parseInt(dic[key0][key1][key2]);
                  } else if (dic[key0][key1].Datatype === "tuple") {
                    final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = [];
                  } else {
                    final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] =
                      dic[key0][key1][key2];
                  }
                }
              }
            }
          }
        }
      }
    } else if (project_details.lib === "Keras") {
      for (let [key0, value0] of Object.entries(dic)) {
        i = i + 1;
        for (key1 in value0) {
          if (!(key1 === "name" || key1 === "id")) {
            for (key2 in dic[key0][key1]) {
              if (key2 === "value") {
                if (dic[key0][key1].Datatype === "number") {
                  final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = parseInt(
                    dic[key0][key1][key2]
                  );
                } else if (dic[key0][key1].Datatype === "float") {
                  final_dict[
                    `Layer-${i}-${dic[key0].name}-${key1}`
                  ] = parseFloat(dic[key0][key1][key2]);
                } else if (dic[key0][key1].Datatype === "Tuple") {
                  // const temp = dic[key0][key1][key2].split(",");
                  const temp = dic[key0][key1][key2]
                    .split(",")
                    .map(function (item) {
                      return parseInt(item, 10);
                    });

                  if (temp.length === 4) {
                    final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = [
                      [parseInt(temp[0]), parseInt(temp[1])],
                      [parseInt(temp[2]), parseInt(temp[3])],
                    ];
                  } else {
                    final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] = temp;
                  }
                } else {
                  final_dict[`Layer-${i}-${dic[key0].name}-${key1}`] =
                    dic[key0][key1][key2];
                }
              } else if (dic[key0].name === "Flatten") {
                final_dict[`Layer-${i}-${dic[key0].name}-data_format`] =
                  dic[key0][key1]["Default"];
              }
            }
          }
        }
      }
    }

    return final_dict;
  };

  // true means it is complete
  const layer_validation = () => {
    const temp = components;
    var dic = _.cloneDeep(temp);
    var i = 0;
    var flag = true;

    if (project_details.lib === "Keras") {
      for (let [key0, value0] of Object.entries(dic)) {
        i = i + 1;
        for (var key1 in value0) {
          if (!(key1 === "name" || key1 === "id")) {
            if (
              dic[key0][key1]["Required"] &&
              dic[key0][key1]["Datatype"] !== "select"
            ) {
              if (
                "value" in dic[key0][key1] &&
                dic[key0][key1]["value"] !== ""
              ) {
                continue;
              } else {
                flag = false;
                break;
              }
            } else {
              continue;
            }
          }
        }
      }
    }
    if (flag) {
      return true;
    } else {
      return false;
    }
  };

  const generate_hyper = () => {
    if (project_details.lib === "Pytorch") {
      const final_dict = {};
      var i = 0;
      for (let [key0, value0] of Object.entries(selected_optimizer)) {
        i = i + 1;
        for (var key1 in value0) {
          if (!(key1 === "name" || key1 === "id")) {
            if (key1 === "value") {
              if (selected_optimizer[key0][key1].Datatype === "number") {
                final_dict[
                  `${selected_optimizer.type}-${selected_optimizer.name}-${key0}`
                ] = parseInt(selected_optimizer[key0][key1]);
              } else if (selected_optimizer[key0][key1].Datatype === "tuple") {
                const temp = selected_optimizer[key0][key1].split(",");

                final_dict[
                  `${selected_optimizer.type}-${selected_optimizer.name}-${key0}`
                ] = [parseInt(temp[0]), parseInt(temp[1])];
              } else {
                final_dict[
                  `${selected_optimizer.type}-${selected_optimizer.name}-${key0}`
                ] = selected_optimizer[key0][key1];
              }
            }
          }
        }
      }
      i = 0;
      for (let [key0, value0] of Object.entries(selected_loss)) {
        i = i + 1;
        for (key1 in value0) {
          if (!(key1 === "name" || key1 === "id")) {
            if (key1 === "value") {
              if (selected_loss[key0][key1].Datatype === "number") {
                final_dict[
                  `${selected_loss.type}-${selected_loss.name}-${key0}`
                ] = parseInt(selected_loss[key0][key1]);
              } else if (selected_loss[key0][key1].Datatype === "tuple") {
                const temp = selected_loss[key0][key1].split(",");

                final_dict[
                  `${selected_loss.type}-${selected_loss.name}-${key0}`
                ] = [parseInt(temp[0]), parseInt(temp[1])];
              } else {
                final_dict[
                  `${selected_loss.type}-${selected_loss.name}-${key0}`
                ] = selected_loss[key0][key1];
              }
            }
          }
        }
      }

      const dict = {
        metrics: state_hyperparam.metrics,
        epochs: parseFloat(state_hyperparam.epochs),
        verbose: state_hyperparam.verbose,
        plot: state_hyperparam.plot,
        learning_rate: parseFloat(state_hyperparam.learning_rate),
      };
      var temp = Object.assign({}, final_dict, dict);
    } else {
      temp = {
        metrics: state_hyperparam.metrics,
        epochs: parseFloat(state_hyperparam.epochs),
        verbose: state_hyperparam.verbose,
        plot: state_hyperparam.plot,
        loss: state_hyperparam.loss,
        optimizer: state_hyperparam.optimizer,
        learning_rate: parseFloat(state_hyperparam.learning_rate),
      };
    }

    return temp;
  };
  const generate_code = async () => {
    if (layer_validation()) {
      const hyper_data = generate_hyper();
      const layers_data = genrate_layers();
      var _data = Object.assign({}, hyper_data, layers_data);
      const data = {
        username: username,
        project_id: project_details.project_id,
        training_params: _data,
      };
      const res = await HomeService.generate_code(token, data);

      if (res.status === 200) {
        // handleToggle_backdrop(false);
        // setAllProjects([...res.data.projects]);
        setOpenModal(true);
      } else {
        // localStorage.clear();
        // history.push("/login");
      }
    } else {
      alert("please fill all the required fileds in layers");
    }
  };

  const download_code = async () => {
    const data = {
      username: username,
      project_id: project_details.project_id,
    };
    const res = await HomeService.download_code(token, data);
    if (res.status === 200) {
      fileDownload(res.data, "test.py");
    }
  };
  const Train = async () => {
    const hyper_data = generate_hyper();
    const layers_data = genrate_layers();
    var _data = Object.assign({}, hyper_data, layers_data);
    const data = {
      username: username,
      project_id: project_details.project_id,
      training_params: _data,
    };
    const res = await HomeService.train_model(token, data);

    if (res.status === 200) {
      // handleToggle_backdrop(false);
      // setAllProjects([...res.data.projects]);
    } else {
      // localStorage.clear();
      // history.push("/login");
    }
  };

  const handleChange_hyperparameter = (prop) => (event) => {
    if (prop === "plot") {
      if (state_hyperparam.plot) {
        setstate_hyperparam({
          ...state_hyperparam,
          [prop]: false,
        });
      } else {
        setstate_hyperparam({
          ...state_hyperparam,
          [prop]: true,
        });
      }
    } else if (prop === "metrics") {
      setstate_hyperparam({
        ...state_hyperparam,
        [prop]: [event.target.value],
      });
    } else {
      setstate_hyperparam({
        ...state_hyperparam,
        [prop]: event.target.value,
      });
    }
  };

  const handleChange_hyperparameter_l_o = (prop) => (event) => {
    if (prop === "optimizer") {
      if (event.target.value !== "") {
        setselected_optimizer(all_optimizer[event.target.value]);
        setstate_hyperparam({
          ...state_hyperparam,
          optimizer: event.target.value,
        });
        setshowoptimizer(true);
      }
    } else {
      if (event.target.value !== "") {
        setselected_loss(all_loss[event.target.value]);
        setstate_hyperparam({ ...state_hyperparam, loss: event.target.value });
        setshowloss(true);
      }
    }
  };

  const save_value_hyper = (prop, b) => (event) => {
    if (b === "optimizer") {
      var param = prop;
      const pervstate = Object.assign([], selected_optimizer);
      pervstate[param]["value"] = event.target.value;

      setselected_optimizer(pervstate);
    } else {
      param = prop;
      const pervstate = Object.assign([], selected_loss);
      pervstate[param]["value"] = event.target.value;

      setselected_loss(pervstate);
    }
  };

  const _hyper = (a, b) => {
    if (a === "optimizer") {
      if (b === "save") {
        setshowoptimizer(false);
      } else {
        setstate_hyperparam({ ...state_hyperparam, optimizer: "" });
        setselected_optimizer({});
        setshowoptimizer(false);
      }
    } else {
      if (b === "save") {
        setshowloss(false);
      } else {
        setstate_hyperparam({ ...state_hyperparam, loss: "" });
        setselected_loss({});
        setshowloss(false);
      }
    }
  };
  const handle_pre_meta = (key, key1, datatype) => (event) => {
    var temp_dic = {};
    for (var key of Object.keys(temp_pre)) {
      for (var key1 of Object.keys(temp_pre[key])) {
        if (temp_pre[key][key1]) {
          for (var key2 of Object.keys(temp_pre[key][key1])) {
            if (key2 !== "name" && key2 !== "input_type")
              temp_dic[`${key}-${key1}-${key2}`] =
                temp_pre[key][key1][key2]["Default"];
          }
        } else {
          temp_dic[`${key}-${key1}`] = temp_pre[key][key1]["Default"];
        }
      }
    }
    setall_prepro(temp_dic);

    all_prepro[`dataset-type`] = event.target.value;
    setall_prepro(all_prepro);
    setshow_pre(!show_pre);
  };
  const handle_pre = (key, key1, datatype) => (event) => {
    var dic = _.cloneDeep(all_prepro);
    dic[`${all_prepro["dataset-type"]}-${key}-${key1}`] = event.target.value;
    setall_prepro(dic);
  };

  return (
    <div className={classes.App}>
      <Dialog onClose={handleCloseModal} open={openModal}>
        <DialogTitle onClose={handleCloseModal}>Code Generated!</DialogTitle>
        <DialogContent dividers>
          <div>
            <h3>Instructions:</h3>
            <ul>
              <li>
                Click the "Download Code" button to download the generated code
                to any directory of your choice.
              </li>
              <br></br>
              <Tooltip title="See value of 'base' variable in the python file">
                <li>
                  Make sure you place the data files relative to the downloaded
                  script
                </li>
              </Tooltip>
              <br></br>
              <li>
                <Tooltip
                  title="Exmaple: python3 test.py"
                  placement="bottom-start"
                >
                  <div> Run the code.</div>
                </Tooltip>
              </li>
            </ul>
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={download_code} color="primary">
            Download Code
          </Button>
        </DialogActions>
      </Dialog>

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
        {value === 0 ? (
          <Grid container>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
            <Grid item lg={10} md={10} sm={10} xs={10}>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {/* meta */}
                  {Object.keys(render_prepro_meta).map((key, index) => (
                    <>
                      <div className={classes.heading}>{key}</div>
                      <Grid container>
                        {Object.keys(render_prepro_meta[key]).map(
                          (key1, index1) =>
                            key1 === "name" ? null : (
                              <>
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
                                        render_prepro_meta[key][key1][
                                          "DataType"
                                        ]
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
                                        <option value={op}>{op}</option>
                                      ))}
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </>
                            )
                        )}
                      </Grid>
                    </>
                  ))}
                  {/* pre */}

                  {show_pre ? (
                    <>
                      {Object.keys(
                        render_prepro[all_prepro["dataset-type"]]
                      ).map((key, index) => (
                        <>
                          <div className={classes.heading}>{key}</div>
                          <Grid container>
                            {Object.keys(
                              render_prepro[all_prepro["dataset-type"]][key]
                            ).map((key1, index1) =>
                              key1 === "name" ||
                              key1 === "input_type" ? null : (
                                <>
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
                                </>
                              )
                            )}
                          </Grid>
                        </>
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
                                return (
                                  <div
                                    className={classes.container}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <div
                                      className={
                                        selected_layer ===
                                        el.id.charAt(el.id.length - 1)
                                          ? classes.item1selected
                                          : classes.item1
                                      }
                                      onClick={() => showdetails(el)}
                                    >
                                      {el.name}
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
                <span className={classes.spancss}>
                  {Object.keys(selected_layer_type).length !== 0
                    ? "name" in components[selected_layer]
                      ? components[selected_layer].name
                      : null
                    : null}
                </span>

                <div className={classes.body3}>
                  {Object.keys(selected_layer_type).length === 0 ? (
                    <h3>please select some layer first</h3>
                  ) : (
                    <div className={classes.innerpad}>
                      {Object.keys(components[selected_layer]).map(
                        (key, index) => (
                          <>
                            {key === "name" ||
                            key === "id" ||
                            key === "type" ? null : (
                              <div className={classes.batch}>
                                <div className={classes.title}>
                                  {" "}
                                  {key}
                                  &nbsp;{" "}
                                  {selected_layer_type[key]["Required"] ===
                                  1 ? (
                                    <span>*</span>
                                  ) : (
                                    <span></span>
                                  )}
                                </div>

                                <div
                                  className={classes.infoicon}
                                  title={
                                    components[selected_layer][key][
                                      "Description"
                                    ]
                                  }
                                >
                                  <HelpOutlineIcon />
                                </div>
                                {components[selected_layer][key]["Datatype"] ===
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
                                          components[selected_layer][key][
                                            "value"
                                          ]
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
                                            ] === "NA"
                                          ? ""
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
                  )}
                </div>
              </div>
            </Grid>

            <div className={classes.delete}>
              <Droppable droppableId="delete">
                {(provided, snapshot) => {
                  return (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
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
                          return <option value={name}>{name}</option>;
                        })}
                      </Select>
                    </FormControl>

                    {showoptimizer ? (
                      <div className={classes.card}>
                        {Object.keys(selected_optimizer).map((key, index) => (
                          <>
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
                                          (arr) => (
                                            <option value={arr}>{arr}</option>
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
                          </>
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
                          return <option value={name}>{name}</option>;
                        })}
                      </Select>
                    </FormControl>

                    {showloss ? (
                      <div className={classes.card}>
                        {Object.keys(selected_loss).map((key, index) => (
                          <>
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
                                          (arr) => (
                                            <option value={arr}>{arr}</option>
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
                          </>
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
    </div>
  );
}

export default Step2;
