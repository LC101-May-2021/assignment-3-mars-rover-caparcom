const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
   constructor(position){
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }
   receiveMessage(message){
    let initialResults = {
      message: message.name,
       };
       let emptyObj
       let resultsArr = [];
       for(let i = 0; i < message.commands.length; i++){
        emptyObj = {};
        if(message.commands[i].commandType === 'MODE_CHANGE'){
             if(message.commands[i].value === 'NORMAL'){
               this.mode = 'NORMAL';
              emptyObj.roverStatus = {
              mode: 'NORMAL',
              generatorWatts: this.generatorWatts,
              position: this.position
              }
            emptyObj.completed = true;             
             }
             if(message.commands[i].value === 'LOW_POWER'){
               this.mode = 'LOW_POWER'
              emptyObj.roverStatus = {
                mode: "LOW_POWER"
              }
            emptyObj.completed = true;
             }
          }
      if(message.commands[i].commandType === 'MOVE'){
            if(this.mode === 'NORMAL'){
              this.position = message.commands[i].value;
              emptyObj.roverStatus = {
                mode: 'NORMAL',
                generatorWatts: this.generatorWatts,
                position: message.commands[i].value
              }
              emptyObj.completed = true;             
            }
        
            if(this.mode === 'LOW_POWER'){
              emptyObj.roverStatus = {
                mode: 'LOW_POWER',
                generatorWatts: this.generatorWatts,
                position: this.position
              }
              emptyObj.completed = false;             
           }
          }
      if(message.commands[i].commandType === 'STATUS_CHECK'){
            emptyObj.roverStatus = {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
            emptyObj.completed = true;
           }
        resultsArr.push(emptyObj);
       }
        initialResults.results = resultsArr;
        return initialResults;
    }
}


    /*let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('test for STATUS_CHECK', commands);
console.log(rover.receiveMessage(message));

/*mode: 'NORMAL',
        generatorWatts: 110,
        position: this.position
/*let messageCommand = message.commands.commandType;
    let messageName = message.name;
    let papaResults = [];
    let discovery = {
      message: messageName,
      results: papaResults
    };
    if(messageCommand === "STATUS_CHECK"){
       papaResults.push(this.initialResults);
       return discovery;
    }
    if(messageCommand === "MODE_CHANGE", "LOW_POWER"){
      this.initialResults.roverStatus.mode = 'LOW_POWER';
      papaResults.push(this.initialResults);
      return discovery;
    }
     return message;
  }

   /*for .....
      ifs.... status check
      push something?
*/

/*this.nameOfCommand.push(message.commands.commandType);
     let initialResults = {
      message: message.name,
      results: {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: this.position
       }}}
     for(const key in message){
         if(this.nameOfCommand === 'STATUS_CHECK' ){
         console.log('hello');
         return initialResults;
         }
           else if(this.nameOfCommand === ('MODE_CHANGE', "LOW_POWER")){
         initialResults.roverStatus.mode = 'LOW_POWER';
         return initialResults;      
        }
     }

/*receiveMessage(message)
message is a Message object
Returns an object containing at least two properties:
message: the name of the original Message object
results: an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
Updates certain properties of the rover object
Details about how to respond to different commands are in the Command Types table.*/

module.exports = Rover;