export const temp_loss = {
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
