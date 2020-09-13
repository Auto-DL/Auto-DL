import React, { Component } from 'react';
import classes from './Collect_param.module.css';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';


// function Collect_param(this.props) {
class Collect_param extends Component {
    constructor(){
    super();
    this.state = {
        data:{},
    }
    }

  render() {

  return (

  <div className={classes.body}>
      {Object.keys(this.props.layer_selected).length === 0 ? 
      (<h3>please select some layer first</h3>)
      :
      (
      <div>
                {

                Object.keys(this.props.layer_selected).map(
                    key=>(
                        <div className={classes.batch}>
                            <div>
                            {key} - 
                            {/* The Parameter name is <b>{key}</b> and this is a  */}
                            {   
                            this.props.layer_selected[key]["Required"]==1 ?
                            (<span> Required </span>)
                            :
                            (<span> Optional </span>)
                            }
                            {/* Parameter */}
                            </div>
                            <br></br>
                            {   
                            this.props.layer_selected[key]["Datatype"]=='select' ?
                            (<div> 
                                
                                <FormControl variant="outlined" size="small">
                                <InputLabel htmlFor="outlined-age-native-simple">{key}</InputLabel>
                                <Select
                                native
                                value={this.props.layer_selected[key]["Default"]}
                                // onChange={handleChange}
                                onChange={this.props.changed_value(key)}
                                label={key}
                                // inputthis.props={{
                                    // name: 'age',
                                    // id: 'outlined-age-native-simple',
                                // }}
                                >
                                  {  this.props.layer_selected[key]["Options"].map(
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
                                defaultValue={this.props.layer_selected[key]["Default"]}
                                variant="outlined"
                                helperText={`Example - ${this.props.layer_selected[key]["Example"]}`}
                              />
                               </div>)
                            }

                            <div className={classes.desp}>
                            {this.props.layer_selected[key]["Description"]}
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
  
  );
    }
}
 
export default Collect_param;
