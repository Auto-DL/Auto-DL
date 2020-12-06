import React from 'react';
import { DragSource } from 'react-dnd';
import './source.css';

// const components = [
//     'Conv2D',
//     'Dense',
//     'LSTM',
//     'MaxPooling2D'
// ]
class Source extends React.Component{
    render(){
        // console.log('this.props ', this.props)
        return(
            <div className="source">
            <ul>
            {
                this.props.list.map(component=>{
                    return <ListItem component={component}/>
                })
            }
            </ul>
            </div>
        )
    }
}

const spec = {
    beginDrag(props, monitor, component) {
        // { component: 'input' }
        const item = { ...props};
        return item;
    }
};

const collect = (connect, monitor)=>{
  return {
    connectDragSource: connect.dragSource()
  };
}


const ListItem = DragSource("form-elements",spec,collect)(props=>{
    const { connectDragSource, component } = props;
    return connectDragSource(<li>{component}</li>)
});


export default Source
