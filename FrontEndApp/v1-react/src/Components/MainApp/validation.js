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
    console.log("compo valid",components);


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
    console.log("components are and error are",components,errors);

    const validAndInvalid={
        invalidIndices : errors,
        validIndices : validIndices
    
      }
      return validAndInvalid; 


}
































// // we are assuming that batch_size is not included in the shape
// import { keras_layers } from "../../resources/keras";

// /**
//  * Validate order of layers such that dimensions of consecutive layers are not conflicting
//  * @function validate_layers
//  * @param {Object} source source object in the handleDragEnd function
//  * @param {Object} destination destination object in the handleDragEnd function
//  * @param {List} components List of json objects representing the model layers
//  * @returns {Array of objects} [] if no errors, [ {indices: [int,int], error: 'error message'}, {..}, .. ] if error
//  */
// export const validate_layers = (source, destination, components) => {

  
//   //variables
//   let errors = [];
//   //array having indices of layers which can be added next
//   let validIndices=[];

//   console.log("In layer validation components",components);

//   const suggestLayers = (curr_layer) =>{

//     let i=0;
//     const indices=[];
//     for(const layer in keras_layers)
//     { 
//       if( keras_layers[curr_layer].dimensions.returned_dim === keras_layers[layer].dimensions.expected_dim
//          || keras_layers[layer].dimensions.expected_dim==="all")
//       {
//         // console.log("layers",layer);
//         indices.push(i);
//       }
//       i++;
//     }

//     return indices;

//   }

//   if(source ===undefined && destination===undefined)
//   {
//     console.log("in undefined blocck components are",components);
//     if(components.length>0)
//     {
//       const curr_layer=components[components.length-1].name;
//       validIndices=suggestLayers(curr_layer);
//     }
//     else {
//       validIndices=[0,1,2,3,4,5,6,7,8,9];
//     }

//     const validAndInvalid={
//       invalidIndices : errors,
//       validIndices : validIndices
  
//     }
//     return validAndInvalid; 
//   }

//   const src_dic = source.droppableId;
//   const des_dic = destination.droppableId;
//   const des_idx = destination.index;
//   const src_idx = source.index;

  

  

//   console.log("Source deop and destination drop",src_dic,des_dic);
//   console.log("In layer validation des_idx",des_idx);
//   // // adding new layers
//   var obj;
//   console.log("destination index is",des_idx);
//   if (src_dic === "source") {
    
//     const curr_layer = components[des_idx].name;
//     if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
//     } else {
//       //checks if more than one layer present 
//       //and then checks the layer above 
//       if (des_idx !== 0) {
//         const above_layer = components[des_idx - 1].name;
//         if (
//           keras_layers[curr_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[above_layer].dimensions.returned_dim !==
//           keras_layers[curr_layer].dimensions.expected_dim
//         ) {
//           obj = {
//             indices: [des_idx - 1, des_idx],
//             error_description:
//               "Wrong layer placement (current layer and the layer above)",
//             error: "Wrong layer placement.",
//           };
//           console.log("checks the layer above ")
//           errors.push(obj);
//         }
//       }
//       //checks the below layer  
//       if (des_idx !== components.length - 1) {
//         const below_layer = components[des_idx + 1].name;
//         if (
//           keras_layers[below_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[curr_layer].dimensions.returned_dim !==
//             keras_layers[below_layer].dimensions.expected_dim
//         ) {
//           obj = {
//             indices: [des_idx, des_idx + 1],
//             error_description:
//               "Wrong layer placement (current layer and the layer below)",
//             error: "Wrong layer placement.",
//           };
//           console.log("checks the layer below ")
//           errors.push(obj);
//         }
//       }
//     }
//   }
//   //deleting layers
//   else if (des_dic === "delete") {
   
