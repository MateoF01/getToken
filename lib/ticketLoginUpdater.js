const fs = require('fs');
const xml2js = require('xml2js');
const moment = require('moment-timezone');
const { promisify } = require('util');

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function updateGenerationAndExpirationTime(xmlPath) {
  try {
    const xmlContent = await readFileAsync(xmlPath, 'utf8');

    const parser = new xml2js.Parser();
    const xmlDoc = await parser.parseStringPromise(xmlContent, { explicitArray: false });

    console.log(xmlDoc.loginTicketRequest.header[0].generationTime[0])

    const argentinaTimeZone = 'America/Argentina/Buenos_Aires';
    const currentDateTime = moment().tz(argentinaTimeZone).format('YYYY-MM-DDTHH:mm:ss');
    const expirationDateTime = moment().tz(argentinaTimeZone).add(24, 'hours').format('YYYY-MM-DDTHH:mm:ss');

    xmlDoc.loginTicketRequest.header[0].generationTime[0] = currentDateTime;
    xmlDoc.loginTicketRequest.header[0].expirationTime[0] = expirationDateTime;

    const builder = new xml2js.Builder();
    const updatedXmlContent = builder.buildObject(xmlDoc);

    await writeFileAsync(xmlPath, updatedXmlContent, 'utf8');

    console.log('GenerationTime y ExpirationTime actualizados exitosamente.');
  } catch (error) {
    console.error('Error al actualizar GenerationTime y ExpirationTime:', error);
  }
}

module.exports = {
  updateGenerationAndExpirationTime,
};
