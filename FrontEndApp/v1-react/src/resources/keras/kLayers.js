export const keras_layers = {
  Conv2D: {
    parameters: {
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
    dimensions: {
      expected_dim: 3,
      returned_dim: 3,
    },
    config: {},
  },

  Dense: {
    parameters: {
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
    dimensions: {
      expected_dim: 1,
      returned_dim: 1,
    },
    config: {},
  },

  LSTM: {
    parameters: {
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
    dimensions: {
      expected_dim: 2,
      returned_dim: 2,
    },
    config: {},
  },

  SimpleRNN: {
    parameters: {
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
    dimensions: {
      expected_dim: 1,
      returned_dim: 1,
    },
    config: {},
  },

  Dropout: {
    parameters: {
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
    dimensions: {
      expected_dim: "all",
      returned_dim: "same",
    },
    config: {},
  },

  Flatten: {
    parameters: {
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
    dimensions: {
      expected_dim: "all",
      returned_dim: 1,
    },
    config: {},
  },

  ZeroPadding2D: {
    parameters: {
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
    dimensions: {
      expected_dim: 3,
      returned_dim: 3,
    },
    config: {},
  },

  AveragePooling2D: {
    parameters: {
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
    dimensions: {
      expected_dim: 3,
      returned_dim: 3,
    },
    config: {},
  },

  MaxPooling2D: {
    parameters: {
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
    dimensions: {
      expected_dim: 3,
      returned_dim: 3,
    },
    config: {},
  },
};
