export const temp_pre = {
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
        Description: "set to True to have the data reshuffled at every epoch",
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
    // ToTensor: {
    //   name: "augment",
    //   input_type: "image",

    // },
  },
  csv: {},
  text: {},
};
