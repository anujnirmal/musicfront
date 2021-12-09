import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DraftsIcon from '@material-ui/icons/Drafts';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Collapse from '@material-ui/core/Collapse';
  

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      background: "transparent",
      color: "white" ,
      borderRadius: 10,
    },
  }));

  
  function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  } 

  function generate(element) {
   
  }
  export default function SimpleList(props) {
    const classes = useStyles();
    const [isChecked, setIsChecked] = React.useState(false);    
    var roomList = props.roomList;
    return (    
      <div className={classes.root}>
        <List component="nav" aria-label="main mailbox folders">

          <ListItem button onClick = {()=>{setIsChecked(!isChecked)}}>
            <ListItemIcon>
              <ExpandMoreIcon />
            </ListItemIcon>
            <ListItemText primary="Rooms" />
          </ListItem>
          <Collapse in={isChecked} sx ={{ maxWidth:"100%", overflow:"auto"}}>
         
          <List dense= {true}  >
              {roomList.map(room=>(
                   <ListItem>
                   <ListItemText
                     primary= {room}
                   
                   />
                 </ListItem>
              ))}
            </List>
         
        </Collapse>
          <Divider />
         
        </List>
      </div>
    );
  }