//     const curr_layer = components[src_idx].name;
//     console.log("delete curr layer ",curr_layer,src_idx);
//     if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
//     }
//     //its true only if last layer isnt deleted  
//     else if (src_idx !== components.length - 1) {
//       console.log("true only if last layer isnt deleted  ");
//       const below_layer = components[src_idx + 1].name;
//       if (src_idx !== 0) {
//         var above_layer = components[src_idx - 1].name;
//         if (
//           keras_layers[below_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[above_layer].dimensions.returned_dim !==
//             keras_layers[below_layer].dimensions.expected_dim
//         ) {
//           obj = {
//             indices: [src_idx - 1, src_idx],
//             error_description: "Wrong layer placement (delete)",
//             error: "Wrong layer placement.",
//           };
         
//           errors.push(obj);
//         }
//       }
//     }
//   }
//   //for moving layers up and down (target to target)
//   else if (src_dic === "target" && des_dic !== "delete") {
//     console.log("oving layers up and down (target to")
//     const curr_layer = components[des_idx].name;
//     //for dropout layer
//     if (keras_layers[curr_layer].dimensions.returned_dim === "same") {
//     } else {
//       //for src layer
//       if (des_idx !== 0) {
//         const above_layer = components[des_idx - 1].name;
//         if (
//           keras_layers[above_layer].dimensions.returned_dim !== "same" &&
//           keras_layers[curr_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[above_layer].dimensions.returned_dim !==
//             keras_layers[curr_layer].dimensions.expected_dim
//         ) {
//           obj = {
//             indices: [des_idx - 1, des_idx],
//             error_description:
//               "Wrong layer placement (current layer and the layer above)",
//             error: "Wrong layer placement.",
//           };
//           errors.push(obj);
//         }
//       }
//       if (des_idx !== components.length - 1) {
//         const below_layer = components[des_idx + 1].name;
//         if (
//           keras_layers[below_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[curr_layer].dimensions.returned_dim !==
//             keras_layers[below_layer].dimensions.expected_dim
//         ) {
//           obj = {
//             indices: [des_idx, des_idx + 1],
//             error_description:
//               "Wrong layer placement (current layer and the layer above)",
//             error: "Wrong layer placement.",
//           };
//           errors.push(obj);
//         }
//       }
//       //for non src layer
//       if (src_idx !== 0 && src_idx !== components.length - 1) {
//         console.log("for non src layer")
//         const above_layer = components[src_idx - 1].name;
//         const below_layer = components[src_idx].name;
//         if (
//           keras_layers[below_layer].dimensions.expected_dim !== "all" &&
//           keras_layers[above_layer].dimensions.returned_dim !==
//             keras_layers[below_layer].dimensions.expected_dim
//         ) {
//           if (des_idx > src_idx) {
//             obj = {
//               indices: [src_idx - 1, src_idx],
//               error_description:
//                 "Wrong layer placement (current layer moves up to down)",
//               error: "Wrong layer placement.",
//             };
//           } else {
            
//             obj = {
//               indices: [src_idx, src_idx + 1],
//               error_description:
//                 "Wrong layer placement (current layer moves down to up)",
//               error: "Wrong layer placement.",
//             };
//           }
//           console.log("last else")
//           errors.push(obj);
//         }
//       }
//     }
//   }

  



//   //deleting the last present layer in components array
//   if(src_dic==="target" && des_dic==="delete")
//   {
//     console.log("deleting last layer so all layers are valid");
//     if(components.length===1)
//     {
//       //if no layer present all  layers are valid 
//       validIndices=[0,1,2,3,4,5,6,7,8,9];
//     }
//     else{
//       let len=components.length;
//       const curr_layer=components[len-1].name;
//       console.log("layer after deleting is ",curr_layer);
//       validIndices=suggestLayers(curr_layer);

//     }

//   }

//   // //Layers which are correct to be added after last layer
//   if(src_dic==="source" && des_dic==="target")
//   {
//     console.log("can suggest layers")
//     const curr_layer=components[components.length-1].name;
//     validIndices=suggestLayers(curr_layer);
    
//     // console.log("validIndices are",validIndices);
//   }

//   if(src_dic==="target" && des_dic==="target")
//   {
//     const curr_layer=components[components.length-1].name;
//     validIndices=suggestLayers(curr_layer);


//   }



//   const validAndInvalid={
//     invalidIndices : errors,
//     validIndices : validIndices

//   }
//   console.log(validAndInvalid);

//   return validAndInvalid;
// };
