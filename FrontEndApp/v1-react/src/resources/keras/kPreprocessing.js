export const keras_preprocessing = {
	image: {
		augment: {
			config: { name: "augment", input_type: "image" },
			parameters: {
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
		},

		params: {
			config: { name: "params", input_type: "image" },
			parameters: {
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
	},
	csv: {},
	text: {},
}
