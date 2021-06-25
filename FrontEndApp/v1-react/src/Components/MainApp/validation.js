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
    expected_dim: 2,
    returned_dim: 2,
  },

  MaxPooling2D: {
    expected_dim: 2,
    returned_dim: 2,
  },
};

export const validate_layers = (source, destination, components) => {
  const src_dic = source.droppableId;
  const des_dic = destination.droppableId;
  const des_idx = destination.index;
  const src_idx = source.index;
  if (src_dic === "source") {
    if (des_idx !== 0) {
      const above_layer = components[des_idx - 1];
      console.log(above_layer.name);
    }
  }
};

// {droppableId: "target", index: 4}
