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
  let errors = [];
  //array having indices of layers which can be added next
  let validIndices=[];

  

  const src_dic = source.droppableId;
  const des_dic = destination.droppableId;
  const des_idx = destination.index;
  const src_idx = source.index;
  // adding new layers
  var obj;
  console.log("destination index is",des_idx);
  if (src_dic === "source") {
    
    const curr_layer = components[des_idx].name;
    if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
    } else {
      //checks if more than one layer present 
      //and then checks the layer above 
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
          console.log("checks the layer above ")
          errors.push(obj);
        }
      }
      //checks the below layer  
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
          console.log("checks the layer below ")
          errors.push(obj);
        }
      }
    }
  }
  //deleting layers
  else if (des_dic === "delete") {
   
    const curr_layer = components[src_idx].name;
    console.log("delete curr layer ",curr_layer,src_idx);
    if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
    }
    //its true only if last layer isnt deleted  
    else if (src_idx !== components.length - 1) {
      console.log("true only if last layer isnt deleted  ");
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
    console.log("oving layers up and down (target to")
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
        console.log("for non src layer")
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
          console.log("last else")
          errors.push(obj);
        }
      }
    }
  }

  //Layers which are correct to be added after last layer
  if(des_idx === components.length-1 && errors.length===0 && components.length>0)
  {
    console.log("can suggest layers")
    const curr_layer=components[des_idx].name;
    let i=0;

    for(const layer in keras_layers)
    {
      
      
      if( keras_layers[curr_layer].dimensions.returned_dim === keras_layers[layer].dimensions.expected_dim
         || keras_layers[layer].dimensions.expected_dim==="all")
      {
        // console.log("layers",layer);
        validIndices.push(i);
      }
      i++;
    }
    // console.log("validIndices are",validIndices);


  }

  const validAndInvalid={
    invalidIndices : errors,
    validIndices : validIndices

  }
  console.log(validAndInvalid);

  return validAndInvalid;
};
