export const keras_hyperparams = {
	params: {
		config: { name: "params", input_type: "all" },

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
}
