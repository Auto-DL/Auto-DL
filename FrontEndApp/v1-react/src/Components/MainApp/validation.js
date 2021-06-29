// Function is called at line 2522 in Step2.js
// we are assuming that batch_size is not included in the shape
var layer_dims = {
	Conv2D: {
		expected_dim: 3,
		returned_dim: 3,
	},

	Dense: {
		expected_dim: 1,
		returned_dim: 1,
	},

	LSTM: {
		expected_dim: 2,
		returned_dim: 2,
	},

	SimpleRNN: {
		expected_dim: 1,
		returned_dim: 1,
	},

	Dropout: {
		expected_dim: "all",
		returned_dim: "same",
	},

	Flatten: {
		expected_dim: "all",
		returned_dim: 1,
	},

	AveragePooling2D: {
		expected_dim: 3,
		returned_dim: 3,
	},

	MaxPooling2D: {
		expected_dim: 3,
		returned_dim: 3,
	},
}
/**
 * Validate order of layers such that dimensions of consecutive layers are same
 * @function validate_layers
 * @param {Object} source source object in the handleDragEnd function
 * @param {Object} destination destination object in the handleDragEnd function
 * @param {List} components List of json objects representing the model layers
 * @returns {Array of objects} 1 if errors, 0 if no errors
 */
export const validate_layers = (source, destination, components) => {
	//variables
	var errors = []

	const src_dic = source.droppableId
	const des_dic = destination.droppableId
	const des_idx = destination.index
	const src_idx = source.index
	// adding new layers
	if (src_dic === "source") {
		const curr_layer = components[des_idx].name
		if (layer_dims[curr_layer].returned_dim === "same") {
			console.log(errors)
		}
		if (des_idx !== 0) {
			const above_layer = components[des_idx - 1].name
			if (
				layer_dims[curr_layer].expected_dim !== "all" &&
				layer_dims[above_layer].returned_dim !== layer_dims[curr_layer].expected_dim
			) {
				var obj = {
					indices: [des_idx - 1, des_idx],
					error: "Wrong layer placement",
				}
				errors.push(obj)
				console.log(errors)
			}
		}
		if (des_idx !== components.length - 1) {
			const below_layer = components[des_idx + 1].name
			if (
				layer_dims[below_layer].expected_dim !== "all" &&
				layer_dims[curr_layer].returned_dim !== layer_dims[below_layer].expected_dim
			) {
				var obj = {
					indices: [des_idx, des_idx + 1],
					error: "Wrong layer placement",
				}
				errors.push(obj)
				console.log(errors)
			}
		}
		console.log(errors)
	}
	//deleting layers
	else if (des_dic === "delete") {
		const curr_layer = components[src_idx].name
		if (layer_dims[curr_layer].returned_dim === "same") {
			return 0
		}
		if (src_idx !== components.length - 1) {
			const below_layer = components[src_idx + 1].name
			if (src_idx !== 0) {
				var above_layer = components[src_idx - 1].name
				if (
					layer_dims[below_layer].expected_dim !== "all" &&
					layer_dims[above_layer].returned_dim !==
						layer_dims[below_layer].expected_dim
				) {
					console.log("err by delete")
					var obj = {
						indices: [src_idx - 1, src_idx],
						error: "Wrong layer placement",
					}
					errors.push(obj)
					console.log(errors)
				}
			}
		}
	}
	//for moving layers up and down (target to target)
	if (src_dic === "target" && des_dic !== "delete") {
		const curr_layer = components[des_idx].name
		//for dropout layer
		if (layer_dims[curr_layer].returned_dim === "same") {
			console.log(errors)
		}
		//for src layer
		if (des_idx !== 0) {
			const above_layer = components[des_idx - 1].name
			if (
				layer_dims[above_layer].returned_dim !== "same" &&
				layer_dims[curr_layer].expected_dim !== "all" &&
				layer_dims[above_layer].returned_dim !== layer_dims[curr_layer].expected_dim
			) {
				var obj = {
					indices: [des_idx - 1, des_idx],
					error: "Wrong layer placement",
				}
				errors.push(obj)
				console.log(errors)
			}
		}
		if (des_idx !== components.length - 1) {
			const below_layer = components[des_idx + 1].name
			if (
				layer_dims[below_layer].expected_dim !== "all" &&
				layer_dims[curr_layer].returned_dim !== layer_dims[below_layer].expected_dim
			) {
				var obj = {
					indices: [des_idx, des_idx + 1],
					error: "Wrong layer placement using des",
				}
				errors.push(obj)
			}
		}
		//for non src layer
		if (src_idx !== 0 && src_idx !== components.length - 1) {
			const above_layer = components[src_idx - 1].name
			const below_layer = components[src_idx].name
			if (
				layer_dims[below_layer].expected_dim !== "all" &&
				layer_dims[above_layer].returned_dim !==
					layer_dims[below_layer].expected_dim
			) {
				if (des_idx > src_idx) {
					var obj = {
						indices: [src_idx - 1, src_idx],
						error: "Wrong layer placement",
					}
				} else {
					var obj = {
						indices: [src_idx, src_idx + 1],
						error: "Wrong layer placement",
					}
				}
				errors.push(obj)
				console.log(errors)
			}
		}
	}
	return errors
}
