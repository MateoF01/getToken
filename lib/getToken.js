const soap = require('soap');
const fs = require('fs');

//produccion
//const url = 'https://wsaa.afip.gov.ar/ws/services/LoginCms?WSDL'

//homologacion
const url = 'https://wsaahomo.afip.gov.ar/ws/services/LoginCms?wsdl';

function getToken(){

  soap.createClient(url, (err, client) => {
    if (err) {
      console.error('Error al crear el cliente SOAP:', err);
      return;
    }
  
    const ruta = "files/MiLoginTicketRequest.xml.cms"
    const archivoCMS = fs.readFileSync(ruta,'utf8');
    const contenidoSinEncabezado = archivoCMS.replace(/-----BEGIN CMS-----|-----END CMS-----/g, '').trim();
  
    client.loginCms({ in0: contenidoSinEncabezado}, (err, result) => {
      if (err) {
        console.error('Error al ejecutar la operación loginCms:', err);
        return;
      }
  
      // Extraer el token
      const tokenMatch = result.loginCmsReturn.match(/<token>(.*?)<\/token>/);
      const token = tokenMatch ? tokenMatch[1] : null;
  
      // Extraer la sign
      const signMatch = result.loginCmsReturn.match(/<sign>(.*?)<\/sign>/);
      const sign = signMatch ? signMatch[1] : null;
  
      console.log("Token:", token);
      console.log("Sign:", sign);
  
      fs.writeFileSync('tokenNSign/token.txt', token);
      fs.writeFileSync('tokenNSign/sign.txt', sign);
  
    });
  });
}

module.exports = getToken;