const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it('response returned by receiveMessage contains name of message', function(){
    let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
    let rover = new Rover(98382);
    let message = new Message('hello', commands);
    let expected = 'hello';
    let actual = rover.receiveMessage(message).message;
    expect(actual).toEqual(expected);
  })

  it('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);
      let expected = commands.length;
      let actual = rover.receiveMessage(message).results.length;
    expect(expected).toEqual(actual);
    
  })

  it('responds correctly to status check command', function(){
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test for STATUS_CHECK', commands);
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382
      }
    };
    let actualResponse = rover.receiveMessage(message).results[0];
    expect(true).toEqual(actualResponse.completed);
    expect(expected.roverStatus.mode).toEqual(actualResponse.roverStatus.mode)
    expect(expected.roverStatus.generatorWatts).toEqual(actualResponse.roverStatus.generatorWatts)
    expect(expected.roverStatus.position).toEqual(actualResponse.roverStatus.position)
  })
  
  it(`responds correctly to mode change command`, function(){
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE','LOW_POWER')];
    let message = new Message('Test for MODE_CHANGE', commands);
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'LOW_POWER',
        generatorWatts: 110,
        position: 98382
      }
    };
    let actual = rover.receiveMessage(message).results[0];
    expect(expected.roverStatus.mode).toEqual(actual.roverStatus.mode);
  })

  it('responds with false completed value when attempting to move in LOW_POWER mode', function(){
    let rover = new Rover(98382);
    let commands = [
      new Command('MODE_CHANGE', 'LOW_POWER'),  
      new Command('MOVE', 98234)
      ];
    let message = new Message('Test for moving with low power', commands);
    let expected = {
      completed: false,
      roverStatus: {
        mode: 'LOW_POWER',
        generatorWatts: 110,
        position: 98382
      }
    };
    let actual = rover.receiveMessage(message).results[1];
    expect(expected.roverStatus.position).toEqual(actual.roverStatus.position)
    expect(expected.roverStatus.mode).toEqual(actual.roverStatus.mode);
    expect(expected.completed).toEqual(actual.completed);
    
  })
  
  it('responds with position for move command', function(){
    let rover = new Rover(98382);
    let commands = [new Command('MOVE', 982341)];
    let message = new Message('Test for moving rover', commands);
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 982341
      }
    };
    let actual = rover.receiveMessage(message).results[0];
    expect(expected.roverStatus.mode).toEqual(actual.roverStatus.mode);
    expect(expected.roverStatus.position).toEqual(actual.roverStatus.position);
  })
});
