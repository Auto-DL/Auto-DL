import React, { useState, useEffect } from "react";
import {
  Button,
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  Dialog,
  Tooltip,
  Snackbar,
} from "@material-ui/core";

import {
  useStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "./step-2/styles.js";
import _ from "lodash";
import PropTypes from "prop-types";
import fileDownload from "js-file-download";
import { validate_layers } from "./validation";
import HomeService from "./HomeService";
import PreprocessingTab from "./step-2/PreprocessingTab";
import LayerTab from "./step-2/LayerTab";
import HyperparameterTab from "./step-2/HyperparameterTab";
import RecommendationService from "../RecommendationService.js"

import MuiAlert from "@material-ui/lab/Alert";
import GithubPublishModal from "./step-2/GithubPublishModal";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
          <Typography component={"span"}>{children}</Typography>
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

function Step2() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [alertopen, setAlertopen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  var project_details = JSON.parse(localStorage.getItem("project_details"));
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));
  const [components, setcomponents] = useState([]);
  const [selected_layer_type, setselected_layer_type] = useState("");
  const [selected_layer, setselected_layer] = useState(-1);
  const [selected_layer_name, setselected_layer_name] = useState("");
  const [value, setValue] = useState(0);
  const [gitusername, setGitusername] = useState("");

  const [state_hyperparam, setstate_hyperparam] = useState({
    metrics: "",
    epochs: 0,
    verbose: "",
    plot: true,
    optimizer: "",
    loss: "",
    learning_rate: 0,
  });
  const [showoptimizer, setshowoptimizer] = useState(false);
  const [selected_optimizer, setselected_optimizer] = useState({});
  const [showloss, setshowloss] = useState(false);
  const [selected_loss, setselected_loss] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openGitHubDetails, setOpenGitHubDetails] = useState(false);

  const [generated_file_path, setgenerated_file_path] = useState("");

  const [alert, setalert] = React.useState({
    msg: "This is alert msg",
    severity: "warning",
  });

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const getProjectId = () => {
    const project_id =
      project_details.username !== username
        ? "shared_" + project_details.project_id
        : project_details.project_id;
    return project_id;
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertopen(false);
  };

  const handleCloseGitHubDetails = () => {
    setOpenModal(false);
    setOpenGitHubDetails(false);
  };

  const handlePublishModalClick = async (e) => {
    const data = { username: username };
    const res = await HomeService.gitUsername(token, data);
    if (res.status === 200) {
      setGitusername(res.data.git_username);
    } else {
      setGitusername("");
    }
    setOpenModal(false);
    setOpenGitHubDetails(true);
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
      project_id: getProjectId(),
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
      project_id: getProjectId(),
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
      project_id: getProjectId(),
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

  let temp_optimizer, temp_pre_meta, temp_pre, temp_loss, temp_json, hyper;

  if (
    project_details.lib === "Pytorch" ||
    project_details.library === "Pytorch"
  ) {
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

    temp_json = {
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

    hyper = {
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
          Description: " to save training Whethergraphs",
        },
      },
    };
  }

  const [all_optimizer, setall_optimizer] = useState(temp_optimizer);
  const [all_loss, setall_loss] = useState(temp_loss);
  const [all_prepro, setall_prepro] = useState({});
  const [render_prepro_meta, setrender_prepro_meta] = useState(temp_pre_meta);
  const [render_prepro, setrender_prepro] = useState(temp_pre);
  const [show_pre, setshow_pre] = useState(false);
  const [jsondata, setjsondata] = useState(temp_json);

  const [invalidLayerIndices, setInvalidLayerIndices] = useState(new Set());
  const [validLayerIndices, setValidLayerIndices] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
        project_id: getProjectId(),
      };

      const res = await HomeService.get_layers(token, data);

      if (res.status === 200) {
        setcomponents(res.data.components);
        let tempArr = res.data.components;
        const { invalidIndices, validIndices } = validate_layers(tempArr);
        setInvalidLayerIndices(invalidIndices);
        setValidLayerIndices(validIndices);
      } else {
      }
    }

    fetchData();

    async function fetchDataPre() {
      const data = {
        username: username,
        project_id: getProjectId(),
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
        project_id: getProjectId(),
      };

      const res = await HomeService.get_hyperparams(token, data);

      if (res.status === 200) {
        var temp = res.data.hyperparams;
        setstate_hyperparam(temp);
      } else {
      }
    }

    fetchDataHyper();
  }, [getProjectId(), token, username]);

  const handleDragEnd = async({ destination, source }) => {
    let tempArr = _.cloneDeep(components);

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
      console.log("dropping in  source", tempArr);
      return;
    }

    if (
      destination.droppableId === "delete" &&
      source.droppableId === "target"
    ) {
      console.log("deleting from target");
      const element = tempArr[source.index];

      var temp = tempArr.filter((item) => item !== element);
      tempArr = temp;

      setselected_layer(-1);
      setselected_layer_name("");
      setselected_layer_type("");
    }
    if (
      destination.droppableId === "target" &&
      source.droppableId === "target"
    ) {
      // It means the layer which is draggged is selected
      let dragLayerIsSelcted = false;
      console.log(
        'tempArr["id"] selected_layer_type["id"]',
        tempArr[source.index]["id"],
        selected_layer_type["id"]
      );

      if (tempArr[source.index]["id"] === selected_layer_type["id"]) {
        dragLayerIsSelcted = true;
      }

      tempArr.splice(destination.index, 0, tempArr.splice(source.index, 1)[0]);
      // console.log("source and des index are",source.index,destination.index);

      if (dragLayerIsSelcted) {
        setselected_layer_type(tempArr[destination.index]);
        setselected_layer(destination.index);
        console.log(
          "selected_layer_type on drag and id is  ",
          selected_layer_type,
          selected_layer_type["id"]
        );
      } else {
        setselected_layer_type("");
        setselected_layer(-1);
      }

      // console.log("compinents after splice is ",components);
      for (var i = 0; i < tempArr.length; i++) {
        tempArr[i]["id"] = tempArr[i]["id"] + i;
        if (i === 0) {
          if (!("input_size" in tempArr[i]) || !("input_shape" in tempArr[i])) {
            tempArr[i]["input_shape"] = {
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
            delete tempArr[i]["input_shape"];
          } catch (err) { }
        }
      }
      // setcomponents(components);
    }
    if (
      destination.droppableId === "target" &&
      source.droppableId === "source"
    ) {
      console.log("dropping from source to target");

      const list_names_of_source = Object.keys(jsondata);

      const temp = jsondata[list_names_of_source[source.index]];

      var dic = _.cloneDeep(temp);

      dic["id"] = `${list_names_of_source[source.index]}-${source.index}-${destination.index
        }`;

      dic["name"] = list_names_of_source[source.index];

      tempArr.splice(destination.index, 0, dic);

      for (i = 0; i < tempArr.length; i++) {
        tempArr[i]["id"] = tempArr[i]["id"] + i;

        if (i === 0) {
          if (!("input_size" in tempArr[i]) || !("input_shape" in tempArr[i])) {
            tempArr[i]["input_shape"] = {
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
            delete tempArr[i]["input_shape"];
          } catch (err) { }
        }
      }
    }

    const { invalidIndices, validIndices } = validate_layers(tempArr);
    // console.log("val res is",invalidIndices,validIndices);
    setInvalidLayerIndices(invalidIndices);
    setValidLayerIndices(validIndices);

    setcomponents(tempArr);

    const recommendations = await RecommendationService.getRecommendations(tempArr);
    if (recommendations) {
      console.log(recommendations.data.predictions);
    }
	}

	

  const handleInvalidLayers = (validate_res) => {
    const indexSet = new Set();
    //extracting indices of invalid layers and collecting them in a set
    for (let i = 0; i < validate_res.length; i++) {
      for (let j = 0; j < validate_res[i].indices.length; j++) {
        indexSet.add(validate_res[i].indices[j]);
      }
    }
    return indexSet;
  };

  const showdetails = (element) => {
    setselected_layer_type(element);
    console.log("selected layer type is ", selected_layer_type);

    var ele = components;
    var index = ele.lastIndexOf(element);
    console.log("index is ", index);

    setselected_layer(index);
  };

  const save_value = (prop) => (event) => {
    var param = prop;
    var index = selected_layer;
    const pervstate = Object.assign([], components);
    pervstate[index][param]["value"] = event.target.value;
    console.log("prop is ", prop);
    console.log(event.target.value);
    console.log(components);
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
        project_id: getProjectId(),
        training_params: _data,
      };
      const res = await HomeService.generate_code(token, data);

      if (res.status === 200) {
        // handleToggle_backdrop(false);
        // setAllProjects([...res.data.projects]);
        setOpenModal(true);
        setgenerated_file_path(res.data.path);
      } else {
        // localStorage.clear();
        // history.push("/login");
      }
    } else {
      //states for dialog box which is triggered if necessary details are blank
      //before generating code.
      setOpenErrorDialog(true);
    }
  };

  const download_code = async () => {
    const data = {
      username: username,
      project_id: getProjectId(),
    };
    const res = await HomeService.download_code(token, data);
    if (res.status === 200) {
      var filename_of_download = project_details.output_file_name.trim();
      filename_of_download = filename_of_download.split(".")[0] || "output";
      fileDownload(res.data, `${filename_of_download}.py`);
    }
  };

  const Train = async () => {
    const hyper_data = generate_hyper();
    const layers_data = genrate_layers();
    var _data = Object.assign({}, hyper_data, layers_data);
    const data = {
      username: username,
      project_id: getProjectId(),
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

  const handleCloneLayer = (layer) => {
    // handleChangetabs();

    //getting source names of all layers
    const list_names_of_source = Object.keys(jsondata);
    let source_index;

    //where to place layer in UI
    let destination_index = Number(layer.id[layer.id.length - 1]) + 1;
    // console.log("destination index  is ",destination_index);

    //finding layer in source array for id framing
    for (let i = 0; i < list_names_of_source.length; i++) {
      if (layer.name === list_names_of_source[i]) {
        source_index = i;
        break;
      }
    }

    //cloning the layer
    let clonedLayer = _.cloneDeep(layer);

    //assigning new id and name
    clonedLayer["id"] = `${layer.name}-${source_index}-${destination_index}`;
    clonedLayer["name"] = list_names_of_source[source_index];

    //inserting layer just below the layer to be cloned
    components.splice(destination_index, 0, clonedLayer);

    for (let i = 0; i < components.length; i++) {
      components[i]["id"] = components[i]["id"] + i;
      if (i === 0) {
        if (
          !("input_size" in components[i]) ||
          !("input_shape" in components[i])
        ) {
          components[i]["input_shape"] = {
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
          delete components[i]["input_shape"];
        } catch (err) { }
      }
      // console.log("inside loop id",components[i]["id"]);
    }
    let some_dic = _.cloneDeep(components);
    setcomponents(some_dic);
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
          <Button
            variant="contained"
            onClick={(e) => handlePublishModalClick(e)}
            color="primary"
          >
            Publish to GitHub
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openGitHubDetails}
        onClose={handleCloseGitHubDetails}
        fullWidth
        maxWidth="sm"
      >
        <GithubPublishModal
          username={username}
          gitusername={gitusername}
          token={token}
          project_details={project_details}
          handleClose={handleClose}
          setOpenModal={setOpenModal}
          handleToggle={handleToggle}
          setalert={setalert}
          setAlertopen={setAlertopen}
          open={open}
          setOpen={setOpen}
          setOpenGitHubDetails={setOpenGitHubDetails}
        />
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

      <PreprocessingTab
        TabPanel={TabPanel}
        value={value}
        render_prepro={render_prepro}
        render_prepro_meta={render_prepro_meta}
        all_prepro={all_prepro}
        handle_pre={handle_pre}
        handle_pre_meta={handle_pre_meta}
        show_pre={show_pre}
      />

      <LayerTab
        TabPanel={TabPanel}
        value={value}
        handleDragEnd={handleDragEnd}
        jsondata={jsondata}
        components={components}
        selected_layer={selected_layer}
        selected_layer_type={selected_layer_type}
        showdetails={showdetails}
        save_value={save_value}
        handleCloneLayer={handleCloneLayer}
        invalidLayerIndices={invalidLayerIndices}
        validLayerIndices={validLayerIndices}
      />

      <HyperparameterTab
        TabPanel={TabPanel}
        value={value}
        project_details={project_details}
        state_hyperparam={state_hyperparam}
        handleChange_hyperparameter={handleChange_hyperparameter}
        handleChange_hyperparameter_l_o={handleChange_hyperparameter_l_o}
        all_optimizer={all_optimizer}
        all_loss={all_loss}
        showoptimizer={showoptimizer}
        selected_optimizer={selected_optimizer}
        selected_loss={selected_loss}
        _hyper={_hyper}
        save_value_hyper={save_value_hyper}
        showloss={showloss}
        generate_code={generate_code}
        Train={Train}
        openErrorDialog={openErrorDialog}
        setOpenErrorDialog={setOpenErrorDialog}
        hyper={hyper}
      />

      <Snackbar
        open={alertopen}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Step2;
