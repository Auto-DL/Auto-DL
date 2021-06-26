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

export const validate_layers = (source, destination, components) => {
  const temp = 2;
  const src_dic = source.droppableId;
  const des_dic = destination.droppableId;
  const des_idx = destination.index;
  const src_idx = source.index;
  if (src_dic === "source") {
    const curr_layer = components[des_idx].name;
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
    if (src_idx !== components.length - 1) {
      const below_layer = components[src_idx + 1].name;
      if (src_idx !== 0) {
        var above_layer = components[src_idx - 1].name;
        var i = 0;
        while (layer_dims[above_layer].returned_dim === "same") {
          i++;
          if (src_idx - 1 - i !== 0) {
            above_layer = components[src_idx - 1 - i].name;
          } else {
            return 0;
          }
        }

        if (
          layer_dims[below_layer].expected_dim !== "all" &&
          layer_dims[above_layer].returned_dim !==
            layer_dims[below_layer].expected_dim
        ) {
          console.log("err by delete");
          return 1;
        }
      } else {
        return 0;
      }
    } else {
      return 0;
    }
    return 0;
  }
  if (src_dic === "target" && des_dic !== "delete") {
    const curr_layer = components[des_idx].name;
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

    if (
      src_idx !== 0 &&
      src_idx !== components.length - 1 &&
      des_idx !== components.length
    ) {
      var above_layer = components[src_idx].name;
      const above_above_layer = components[src_idx - 1].name;
      const below_layer = components[des_idx + 1].name;
      const below_layer_expected_dim = layer_dims[below_layer].expected_dim;
      console.log(below_layer);
      console.log(above_layer);
      var above_layer_return_dim = layer_dims[above_layer].returned_dim;
      var above_layer_expect_dim = layer_dims[above_layer].expected_dim;
      i = 0;
      while (layer_dims[above_layer].returned_dim === "same") {
        i++;
        var new_idx = src_idx - i;
        if (new_idx < 0) {
          above_layer_return_dim = temp;
          above_layer_expect_dim = temp;
          break;
        }
        above_layer = components[new_idx];
        above_layer_return_dim = layer_dims[above_layer].returned_dim;
        above_layer_expect_dim = layer_dims[above_layer].excepted_dim;
      }
      if (
        below_layer_expected_dim !== "all" &&
        above_layer_return_dim !== below_layer_expected_dim
      ) {
        return 1;
      }
      if (
        layer_dims[above_above_layer].returned_dim !== "all" &&
        layer_dims[above_above_layer].returned_dim !== above_layer_expect_dim
      ) {
        return 1;
      }
    }
    return 0;
  }
};
