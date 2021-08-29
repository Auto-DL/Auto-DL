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
export const validate_layers = ( components) => {
    let errors=new Set();
    let validIndices=[];


    const suggestLayers = (curr_layer) =>{

        let i=0;
        const indices=[];
        for(const layer in keras_layers)
        { 
          if( keras_layers[curr_layer].dimensions.returned_dim === keras_layers[layer].dimensions.expected_dim
             || keras_layers[layer].dimensions.expected_dim==="all")
          {
            // console.log("layers",layer);
            indices.push(i);
          }
          i++;
        }
    
        return indices;
    
      }

    if(components.length>0)
    {
      const curr_layer=components[components.length-1].name;
      validIndices=suggestLayers(curr_layer);
    }
    else {
      validIndices=[0,1,2,3,4,5,6,7,8,9];
    }



    if(components.length !==1)
    {
        
        for(let i=1;i<components.length;i++)
        {
            if(keras_layers[components[i]["name"]].dimensions.expected_dim !== "all" &&
            keras_layers[components[i-1]["name"]].dimensions.returned_dim !==
            keras_layers[components[i]["name"]].dimensions.expected_dim)
            {
                errors.add(i);
            }
                        
        }
    }

    const validAndInvalid={
        invalidIndices : errors,
        validIndices : validIndices
    
      }
      return validAndInvalid; 


}
































