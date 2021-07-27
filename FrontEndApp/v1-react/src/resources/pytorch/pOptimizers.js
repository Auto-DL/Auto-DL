export const pytorch_optimizers = {
  SGD: {
    parameters: {
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
    config: {
      name: "SGD",
      type: "optimizer",
    },
  },

  Adagrad: {
    parameters: {
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
    config: {
      name: "Adagrad",
      type: "optimizer",
    },
  },

  Adam: {
    parameters: {
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
    config: {
      name: "Adam",
      type: "optimizer",
    },
  },

  RMSProp: {
    parameters: {
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
    config: {
      name: "RMSProp",
      type: "optimizer",
    },
  },
};
