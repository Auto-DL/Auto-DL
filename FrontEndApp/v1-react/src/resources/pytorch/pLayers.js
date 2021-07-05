export const pytorch_layers = {
  Linear: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  Conv2d: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  LSTM: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  RNNBase: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  Dropout: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  Flatten: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  ZeroPad2d: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },
  AvgPool2d: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  MaxPool2d: {
    parameters: {
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
    dimensions: {},
    configs: {},
  },

  ReLU: {
    parameters: {
      inplace: {
        Example: "True",
        Default: "False",
        Required: 0,
        DataType: "Bool",
        Options: ["True", "False"],
        Description: "Applies the rectified linear unit function element-wise",
      },
    },
    dimensions: {},
    configs: {
      name: "relu",
      type: "activation-layer",
    },
  },

  RReLU: {
    parameters: {
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
        Description: "Applies the rectified linear unit function element-wise",
      },
    },
    dimensions: {},
    configs: {
      name: "rectified-relu",
      type: "activation-layer",
    },
  },

  Sigmoid: {
    dimensions: {},
    configs: {
      name: "sigmoid",
      type: "activation-layer",
    },
  },

  Tanh: {
    dimensions: {},
    configs: {
      name: "tanh",
      type: "activation-layer",
    },
  },

  Softmax: {
    parameters: {
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
    dimensions: {},
    configs: {
      name: "softmax",
      type: "activation-layer",
    },
  },

  Softmax2d: {
    dimensions: {},
    configs: {
      name: "softmax-2d",
      type: "activation-layer",
    },
  },

  LogSoftmax: {
    parameters: {
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
    dimensions: {},
    configs: {
      name: "logsoftmax",
      type: "activation-layer",
    },
  },
};
