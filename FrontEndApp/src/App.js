import React, {Component} from 'react';
import Source from './Source';
import Target from './Target';
import Collect_param from './Collect_param';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import classes from './App.module.css';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import PopUp from './PopUp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import classes from '*.module.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            components: [],
            final_data_array: {},
            selected_layer: -1,
            selected_layer_name: '',
            selected_layer_type: {},
            data: {
                "Conv2D": {
                    "filters": {
                        "Example": 32,
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "the dimensionality of the output space [i.e.the number of output filters in the convolution]"
                    },

                    "data_format": {
                        "Example": "channels_last",
                        "Default": "channels_last",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "channels_last", "channels_first"
                        ],
                        "Description": "A string, one of channels_last [default] or channels_first."
                    },

                    "kernel_size": {
                        "Example": [
                            2, 2
                        ],
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "Tuple",
                        "Options": [],
                        "Description": "Specifies the height and width of the 2D convolution window"

                    },
                    "strides": {
                        "Example": [
                            1, 1
                        ],
                        "Default": "[1, 1]",
                        "Required": 0,
                        "Datatype": "Tuple",
                        "Options": [],
                        "Description": "Specifies the strides of the convolution along the height and width."
                    },

                    "padding": {
                        "Example": "valid",
                        "Default": "valid",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "valid", "same"
                        ],
                        "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
                    },

                    "kernel_initializer": {
                        "Example": "glorot_uniform",
                        "Default": "glorot_uniform",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the kernel weights matrix"
                    },
                    "bias_initializer": {
                        "Example ": "zeros",
                        "Default": "zeros",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the bias vector"

                    }
                },

                "Dense": {
                    "units": {
                        "Example": 32,
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Positive integer, dimensionality of the output space."
                    },

                    "use_bias": {
                        "Example": "True",
                        "Default": "True",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "True", "False"
                        ],
                        "Description": "Boolean, whether the layer uses a bias vector."
                    },
                    "activation": {
                        "Example": "relu",
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "select",
                        "Options": [
                            "relu",
                            "sigmoid",
                            "softmax",
                            "softplus",
                            "softsign",
                            "tanh",
                            "selu",
                            "elu"
                        ],
                        "Description": "Activation function, if required"
                    },

                    "kernel_initializer": {
                        "Example": "glorot_uniform",
                        "Default": "glorot_uniform",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the kernel weights matrix"
                    },

                    "bias_initializer": {
                        "Example": "zeros",
                        "Default": "zeros",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the bias vector"
                    }

                },

                "LSTM": {
                    "units": {
                        "Example": 32,
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Positive integer, dimensionality of the output space."
                    },

                    "activation": {
                        "Example": "tanh",
                        "Default": "tanh",
                        "Required": 1,
                        "Datatype": "select",
                        "Options": [
                            "relu",
                            "sigmoid",
                            "softmax",
                            "softplus",
                            "softsign",
                            "tanh",
                            "selu",
                            "None",
                            "elu"
                        ],
                        "Description": "Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]"
                    },

                    "recurrent_activation": {
                        "Example": "sigmoid",
                        "Default": "sigmoid",
                        "Required": 1,
                        "Datatype": "select",
                        "Options": [
                            "relu",
                            "sigmoid",
                            "softmax",
                            "softplus",
                            "softsign",
                            "tanh",
                            "selu",
                            "None",
                            "elu"
                        ],
                        "Description": "Activation function to use for the recurrent step. Default: sigmoid [sigmoid]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]."
                    },

                    "kernel_initializer": {
                        "Example": "glorot_uniform",
                        "Default": "glorot_uniform",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the kernel weights matrix"
                    },

                    "bias_initializer": {
                        "Example ": "zeros ",
                        "Default": "zeros",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "random_normal",
                            "random_uniform",
                            "truncated_normal",
                            "truncated_uniform",
                            "zeros",
                            "ones",
                            "glorot_normal",
                            "glorot_uniform",
                            "identity"
                        ],
                        "Description": "Initializer for the bias vector"

                    },

                    "dropout": {
                        "Default": 0,
                        "Example": 0.4,
                        "Required": 0,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0."
                    },

                    "return_sequences": {
                        "Default": "False",
                        "Example": "True",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "True", "False"
                        ],
                        "Description": "Boolean. Whether to return the last output. in the output sequence, or the full sequence. Default: False"
                    },

                    "return_state": {
                        "Default": "False",
                        "Example": "True",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "True", "False"
                        ],
                        "Description": "Boolean. Whether to return the last state in addition to the output. Default: False."
                    }

                },

                "BaseRNN": {
                    "cell": {
                        "Default": "NA",
                        "Example": "cell",
                        "Required": 1,
                        "Datatype": "text",
                        "Options": [],
                        "Description": "An RNN cell instance"
                    }

                },

                "SimpleRNN": {
                    "units": {
                        "Example": 32,
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Positive integer, dimensionality of the output space."
                    },

                    "activation": {
                        "Example": "tanh",
                        "Default": "tanh",
                        "Required": 1,
                        "Datatype": "select",
                        "Options": [
                            "relu",
                            "sigmoid",
                            "softmax",
                            "softplus",
                            "softsign",
                            "tanh",
                            "selu",
                            "None",
                            "elu"
                        ],
                        "Description": "Activation function to use. Default: hyperbolic tangent [tanh]. If you pass None, no activation is applied [ie. \"linear \" activation: a[x] = x]"
                    },

                    "use_bias": {
                        "Example": "True",
                        "Default": "True",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "True", "False"
                        ],
                        "Description": "Boolean, whether the layer uses a bias vector."
                    },
                    "dropout": {
                        "Default": 0,
                        "Example": 0.4,
                        "Required": 0,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Float between 0 and 1. Fraction of the units to drop for the linear transformation of the inputs. Default: 0."
                    }
                },

                "Dropout": {

                    "rate": {
                        "Default": "NA",
                        "Example": 0.4,
                        "Required": 1,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "Float between 0 and 1. Fraction of the input units to drop."
                    },

                    "noise_shape": {
                        "Default": "None",
                        "Example": "[batch_size, 1, features]",
                        "Required": 0,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "1D integer tensor representing the shape of the binary dropout mask that will be multiplied with the input. For instance, if your inputs have shape [batch_size, timesteps, features] and you want the dropout mask to be the same for all timesteps, you can use noise_shape=[batch_size, 1, features]"
                    },

                    "seed": {
                        "Default": "NA",
                        "Example": 42,
                        "Required": 0,
                        "Datatype": "number",
                        "Options": [],
                        "Description": "A Python integer to use as random seed"
                    }
                },

                "Flatten": {

                    "data_format": {
                        "Example": "channels_last",
                        "Default": "channels_last",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "channels_last", "channels_first"
                        ],
                        "Description": "A string, one of channels_last [default] or channels_first."
                    }
                },

                "ZeroPadding2D": {

                    "padding": {
                        "Example": [
                            [
                                1, 1
                            ],
                            [
                                2, 2
                            ]
                        ],
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "The tuple interpreted as [[top_pad, bottom_pad], [left_pad, right_pad]]"
                    },

                    "data_format": {
                        "Example": "channels_last",
                        "Default": "channels_last",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "channels_last", "channels_first"
                        ],
                        "Description": "A string, one of channels_last [default] or channels_first."
                    }

                },

                "AveragePooling2D": {

                    "pool_size": {
                        "Example": [
                            2, 2
                        ],
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "integer or tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimension. If only one integer is specified, the same window length will be used for both dimensions"

                    },

                    "strides": {
                        "Example": [
                            2, 2
                        ],
                        "Default": "NA",
                        "Required": 0,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size."
                    },

                    "data_format": {
                        "Example": "channels_last",
                        "Default": "channels_last",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "channels_last", "channels_first"
                        ],
                        "Description": "A string, one of channels_last [default] or channels_first."
                    },

                    "padding": {
                        "Example": "valid",
                        "Default": "valid",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "valid", "same"
                        ],
                        "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
                    }
                },

                "MaxPooling2D": {

                    "pool_size": {
                        "Example": [
                            2, 2
                        ],
                        "Default": "NA",
                        "Required": 1,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "integer or tuple of 2 integers, factors by which to downscale [vertical, horizontal]. [2, 2] will halve the input in both spatial dimensions. If only one integer is specified, the same window length will be used for both dimensions"
                    },


                    "strides": {
                        "Example": [
                            2, 2
                        ],
                        "Default": "NA",
                        "Required": 0,
                        "Datatype": "tuple",
                        "Options": [],
                        "Description": "Tuple of 2 integers, or None. Strides values. If None, it will default to pool_size."
                    },

                    "data_format": {
                        "Example": "channels_last",
                        "Default": "channels_last",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "channels_last", "channels_first"
                        ],
                        "Description": "A string, one of channels_last [default] or channels_first."
                    },

                    "padding": {
                        "Example": "valid",
                        "Default": "valid",
                        "Required": 0,
                        "Datatype": "select",
                        "Options": [
                            "valid", "same"
                        ],
                        "Description": "\"valid\" means no padding. \"same\" results in padding evenly to the left/right or up/down of the input such that output has the same height/width dimension as the input."
                    }
                }

            },
            seen: false,
            msg: '',
            path: ''
        }

        this.onDrop = this.onDrop.bind(this);
        this.delete = this.delete.bind(this);
        this.showinfo = this.showinfo.bind(this);
        this.generate_code = this.generate_code.bind(this);
        this.togglePop = this.togglePop.bind(this);
        this.generate = this.generate.bind(this);
        this.save_value = this.save_value.bind(this);
        this.api_2 = this.api_2.bind(this);


    }

    save_value = (prop) => (event) => {
        const {components} = this.state;
        var param = prop;
        var layer = this.state.selected_layer_name;
        var index = this.state.selected_layer;
        // console.log(this.state.data);
        // console.log(index,prop, event.target.value);
        // not working index error
        // console.log(this.state.selected_layer,this.state.selected_layer_name);
        // console.log(this.state.selected_layer,layer.name,param);

        // console.log(this.state.data[name][param]);

        // var temp = this.state.data[name][param];
        // console.log(name, param, temp);

        // if( 'value' in temp)
        // {
        // alert('hi');
        // }
        // else{
        const pervstate=Object.assign([], components);
        // const pervstate = components;
        // console.log(pervstate);
        pervstate[index][param]['value'] = event.target.value;
        // console.log(pervstate);
        this.setState({components: pervstate});
        // console.log(this.state.components)
        // console.log(this.state.data[name][param]);

        // }

    }

    togglePop = () => {
        this.setState({
            seen: !this.state.seen
        });
    };

    generate_code() {
        var final_dict = {};
        const temp=this.state.components;
        // const dic={...temp};
        // var dic=Object.assign({}, temp);
        var dic=_.cloneDeep(temp);
        // console.log(dic); 
        var i=0;
        for (let [key0, value0] of Object.entries(dic)) {
            console.log(key0,value0);
            i=i+1;
            // if()
            for (var key1 in value0) {
                console.log(key1);
                if (key1 !== 'name'){

                    for (var key2 in dic[key0][key1]) {
                        if (key2==='value') {
                            // console.log(dic[key1][key2]);
                            // console.log(dic[key1]);
                            // dic=_.omit(dic[key1],key2);
                            // delete dic[key1][key2];
                            // console.log(dic[key1]);
                            // console.log(dic);
                            console.log(i);
                            console.log(dic[key0].name);
                            console.log(key1);
                            console.log(dic[key0][key1][key2]);

                        if (dic[key0][key1].Datatype === "number")
                        {
                            final_dict[`Layer-${
                                i
                            }-${dic[key0].name}-${
                                key1
                            }`] = parseInt(dic[key0][key1][key2]); 

                        }
                        else if (dic[key0][key1].Datatype === "Tuple")
                        {
                            const temp = dic[key0][key1][key2].split(",");
                            console.log(temp);
                            console.log(temp[0]);
                            console.log(temp[1]);

                            final_dict[`Layer-${
                                i
                            }-${dic[key0].name}-${
                                key1
                            }`] = [parseInt(temp[0]),parseInt(temp[1])]; 

                        }
                                else{
                                    final_dict[`Layer-${
                                        i
                                    }-${dic[key0].name}-${
                                        key1
                                    }`] = dic[key0][key1][key2]; 

                                }
                        }
                        else if (dic[key0].name === "Flatten")
                        {
                            final_dict[`Layer-${
                                i
                            }-${dic[key0].name}`+'-data_format'
                            ] =  dic[key0][key1]['Default']; 
                        }
                    }
                }
                // else if(dic[key0][key1] === "Flatten")
                
            }
        }
        console.log(final_dict);

        // var list_of_components = this.state.components;
        // var final_dict = {};
        var _dict = {
            // "Layer-1-Conv2D-filters": 32,
            // "Layer-1-Conv2D-kernel_size": [
            //     3, 3
            // ],
            // "Layer-1-Conv2D-activation": "relu",
            // "Layer-1-Conv2D-padding": "same",
            // "Layer-1-Conv2D-input_shape": [
            //     200, 200, 3
            // ],

            // "Layer-2-MaxPooling2D-pool_size": [
            //     2, 2
            // ],

            // "Layer-3-Flatten-": {},

            // "Layer-4-Dense-units": 128,
            // "Layer-4-Dense-activation": "relu",
            // "Layer-4-Dense-kernel_initializer": "he_uniform",

            // "Layer-5-Dense-units": 1,
            // "Layer-5-Dense-activation": "sigmoid",

            "dataset-type": "image",
            "dataset-path": "../data/dogs_and_cats",

            "image-augment-rotation_range": 40,
            "image-augment-width_shift_range": 0.2,
            "image-augment-height_shift_range": 0.2,
            "image-augment-horizontal_flip": "True",
            "image-augment-rescale": 0.0039215,

            "image-params-target_size": [
                200, 200
            ],
            "image-params-batch_size": 64,
            "image-params-class_mode": "binary",

            "optimizer": "sgd",
            "loss": "binary_crossentropy",
            "metrics": ["accuracy"],
            "epochs": 5,

            "verbose": 1,
            "plot": "True",
            "save_plots": "True"
        };
        var dict_call = Object.assign({}, final_dict, _dict);
        console.log(dict_call);
        // for (var i = 0; i < list_of_components.length; i++) {
        //     // console.log(list_of_components[i]['component']);
        //     var name = list_of_components[i]['name'];
        //     // console.log(this.state.data[name]);

        //     var temp_dict = list_of_components[i];
        //     var list_of_param = Object.keys(temp_dict);

        //     for (var j = 0; j < list_of_param.length; j++) {
        //         if (this.state.data[name][list_of_param[j]]['value']) {
        //             // console.log(name, list_of_param[j], this.state.data[name][list_of_param[j]]['value']);
        //             final_dict[`Layer-${
        //                     i + 1
        //                 }-${name}-${
        //                     list_of_param[j]
        //                 }`] = this.state.data[name][list_of_param[j]]['value'];
        //         }
        //     }
        // }

        // console.log(final_dict);

        axios.post(`/v1/generate/`, dict_call).then(response => {
            // console.log(response);
            let message = response.data.message;
            let _path = response.data.path;

            this.setState({msg: message, path: _path});

            // console.log(message, _path);

        })
    }

    generate = () => {
        this.generate_code();
        this.togglePop();
    }

    api_2 = () => {
        axios.post(`/v1/train/`).then(response => {
            // console.log(response);
            alert("Model Training Started!");

        })
    }

    showinfo(component) {

        console.log(component);
        // var temp = this.state.data[component];
        this.setState({selected_layer_type: component});

        var ele = this.state.components;
        // console.log(ele.lastIndexOf(component));
        var index = ele.lastIndexOf(component);
        console.log(index,component.name)
        this.setState({selected_layer: index, selected_layer_name: component.name});

    }


    delete(component) {
        // console.log(component);
        // console.log(component['component']);

        // console.log(this.state.components);
        var ele = this.state.components;
        // console.log(ele.lastIndexOf(component));
        var index = ele.lastIndexOf(component);
        if (index > -1) {
            ele.splice(index, 1);
        }
        // console.log(ele);
        const newComponentsList = _.concat([], ele)
        // console.log(newComponentsList);
        // this.setState({components: ele});
        this.setState({components: newComponentsList})
        // console.log(this.state.components);


        var temp1 = this.state.data[component['component']];
        var temp2 = this.state.selected_layer_type;
        // console.log(temp1, temp2)
        if (_.isEqual(temp1, temp2)) {
            this.setState({selected_layer_type: {}});
        }

    }


    onDrop(component) {
        const {components} = this.state;
        // console.log(component)
        // console.log(this.state.data[component.component])
        const temp=this.state.data[component.component];
        // const dic={...temp};
        // var dic=Object.assign({}, temp);
        var dic=_.cloneDeep(temp);
        // console.log(dic); 
        for (var key1 in dic) {
            for (var key2 in dic[key1]) {
                if (key2==='value') {
                    console.log(dic[key1][key2]);
                    // console.log(dic[key1]);
                    // dic=_.omit(dic[key1],key2);
                    delete dic[key1][key2];
                    // console.log(dic[key1]);
                    // console.log(dic); 
                }
            }
        }

        dic['name']=component.component;
        const newComponentsList = _.concat([], components,dic)
        // console.log(newComponentsList);
        this.setState({components: newComponentsList})
        // console.log(this.state.components);
        // console.log(this.state.data);
    }


    render() {
        const {components, data, selected_layer_type} = this.state;
        var data_list = Object.keys(data);
        // console.log('state components ', components)
        // console.log(this.state.data);
        // console.log(this.state.components);
        // console.log(this.state.selected_layer_type);
        return (

            <div>

                        <div className={classes.App}>

                            <div className={
                                classes.body1
                            }>
                                <Source list={data_list}/>
                            </div>
                         
                            <div className={
                                classes.body2
                            }>
                                <Target onDrop={
                                        this.onDrop
                                    }
                                    ondelete={
                                        this.delete
                                    }
                                    oninfo={
                                        this.showinfo
                                    }
                                    components={components}/>
                            </div>

                            <div className={
                                classes.body3
                            }>
                                {
                                Object.keys(this.state.selected_layer_type).length === 0 ? (
                                    <h3>please select some layer first</h3>
                                ) : (
                                    <div className={
                                        classes.innerpad
                                    }>
                                        {

                                        Object.keys(this.state.components[this.state.selected_layer]).map((key,index) => (
                                            <>
                                            {
                                            key==='name' ?
                                            null
                                            :
                                                    <div className={
                                                classes.batch
                                            }>

                                                <div> {key}
                                                    - {/* The Parameter name is <b>{key}</b> and this is a  */}
                                                    {
                                                    this.state.selected_layer_type[key]["Required"] == 1 ? (
                                                        <span>
                                                            Required
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            Optional
                                                        </span>
                                                    )
                                                }
                                                    {/* Parameter */} </div>
                                                <br></br>
                                                {
                                                this.state.components[this.state.selected_layer][key]["Datatype"] == 'select' ? (
                                                    <div>
                                                        {/* {this.state.components[this.state.selected_layer][key]["value"] ? this.state.components[this.state.selected_layer][key]["value"] : this.state.components[this.state.selected_layer][key]["Default"]} */}
                                                                {/* {this.state.components[this.state.selected_layer][key]["Default"]} */}
                                                        <FormControl variant="outlined" size="small">
                                                            <InputLabel htmlFor="outlined-age-native-simple">
                                                                {key }</InputLabel>
                                                            <Select native
                                                                value={
                                                                    this.state.components[this.state.selected_layer][key]["value"] ? this.state.components[this.state.selected_layer][key]["value"] : this.state.components[this.state.selected_layer][key]["Default"]
                                                                    // this.state.selected_layer_type[key].hasOwnProperty(key) ? this.state.selected_layer_type[key]["value"] : this.state.selected_layer_type[key]["Default"]
                                                                }
                                                                // onChange={handleChange}
                                                                onChange={
                                                                    this.save_value(key)
                                                                }
                                                                label={key}
                                                                // inputthis.state={{
                                                                // name: 'age',
                                                                // id: 'outlined-age-native-simple',
                                                                // }}
                                                            >
                                                                {
                                                                this.state.components[this.state.selected_layer][key]["Options"].map(arr => (
                                                                    <option value={arr}>
                                                                        {arr}</option>
                                                                ))
                                                            } </Select>
                                                        </FormControl>

                                                    </div>
                                                ) : (
                                                    <div>
                                                        {/* {this.state.components[this.state.selected_layer][key]["value"] ? this.state.components[this.state.selected_layer][key]["value"] : this.state.components[this.state.selected_layer][key]["Default"]} */}
                                                                {/* {this.state.components[this.state.selected_layer][key]["Default"]} */}
                                                        <TextField required size="small" id="outlined-required" label="Required"
                                                            value={
                                                                // this.state.selected_layer_type[key]["Default"]
                                                                
                                                                this.state.components[this.state.selected_layer][key]["value"] ? this.state.components[this.state.selected_layer][key]["value"] : this.state.components[this.state.selected_layer][key]["Default"]
                                                                // this.state.selected_layer_type[key].hasOwnProperty(key) ? this.state.selected_layer_type[key]["value"] : this.state.selected_layer_type[key]["Default"]

                                                            }
                                                            variant="outlined"
                                                            onChange={
                                                                this.save_value(key)
                                                            }
                                                            helperText={
                                                                `Example - ${
                                                                    this.state.components[this.state.selected_layer][key]["Example"]
                                                                }`
                                                            }/>
                                                    </div>
                                                )
                                                }

                                                <div className={
                                                    classes.desp
                                                }>
                                                    {
                                                    this.state.components[this.state.selected_layer][key]["Description"]
                                                } </div>
                                                <br/>
                                            </div>
                                            
                                            }
                                            </>
                                        ))
                                    } </div>
                                )
                            } </div>

                        </div>

                <div className={classes.but}>

                    <Button variant="contained" color="primary"
                        onClick={
                            this.generate
                    }>
                        Generate Code
                    </Button>
                    {/* {this.state.seen ? 
                      <PopUp toggle={this.togglePop} 
                            path={this.state.path} 
                            message={this.state.msg}
                      /> : null} */}

                    <Dialog // className={classes.padd}
                        maxWidth={'lg'}
                        open={
                            this.state.seen
                        }
                        // fullScreen={true}
                        onClose={
                            this.togglePop
                        }
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {
                            this.state.msg
                        }</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Generated file's path: {
                                this.state.path
                            } </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={
                                    this.api_2
                                }
                                color="primary">
                                Train
                            </Button>
                        </DialogActions>
                    </Dialog>

                </div>
            
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(App);
