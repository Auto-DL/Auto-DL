import React, { Component } from 'react';
import {DropTarget} from 'react-dnd';
import './target.css';
import Chip from '@material-ui/core/Chip';

class Target extends Component{
    render(){
        console.log('this.props ', this.props)
        const { connectDropTarget, ondelete, components , oninfo } = this.props;
        console.log('dropped components ', components);



        const handleDelete = (data) => {
            console.info(data);
            ondelete(data);
          };

          const handleClick = (data) => {
            //   alert(data);
              oninfo(data);
          };

        return(
            connectDropTarget(
            <div className="target">
                {
                    components.map(data=>{
                        // let html = '';
                        // if(data.component === 'input'){
                        //     html = '<input type="text"/>'
                        // }else if(data.component === 'checkbox'){
                        //     html = '<input type="checkbox"/>'
                        // }else if(data.component === 'button'){
                        //     html = '<button>Button</button>'
                        // }else if(data.component === 'select'){
                        //     html = '<select><option>Option 1</option><option>Option 2</option></select>'
                        // }
                    return <div 
                    // dangerouslySetInnerHTML={{__html:html}}
                    >
                         <Chip
                            // icon={<FaceIcon />}
                            label={data.component}
                            onDelete={()=>handleDelete(data)}
                            color="primary"
                            variant="outlined"
                            onClick={()=>handleClick(data.component) }
                        />
                        <br/>
                        </div>
                    })
                }
            </div>
            )
        )
    }
}

const spec = {
    drop(props, monitor, component){
        const item = monitor.getItem()
        console.log(item);
        props.onDrop(item)
    }
}
const collect = (connect, monitor)=>{
  return {
      connectDropTarget: connect.dropTarget(),
    //   isOver: monitor.isOver(),
    //   isOverCurrent: monitor.isOver({ shallow: true }),
    //   canDrop: monitor.canDrop()
  };
}

export default DropTarget('form-elements', spec, collect)(Target);
