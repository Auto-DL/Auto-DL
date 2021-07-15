// we are assuming that batch_size is not included in the shape
import { keras_layers } from "../../resources/keras";

/**
 * Validate order of layers such that dimensions of consecutive layers are not conflicting
 * @function validate_layers
 * @param {Object} source source object in the handleDragEnd function
 * @param {Object} destination destination object in the handleDragEnd function
 * @param {List} components List of json objects representing the model layers
 * @returns {Array of objects} [] if no errors, [ {indices: [int,int], error: 'error message'}, {..}, .. ] if error
 */
export const validate_layers = (source, destination, components) => {
  //variables
  var errors = [];

  const src_dic = source.droppableId;
  const des_dic = destination.droppableId;
  const des_idx = destination.index;
  const src_idx = source.index;
  // adding new layers
  var obj;
  if (src_dic === "source") {
    const curr_layer = components[des_idx].name;
    if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
    } else {
      if (des_idx !== 0) {
        const above_layer = components[des_idx - 1].name;
        if (
          keras_layers[curr_layer].dimensions.expected_dim !== "all" &&
          keras_layers[above_layer].dimensions.returned_dim !==
            keras_layers[curr_layer].dimensions.expected_dim
        ) {
          obj = {
            indices: [des_idx - 1, des_idx],
            error_description:
              "Wrong layer placement (current layer and the layer above)",
            error: "Wrong layer placement.",
          };
          errors.push(obj);
        }
      }
      if (des_idx !== components.length - 1) {
        const below_layer = components[des_idx + 1].name;
        if (
          keras_layers[below_layer].dimensions.expected_dim !== "all" &&
          keras_layers[curr_layer].dimensions.returned_dim !==
            keras_layers[below_layer].dimensions.expected_dim
        ) {
          obj = {
            indices: [des_idx, des_idx + 1],
            error_description:
              "Wrong layer placement (current layer and the layer below)",
            error: "Wrong layer placement.",
          };
          errors.push(obj);
        }
      }
    }
  }
  //deleting layers
  else if (des_dic === "delete") {
    const curr_layer = components[src_idx].name;
    if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
    } else if (src_idx !== components.length - 1) {
      const below_layer = components[src_idx + 1].name;
      if (src_idx !== 0) {
        var above_layer = components[src_idx - 1].name;
        if (
          keras_layers[below_layer].dimensions.expected_dim !== "all" &&
          keras_layers[above_layer].dimensions.returned_dim !==
            keras_layers[below_layer].dimensions.expected_dim
        ) {
          obj = {
            indices: [src_idx - 1, src_idx],
            error_description: "Wrong layer placement (delete)",
            error: "Wrong layer placement.",
          };
          errors.push(obj);
        }
      }
    }
  }
  //for moving layers up and down (target to target)
  else if (src_dic === "target" && des_dic !== "delete") {
    const curr_layer = components[des_idx].name;
    //for dropout layer
    if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
    } else {
      //for src layer
      if (des_idx !== 0) {
        const above_layer = components[des_idx - 1].name;
        if (
          keras_layers[above_layer].dimensions.returned_dim !== "same" &&
          keras_layers[curr_layer].dimensions.expected_dim !== "all" &&
          keras_layers[above_layer].dimensions.returned_dim !==
            keras_layers[curr_layer].dimensions.expected_dim
        ) {
          obj = {
            indices: [des_idx - 1, des_idx],
            error_description:
              "Wrong layer placement (current layer and the layer above)",
            error: "Wrong layer placement.",
          };
          errors.push(obj);
        }
      }
      if (des_idx !== components.length - 1) {
        const below_layer = components[des_idx + 1].name;
        if (
          keras_layers[below_layer].dimensions.expected_dim !== "all" &&
          keras_layers[curr_layer].dimensions.returned_dim !==
            keras_layers[below_layer].dimensions.expected_dim
        ) {
          obj = {
            indices: [des_idx, des_idx + 1],
            error_description:
              "Wrong layer placement (current layer and the layer above)",
            error: "Wrong layer placement.",
          };
          errors.push(obj);
        }
      }
      //for non src layer
      if (src_idx !== 0 && src_idx !== components.length - 1) {
        const above_layer = components[src_idx - 1].name;
        const below_layer = components[src_idx].name;
        if (
          keras_layers[below_layer].dimensions.expected_dim !== "all" &&
          keras_layers[above_layer].dimensions.returned_dim !==
            keras_layers[below_layer].dimensions.expected_dim
        ) {
          if (des_idx > src_idx) {
            obj = {
              indices: [src_idx - 1, src_idx],
              error_description:
                "Wrong layer placement (current layer moves up to down)",
              error: "Wrong layer placement.",
            };
          } else {
            obj = {
              indices: [src_idx, src_idx + 1],
              error_description:
                "Wrong layer placement (current layer moves down to up)",
              error: "Wrong layer placement.",
            };
          }
          errors.push(obj);
        }
      }
    }
  }
  return errors;
};
