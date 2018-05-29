
import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GridMaterial from '@material-ui/core/Grid';
import { observer } from "mobx-react";
import CardHeader from '@material-ui/core/CardHeader';
import TicketDrawer from './EditTicket/TicketDrawer';


let activestep= 2
  
@observer
class IncomingPanel extends React.Component {
   state = {
     queues : this.props.store.agentStore.queues,

   }

    render () {
        
        function GetStepper(queue){
          
          let steps = []
          activestep =-1
          //console.log(queue)
          if (queue.queue.currentCall){

          if (queue.queue.currentCall.ucid) {
            activestep = 0
            steps.push(<Step key='step0'><StepLabel>Call In Menus : {queue.queue.currentCall.origin}</StepLabel></Step>)
          if (queue.queue.currentCall.callType) {
            activestep = 1
            steps.push(<Step key='step1'><StepLabel>Waiting Line : {queue.queue.currentCall.callType}</StepLabel></Step>)
          }
          else
          {
            steps.push(<Step key='step1'><StepLabel>Client in menus</StepLabel></Step>)
          }
          }
          else{
            steps.push(<Step key='step0'><StepLabel>No Calls</StepLabel></Step>)
            steps.push(<Step key='step1'><StepLabel>Free</StepLabel></Step>)
          }
        }

      return (<Stepper activeStep = {activestep} alternativeLabel>{steps}</Stepper>)
    }

      return(<div><GridMaterial container spacing={24} style={{ flexGrow: 1 }} >
        <GridMaterial style={{ flex: 'auto', width:"15%", height: "135px", paddingRight:"0px", paddingLeft:"0px", paddingBottom:"10px"}} item xs><Card style={{ flex: 'auto', height: "135px" }}><CardHeader title="Queues Status"/>
      { this.props.agents.length >0 ? <TicketDrawer store={this.props.store} categories={this.props.categories} agents={this.props.agents} />:<div></div>}</Card></GridMaterial>
        {  this.props.store.agentStore.queues &&  this.props.store.agentStore.queues.map((queue) => { return (
          <GridMaterial style={{ flex: 'auto', height: "145px" ,width:"25%",paddingRight:"0px", paddingLeft:"0px"}} key={queue.ext} item xs>
          <GetStepper queue={queue} />
        </GridMaterial>)})}
      </GridMaterial>
        </div>
      ); 
    }
  }
  export default IncomingPanel