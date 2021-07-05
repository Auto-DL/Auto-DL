export const pytorch_preprocessing = {
  // is param in image processing?
  image: {
    params: {
      parameters: {
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
      config: {
        name: "params",
        input_type: "image",
      },
    },

    CenterCrop: {
      parameters: {
        size: {
          Example: "10",
          Default: "",
          Required: 1,
          DataType: "number",
          Options: [],
          Description: "Output size of the cropped image ",
        },
      },
      config: {
        name: "augment",
        input_type: "image",
      },
    },

    Grayscale: {
      parameters: {
        num_output_channels: {
          Example: "1",
          Default: "1",
          Required: 1,
          DataType: "number",
          Options: [1, 3],
          Description: "Number of output channels ",
        },
      },
      config: {
        name: "augment",
        input_type: "image",
      },
    },
    Resize: {
      parameters: {
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
      config: {
        name: "augment",
        input_type: "image",
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
