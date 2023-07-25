const { exec } = require('child_process');

const xmlFilePath = 'files/MiLoginTicketRequest.xml';
const certFilePath = 'files/MiCertificado.pem';
const keyFilePath = 'files/MiClavePrivada.key';

function createLoginTicket(){

    const comando = `openssl cms -sign -in ${xmlFilePath} -out ${xmlFilePath}.cms -signer ${certFilePath} -inkey ${keyFilePath} -nodetach -outform PEM`;

//    const comando = 'openssl cms -sign -in MiLoginTicketRequest.xml -out MiLoginTicketRequest.xml.cms -signer MiCertificado.pem -inkey MiClavePrivada.key -nodetach -outform PEM';

    exec(comando, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error al ejecutar el comando: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error en la salida del comando: ${stderr}`);
        return;
    }
    console.log(`Comando ejecutado correctamente. Salida: ${stdout}`);
    });
}

module.exports = createLoginTicket;