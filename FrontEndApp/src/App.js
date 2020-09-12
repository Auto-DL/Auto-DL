import React, { Component } from 'react';
import Source from './Source';
import Target from './Target';
import Collect_param from './Collect_param';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
// import './App.css';
import classes from './App.module.css';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

// import classes from '*.module.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      components: [],
      final_data_array:{},  
      selected_layer:-1,
      selected_layer_name:'',
      selected_layer_type:{},
      data:{
        "Conv2D": {
          "filters": {
            "Example": 32,
            "Default": "NA",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "the dimensionality of the output space [i.e.the number of output filters in the convolution]"
          },
      
          "data_format": {
            "Example": "channels_last",
            "Default": "channels_last",
            "Required": 0,
            "DataType": "select",
            "Options": ["channels_last", "channels_first"],
            "Description": "A string, one of channels_last [default] or channels_first."
          },
      
          "kernel_size": {
            "Example": [2, 2],
            "Default": "NA",
            "Required": 1,
            "DataType": "Tuple",
            "Options": [],
            "Description": "Specifies the height and width of the 2D convolution window"
      
          },
          "strides": {
            "Example": [1, 1],
            "Default": "[1, 1]",
            "Required": 0,
            "DataType": "Tuple",
            "Options": [],
            "Description": "Specifies the strides of the convolution along the height and width."
          },
      
          "padding": {
            "Example": "valid",
            "Default": "valid",
            "Required": 0,
            "DataType": "select",
            "Options": ["valid", "same"],
            "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
          },
      
          "kernel_initializer": {
            "Example": "glorot_uniform",
            "Default": "glorot_uniform",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the kernel weights matrix"
          },
          "bias_initializer": {
            "Example ": "zeros",
            "Default": "zeros",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the bias vector"
      
          }
      
      
      
      
      
        },
      
        "Dense": {
          "units": {
            "Example": 32,
            "Default": "NA",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Positive integer, dimensionality of the output space."
          },
      
          "use_bias": {
            "Example": "True",
            "Default": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Boolean, whether the layer uses a bias vector."
          },
          "activation": {
            "Example": "relu",
            "Default": "NA",
            "Required": 1,
            "DataType": "select",
            "Options": ["relu", "sigmoid", "softmax", "softplus", "softsign", "tanh", "selu", "elu"],
            "Description": "Activation function, if required"
          },
      
          "kernel_initializer": {
            "Example": "glorot_uniform",
            "Default": "glorot_uniform",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the kernel weights matrix"
          },
      
          "bias_initializer": {
            "Example": "zeros",
            "Default": "zeros",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the bias vector"
          }
      
        },
      
      
        "LSTM": {
          "units": {
            "Example": 32,
            "Default": "NA",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Positive integer, dimensionality of the output space."
          },
      
          "activation": {
            "Example": "tanh",
            "Default": "tanh",
            "Required": 1,
            "Datatype": "select",
            "Options": ["relu", "sigmoid", "softmax", "softplus", "softsign", "tanh", "selu", "None", "elu"],
            "Description": "Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]"
          },
      
          "recurrent_activation": {
            "Example": "sigmoid",
            "Default": "sigmoid",
            "Required": 1,
            "Datatype": "select",
            "Options": ["relu", "sigmoid", "softmax", "softplus", "softsign", "tanh", "selu", "None", "elu"],
            "Description": "Activation function to use for the recurrent step. Default: sigmoid [sigmoid]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]."
          },
      
          "kernel_initializer": {
            "Example": "glorot_uniform",
            "Default": "glorot_uniform",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the kernel weights matrix"
          },
      
          "bias_initializer": {
            "Example ": "zeros ",
            "Default": "zeros",
            "Required": 0,
            "DataType": "select",
            "Options": ["random_normal", "random_uniform", "truncated_normal", "truncated_uniform", "zeros", "ones", "glorot_normal", "glorot_uniform", "identity"],
            "Description": "Initializer for the bias vector"
      
          },
      
          "dropout": {
            "Default": 0,
            "Example": 0.4,
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0."
          },
      
          "return_sequences": {
            "Default": "False",
            "Example": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Boolean. Whether to return the last output. in the output sequence, or the full sequence. Default: False"
          },
      
          "return_state": {
            "Default": "False",
            "Example": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Boolean. Whether to return the last state in addition to the output. Default: False."
          }
      
        },
      
      
      
        "BaseRNN": {
          "cell": {
            "Default": "NA",
            "Example": "cell",
            "Required": 1,
            "DataType": "text",
            "Options": [],
            "Description": "An RNN cell instance"
          }
      
        },
      
        "SimpleRNN": {
          "units": {
            "Example": 32,
            "Default": "NA",
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Positive integer, dimensionality of the output space."
          },
      
          "activation": {
            "Example": "tanh",
            "Default": "tanh",
            "Required": 1,
            "Datatype": "select",
            "Options": ["relu", "sigmoid", "softmax", "softplus", "softsign", "tanh", "selu", "None", "elu"],
            "Description": "Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]"
          },
      
          "use_bias": {
            "Example": "True",
            "Default": "True",
            "Required": 0,
            "DataType": "select",
            "Options": ["True", "False"],
            "Description": "Boolean, whether the layer uses a bias vector."
          },
          "dropout": {
            "Default": 0,
            "Example": 0.4,
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0."
          }
        },
      
        "Dropout": {
      
          "rate": {
            "Default": "NA",
            "Example": 0.4,
            "Required": 1,
            "DataType": "number",
            "Options": [],
            "Description": "Float between 0 and 1. Fraction of the input units to drop."
          },
      
          "noise_shape": {
            "Default": "None",
            "Example": "[batch_size, 1, features]",
            "Required": 0,
            "DataType": "tuple",
            "Options": [],
            "Description": "1D integer tensor representing the shape of the binary dropout mask that will be multiplied with the input. For instance, if your inputs have shape [batch_size, timesteps, features] and you want the dropout mask to be the same for all timesteps, you can use noise_shape=[batch_size, 1, features]"
          },
      
          "seed": {
            "Default": "NA",
            "Example": 42,
            "Required": 0,
            "DataType": "number",
            "Options": [],
            "Description": "A Python integer to use as random seed"
          }
        },
      
        "Flatten": {
      
          "data_format": {
            "Example": "channels_last",
            "Default": "channels_last",
            "Required": 0,
            "DataType": "select",
            "Options": ["channels_last", "channels_first"],
            "Description": "A string, one of channels_last [default] or channels_first."
          }
        },
      
      
        "ZeroPadding2D": {
      
          "padding": {
            "Example": [
              [1, 1],
              [2, 2]
            ],
            "Default": "NA",
            "Required": 1,
            "DataType": "tuple",
            "Options": [],
            "Description": "The tuple interpreted as [[top_pad, bottom_pad], [left_pad, right_pad]]"
          },
      
          "data_format": {
            "Example": "channels_last",
            "Default": "channels_last",
            "Required": 0,
            "DataType": "select",
            "Options": ["channels_last", "channels_first"],
            "Description": "A string, one of channels_last [default] or channels_first."
          }
      
        },
      
        "AveragePooling2D": {
      
          "pool_size": {
            "Example": [2, 2],
            "Default": "NA",
            "Required": 1,
            "DataType": "tuple",
            "Options": [],
            "Description": "integer or tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimension. If only one integer is specified, the same window length will be used for both dimensions"
      
          },
      
          "strides": {
            "Example": [2, 2],
            "Default": "NA",
            "Required": 0,
            "DataType": "tuple",
            "Options": [],
            "Description": "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size."
          },
      
          "data_format": {
            "Example": "channels_last",
            "Default": "channels_last",
            "Required": 0,
            "DataType": "select",
            "Options": ["channels_last", "channels_first"],
            "Description": "A string, one of channels_last [default] or channels_first."
          },
      
          "padding": {
            "Example": "valid",
            "Default": "valid",
            "Required": 0,
            "DataType": "select",
            "Options": ["valid", "same"],
            "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
          }
        },
      
        "MaxPooling2D": {
      
          "pool_size": {
            "Example": [2, 2],
            "Default": "NA",
            "Required": 1,
            "DataType": "tuple",
            "Options": [],
            "Description": "integer or tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimensions. If only one integer is specified, the same window length will be used for both dimensions"
          },
      
      
          "strides": {
            "Example": [2, 2],
            "Default": "NA",
            "Required": 0,
            "DataType": "tuple",
            "Options": [],
            "Description": "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size."
          },
      
          "data_format": {
            "Example": "channels_last",
            "Default": "channels_last",
            "Required": 0,
            "DataType": "select",
            "Options": ["channels_last", "channels_first"],
            "Description": "A string, one of channels_last [default] or channels_first."
          },
      
          "padding": {
            "Example": "valid",
            "Default": "valid",
            "Required": 0,
            "DataType": "select",
            "Options": ["valid", "same"],
            "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
          }
        }
      
      }
    }
    this.onDrop = this.onDrop.bind(this);
    this.delete = this.delete.bind(this);
    this.showinfo = this.showinfo.bind(this);
    this.generate_code = this.generate_code.bind(this);
    this.save_value = this.save_value.bind(this);

  }

  save_value= (prop) => (event) =>{
    console.log(prop,event.target.value);
    // not working index error
    console.log(this.state.selected_layer_name);
    var param=prop;
    var name=this.state.selected_layer_name;
    console.log(this.state.data[name][param]);

    var temp=this.state.data[name][param];
    console.log(name,param,temp);
    // if( 'value' in temp)
    // {
    //   alert('hi');
    // }
    // else{
      var pervstate=this.state.data;
      pervstate[name][param]['value']=event.target.value;
      this.setState({
        data:pervstate
      });
      console.log(this.state.data[name][param]);
    // }

  }

  generate_code(){
    var list_of_components=this.state.components;
    var final_dict={}
    for (var i = 0; i < list_of_components.length; i++) {
      console.log(list_of_components[i]['component']);
      var name = list_of_components[i]['component'];
      console.log(this.state.data[name]);

      var temp_dict=this.state.data[name];
      var list_of_param=Object.keys(temp_dict);
      for (var j = 0; j < list_of_param.length; j++) {
        if(this.state.data[name][list_of_param[j]]['value']){
          console.log(name,list_of_param[j],this.state.data[name][list_of_param[j]]['value']);
          final_dict[`Layer-${i+1}-${name}-${list_of_param[j]}`]=this.state.data[name][list_of_param[j]]['value'];
        }
      }
    }
    console.log(final_dict);
  }
  showinfo(component){
    console.log(component);
    console.log(this.state.data[component]);
    var temp=this.state.data[component];
    this.setState({
      selected_layer_type:temp,
    });

    var ele=this.state.components;
    console.log(ele.lastIndexOf(component));
    var index=ele.lastIndexOf(component);
    this.setState({
      selected_layer:index,
      selected_layer_name:component,
    });

  }


  delete(component){
    console.log(component);
    console.log(component['component']);

    // console.log(this.state.components);
    var ele=this.state.components;
    // console.log(ele.lastIndexOf(component));
    var index=ele.lastIndexOf(component);
    if (index > -1) {
      ele.splice(index, 1);
    }
    // console.log(ele);
    const newComponentsList = _.concat([],ele)
    // console.log(newComponentsList);
    // this.setState({components: ele});
    this.setState({
      components: newComponentsList
    })
    // console.log(this.state.components);


    var temp1=this.state.data[component['component']];
    var temp2=this.state.selected_layer_type;
    console.log(temp1,temp2)
    if( _.isEqual(temp1,temp2)){
      this.setState({
        selected_layer_type:{},
      });
    }
    
  }
  

  onDrop(component){
    const { components } = this.state;
    console.log(component)
    const newComponentsList = _.concat([],components, component)
    this.setState({
      components: newComponentsList
    })
  }


  render() {
    const { components,data ,selected_layer_type } = this.state;
    var data_list=Object.keys(data);
    console.log('state components ', components)
    return (

      <div>

      <div className={classes.App}>


  <div className={classes.body1}>
        <Source list={data_list}/>
        </div>
  <div className={classes.body2}>
        <Target onDrop={this.onDrop} ondelete={this.delete} oninfo={this.showinfo} components={components}/>
</div>        {/* <Collect_param selected_layer_type={selected_layer_type} 
        // changed_value={this.save_value}
        /> */}

        
  <div className={classes.body3}>
      {Object.keys(this.state.selected_layer_type).length === 0 ? 
      (<h3>please select some layer first</h3>)
      :
      (
      <div className={classes.innerpad}>
                {

                Object.keys(this.state.selected_layer_type).map(
                    key=>(
                        <div className={classes.batch}>
                            <div>
                            {key} - 
                            {/* The Parameter name is <b>{key}</b> and this is a  */}
                            {   
                            this.state.selected_layer_type[key]["Required"]==1 ?
                            (<span> Required </span>)
                            :
                            (<span> Optional </span>)
                            }
                            {/* Parameter */}
                            </div>
                            <br></br>
                            {   
                            this.state.selected_layer_type[key]["Datatype"]=='select' ?
                            (<div> 
                                
                                <FormControl variant="outlined" size="small">
                                <InputLabel htmlFor="outlined-age-native-simple">{key}</InputLabel>
                                <Select
                                native
                                value={  this.state.selected_layer_type[key]["value"] ?  this.state.selected_layer_type[key]["value"] : this.state.selected_layer_type[key]["Default"]  }
                                // onChange={handleChange}
                                onChange={this.save_value(key)}
                                label={key}
                                // inputthis.state={{
                                    // name: 'age',
                                    // id: 'outlined-age-native-simple',
                                // }}
                                >
                                  {  this.state.selected_layer_type[key]["Options"].map(
                                        arr =>(
                                            <option value={arr}>{arr}</option>
                                        )
                                  )
                                  }
                               
                                </Select>
                            </FormControl>
                                
                                 </div>)
                            :
                            (<div>  
                                <TextField
                                required
                                size="small"
                                id="outlined-required"
                                label="Required"
                                defaultValue={this.state.selected_layer_type[key]["Default"]}
                                variant="outlined"
                                onChange={this.save_value(key)}
                                helperText={`Example - ${this.state.selected_layer_type[key]["Example"]}`}
                              />
                               </div>)
                            }

                            <div className={classes.desp}>
                            {this.state.selected_layer_type[key]["Description"]}
                            </div>
                            <br/>
                        </div>
                    )
                )
                }
        </div>
        )
        }
  </div>

  
  
  </div>
  <div className={classes.but}>
  <Button variant="contained" color="primary" onClick={this.generate_code}>
  Generate Code
</Button>
</div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
