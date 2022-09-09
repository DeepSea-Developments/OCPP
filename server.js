import ocpp from 'ocpp-eliftech';

const server = new ocpp.CentralSystem();

server.listen(9220);

server.onRequest = async function(client, command) {    
    const connection = client.connection;
    // console.log(command);
    // console.info(`New command from ${connection.url}`);
    // Handle different commands    
    switch (true) {
        case command instanceof ocpp.OCPPCommands.BootNotification:   
        console.log({ message: 'BootNotification', chargeBoxIdentity, payload: command });       
          return {
            status: 'Accepted',
            currentTime: new Date().toISOString(),
            interval: 60
          };
  
        case command instanceof ocpp.OCPPCommands.Authorize:
          return {
            idTagInfo: {
              status: 'Accepted'
            }
          };
  
        case command instanceof ocpp.OCPPCommands.StartTransaction:
          return {
            transactionId: 1,
            idTagInfo: {
              status: 'Accepted'
            }
          };
  
        case command instanceof ocpp.OCPPCommands.StopTransaction:
          return {
            transactionId: 1,
            idTagInfo: {
              status: 'Accepted'
            }
          };
  
        case command instanceof ocpp.OCPPCommands.Heartbeat:
          console.log({ message: 'Heartbeat', chargeBoxIdentity, payload: command });
          return {
            currentTime: new Date().toISOString()
          };
  
        case command instanceof ocpp.OCPPCommands.StatusNotification:
          // client.info = client.info || {};
          // client.info.connectors = client.info.connectors || [];
  
          const connectorIndex = client.info.connectors.findIndex(item => command.connectorId === item.connectorId);
          if (connectorIndex === -1) {
            client.info.connectors.push({
              ...command
            });
          } else {
            client.info.connectors[connectorIndex] = {
              ...command
            };
          }
          await cSystem.onStatusUpdate();
          return {};
        default:
          throw new ocpp.OCPPError(ERROR_NOTIMPLEMENTED, 'Unknown command');
      }          
}