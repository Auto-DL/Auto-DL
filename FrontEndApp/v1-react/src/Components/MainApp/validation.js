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
};
/**
 * Validate order of layers such that dimensions of consecutive layers are same
 * @function validate_layers
 * @param {Object} source source object in the handleDragEnd function
 * @param {Object} destination destination object in the handleDragEnd function
 * @param {List} components List of json objects representing the model layers
 * @returns {int} 0 if errors, 1 if no errors
 */
export const validate_layers = (source, destination, components) => {
  const temp = 2;
  const src_dic = source.droppableId;
  const des_dic = destination.droppableId;
  const des_idx = destination.index;
  const src_idx = source.index;
  if (src_dic === "source") {
    const curr_layer = components[des_idx].name;
    if (layer_dims[curr_layer].returned_dim === "same") {
      return 0;
    }
    if (des_idx !== 0) {
      const above_layer = components[des_idx - 1].name;
      if (
        layer_dims[curr_layer].expected_dim !== "all" &&
        layer_dims[above_layer].returned_dim !==
          layer_dims[curr_layer].expected_dim
      ) {
        return 1;
      }
    }
    if (des_idx !== components.length - 1) {
      const below_layer = components[des_idx + 1].name;
      if (
        layer_dims[below_layer].expected_dim !== "all" &&
        layer_dims[curr_layer].returned_dim !==
          layer_dims[below_layer].expected_dim
      ) {
        return 1;
      }
    }
    return 0;
  } else if (des_dic === "delete") {
    const curr_layer = components[src_idx].name;
    if (layer_dims[curr_layer].returned_dim === "same") {
      return 0;
    }
    if (src_idx !== components.length - 1) {
      const below_layer = components[src_idx + 1].name;
      if (src_idx !== 0) {
        var above_layer = components[src_idx - 1].name;
        // var i = 0;
        // while (layer_dims[above_layer].returned_dim === "same") {
        //   i++;
        //   if (src_idx - 1 - i !== 0) {
        //     above_layer = components[src_idx - 1 - i].name;
        //   }
        //   return 0;
        // }
        if (
          layer_dims[below_layer].expected_dim !== "all" &&
          layer_dims[above_layer].returned_dim !==
            layer_dims[below_layer].expected_dim
        ) {
          console.log("err by delete");
          return 1;
        }
      }
      return 0;
    }
    return 0;
  }
  if (src_dic === "target" && des_dic !== "delete") {
    const curr_layer = components[des_idx].name;
    //for src layer
    if (des_idx !== 0) {
      const above_layer = components[des_idx - 1].name;
      if (
        layer_dims[curr_layer].expected_dim !== "all" &&
        layer_dims[above_layer].returned_dim !==
          layer_dims[curr_layer].expected_dim
      ) {
        return 1;
      }
    }
    if (des_idx !== components.length - 1) {
      const below_layer = components[des_idx + 1].name;
      if (
        layer_dims[below_layer].expected_dim !== "all" &&
        layer_dims[curr_layer].returned_dim !==
          layer_dims[below_layer].expected_dim
      ) {
        return 1;
      }
    }
    //for non src layer
    if (src_idx !== 0 && src_idx !== components.length - 1) {
      const above_layer = components[src_idx - 1].name;
      const below_layer = components[src_idx].name;
      if (
        layer_dims[below_layer].expected_dim !== "all" &&
        layer_dims[above_layer].returned_dim !==
          layer_dims[below_layer].expected_dim
      ) {
        return 1;
      }
      return 0;
    }
    return 0;
    // const curr_layer = components[des_idx].name;
    // if (layer_dims[curr_layer].returned_dim === "same") {
    //   return 0;
    // }
    // if (des_idx !== 0) {
    //   const above_layer = components[des_idx - 1].name;
    //   if (
    //     layer_dims[curr_layer].expected_dim !== "all" &&
    //     layer_dims[above_layer].returned_dim !==
    //       layer_dims[curr_layer].expected_dim
    //   ) {
    //     console.log("err src layer non 0");
    //     return 1;
    //   }
    // }
    // if (des_idx !== components.length - 1) {
    //   const below_layer = components[des_idx + 1].name;
    //   if (
    //     layer_dims[below_layer].expected_dim !== "all" &&
    //     layer_dims[curr_layer].returned_dim !==
    //       layer_dims[below_layer].expected_dim
    //   ) {
    //     console.log("err src layer non -1");
    //     return 1;
    //   }
    // }
    // if (
    //   src_idx !== 0 &&
    //   src_idx !== components.length - 1 &&
    //   des_idx !== components.length - 1
    // ) {
    //   var above_layer = components[src_idx].name;
    //   var above_above_layer = components[src_idx - 1].name;
    //   const below_layer = components[des_idx + 1].name;
    //   const below_layer_expected_dim = layer_dims[below_layer].expected_dim;
    //   var above_layer_return_dim = layer_dims[above_layer].returned_dim;
    //   var above_layer_expect_dim = layer_dims[above_layer].expected_dim;
    //   var above_above_return_dim = layer_dims[above_above_layer].returned_dim;
    //   console.log(below_layer);
    //   console.log(above_layer);
    //   // i = 0;
    //   // while (layer_dims[above_layer].returned_dim === "same") {
    //   //   i++;
    //   //   var new_idx = src_idx - i;
    //   //   if (new_idx < 0) {
    //   //     above_layer_return_dim = temp;
    //   //     above_layer_expect_dim = temp;
    //   //     above_above_return_dim = temp;
    //   //     break;
    //   //   }
    //   //   above_layer = components[new_idx];
    //   //   above_layer_return_dim = layer_dims[above_layer].returned_dim;
    //   //   above_layer_expect_dim = layer_dims[above_layer].expected_dim;
    //   //   if (new_idx - 1 > 0) {
    //   //     above_above_return_dim = layer_dims[above_above_layer].returned_dim;
    //   //   }
    //   // }
    //   if (
    //     below_layer_expected_dim !== "all" &&
    //     above_layer_return_dim !== below_layer_expected_dim
    //   ) {
    //     console.log("err below and above check");
    //     return 1;
    //   }
    //   if (
    //     above_layer_expect_dim !== "all" &&
    //     above_above_return_dim !== above_layer_expect_dim
    //   ) {
    //     console.log("err above above and curr");
    //     return 1;
    //   }
    // }
    // if (components.length > 1 && des_idx === components.length - 1) {
    //   var above_layer = components[des_idx - 1].name;
    //   var above_layer_return_dim = layer_dims[above_layer].returned_dim;
    //   // while (layer_dims[above_layer].returned_dim === "same") {
    //   //   i++;
    //   //   var new_idx = src_idx - i;
    //   //   if (new_idx < 0) {
    //   //     above_layer_return_dim = temp;
    //   //     break;
    //   //   }
    //   //   above_layer = components[new_idx];
    //   //   above_layer_return_dim = layer_dims[above_layer].returned_dim;
    //   // }
    //   if (
    //     layer_dims[curr_layer].expected_dim !== "all" &&
    //     above_layer_return_dim !== layer_dims[curr_layer].expected_dim
    //   ) {
    //     console.log("err if moved to last idx");
    //     return 1;
    //   }
    // }
    // return 0;
  }
};
