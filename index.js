
const ticketLoginUpdater = require('./lib/ticketLoginUpdater.js');
const createLoginTicket = require("./lib/createLoginTicket.js");
const getToken = require("./lib/getToken.js")

const  miLoginTicketRequest = 'files/MiLoginTicketRequest.xml';

ticketLoginUpdater.updateGenerationAndExpirationTime(miLoginTicketRequest);

createLoginTicket();

getToken();


