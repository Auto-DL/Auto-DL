import { Fragment ,useState} from "react";
import { Grid, TextField, FormControl, Select } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useStyles } from "./styles.js";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import FileCopySharpIcon from '@material-ui/icons/FileCopySharp';
import Button from "@material-ui/core/Button";

const LayerTab = ({ TabPanel, value, handleDragEnd, jsondata, components, selected_layer, selected_layer_type, showdetails, save_value ,handleCloneLayer}) => {
  const theme = useTheme();
  const classes = useStyles();
  const [selected_InputFieldDesc,setselected_InputFieldDesc]=useState("");

  const handleDescriptionLayer =(index)=>{
    setselected_InputFieldDesc(index);
    // console.log(index);
  }

  return (
      <TabPanel value={value} index={1} dir={theme.direction}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Grid container>
          <Grid item lg={3} md={3} sm={4} xs={4} className={classes.grid1}>
            <div key="source" className={classes.column1}>
              <span className={classes.spancss}>Layers</span>

              <Droppable droppableId="source">
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.droppableColsource}
                    >
                      {Object.keys(jsondata).map((el, index) => {
                        return (
                          <Draggable key={el} index={index} draggableId={el}>
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={classes.item}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Grid>

          <Grid item lg={5} md={5} sm={4} xs={4} className={classes.grid2}>
            <div key="target" className={classes.column2}>
              <span className={classes.spancss}>Model</span>

              <Droppable droppableId="target">
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={classes.droppableColtarget}
                    >
                      {components.map((el, index) => {
                        return (
                          <Draggable
                            key={el.id}
                            index={index}
                            draggableId={el.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={classes.container}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    className={
                                      selected_layer ===
                                      el.id.charAt(el.id.length - 1)
                                        ? classes.item1selected
                                        : classes.item1
                                    }
                                    onClick={() => showdetails(el)}
                                  >
                                    {el.name}
                                    <Button 
                                      size="small" 
                                      color="primary" 
                                      onClick={() =>handleCloneLayer(el) }
                                      className={classes.cloneBtn}
                                      >
                                      <FileCopySharpIcon fontSize="small" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          </Grid>

          <Grid item lg={4} md={4} sm={4} xs={4} className={classes.grid3}>
            <div className={classes.column3}>
              <span className={classes.spancss}>
                {Object.keys(selected_layer_type).length !== 0
                  ? "name" in components[selected_layer]
                    ? components[selected_layer].name
                    : null
                  : null}
              </span>

              <div className={classes.body3}>
                {Object.keys(selected_layer_type).length === 0 ? (
                  <h3>please select some layer first</h3>
                ) : (
                  <div className={classes.innerpad}>
                    {Object.keys(components[selected_layer]).map(
                      (key, index) => (
                        <Fragment key={index}>
                          {key === "name" ||
                          key === "id" ||
                          key === "type" ? null : (
                            <div className={classes.batch}>
                              <div className={classes.title}>
                                {" "}
                                {key}
                                &nbsp;{" "}
                                {selected_layer_type[key]["Required"] ===
                                1 ? (
                                  <span>*</span>
                                ) : (
                                  <span></span>
                                )}
                              </div>

                              <div
                                className={classes.infoiconLayer}
                                title={
                                  components[selected_layer][key][
                                    "Description"
                                  ]
                                }
                              >
                               <HelpOutlineIcon
                                  fontSize="small" 
                                  cl
                                  onClick={() => {
                                    handleDescriptionLayer(key);
                                    setTimeout(()=> setselected_InputFieldDesc(""),3000);
                                  }}


                                 />
                              </div>
                              {components[selected_layer][key]["Datatype"] ===
                              "select" ? (
                                <div className={classes.value}>
                                  <FormControl
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                  >
                                    <Select
                                      native
                                      value={
                                        components[selected_layer][key][
                                          "value"
                                        ]
                                          ? components[selected_layer][key][
                                              "value"
                                            ]
                                          : components[selected_layer][key][
                                              "Default"
                                            ]
                                      }
                                      onChange={save_value(key)}
                                    >
                                      {components[selected_layer][key][
                                        "Options"
                                      ].map((arr, index) => (
                                        <option key={index} value={arr}>
                                          {arr}
                                        </option>
                                      ))}{" "}
                                    </Select>
                                    {
                                          selected_InputFieldDesc===key?
                                          <p style={{fontSize:"80%",marginTop:"1px",fontWeight:"100",color:"#a2a4a8",marginLeft:"5%"}}>
                                          {components[selected_layer][key]["Description"]}
                                          </p>
                                          :<p style={{fontSize:"80%",marginTop:"1px",fontWeight:"100",color:"#a2a4a8",marginLeft:"5%"}}>
                                            Example-{components[selected_layer][key]["Example"]}
                                          </p>
                                        }
                                  </FormControl>
                                </div>
                              ) : (
                                <div className={classes.value}>
                                  <TextField
                                    required
                                    size="small"
                                    value={
                                      components[selected_layer][key]["value"]
                                        ? components[selected_layer][key][
                                            "value"
                                          ]
                                        : components[selected_layer][key][
                                            "Default"
                                          ] === "NA"
                                        ? ""
                                        : components[selected_layer][key][
                                            "Default"
                                          ]
                                    }
                                    variant="outlined"
                                    onChange={save_value(key)}
                                    helperText={
                                      // `Example - ${components[selected_layer][key]["Example"]}`
                                      `${
                                          selected_InputFieldDesc===key ?
                                          components[selected_layer][key]["Description"]
                                          :`Example-${components[selected_layer][key]["Example"]}`
                                        }`

                                      }
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </Fragment>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </Grid>

          <div className={classes.delete}>
            <Droppable droppableId="delete">
              {(provided, snapshot) => {
                return (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <h3>Drag here to delete the layer</h3>

                    {provided.placeholder}
                  </div>
                );
              }}
            </Droppable>
          </div>
        </Grid>
      </DragDropContext>
    </TabPanel>
  );
}
 
export default LayerTab;