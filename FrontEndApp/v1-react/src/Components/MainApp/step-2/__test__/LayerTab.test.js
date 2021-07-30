import { render, screen  } from "@testing-library/react";
import LayerTab from "../LayerTab";

const mockTabPanel =jest.fn();     
const mockValue  =jest.fn();  
const mockHandleDragEnd  =jest.fn();  
const mockJsondata  =jest.fn();  
const mockComponents  =jest.fn();  
const mockSelected_layer  =jest.fn();   
const mockShowdetails  =jest.fn();  
const mockSave_value  =jest.fn();  
const mockHandleCloneLayer  =jest.fn(); 

const mockSelected_layer_type  ={};

test("column 3 of layer tab contains 'please select some layer first'",()=>{
    render(<LayerTab
        TabPanel={mockTabPanel}
        value={mockValue}
        handleDragEnd={mockHandleDragEnd}
        jsondata={mockJsondata}
        components={mockComponents}
        selected_layer={mockSelected_layer}
        selected_layer_type={mockSelected_layer_type}
        showdetails={mockShowdetails}
        save_value={mockSave_value}
        handleCloneLayer={mockHandleCloneLayer}
    />);
    const col3=screen.getByTestId("column-3");
    expect(col3).toBeInTheDocument();


});