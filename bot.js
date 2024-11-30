const hydraBot = require('hydra-bot');

(async () => {
  let client;

  
  const ev = await hydraBot.initServer();

  
  ev.on('qrcode', (qrcode) => {
    console.log('QR Code para escanear:', qrcode);
  });

  
  ev.on('connection', async (conn) => {
    
    if (conn.statusFind === 'browser') {
      console.log('Informações do Navegador:', conn.text);
    }

    
    if (conn.connect) {
      console.log('Bot conectado ao WhatsApp!');

      
      client = conn.client;

      try {
        
        console.log('Aguardando carregamento do WhatsApp Web...');
        await new Promise(resolve => setTimeout(resolve, 5000)); 

        
        const contacts = await client.getAllContacts();

        
        const groups = contacts.filter(contact => contact.id.endsWith('@g.us'));

        console.log('Lista de Grupos:');
        if (groups.length > 0) {
          groups.forEach((group, index) => {
            console.log(`${index + 1}. Nome: ${group.name || 'Sem nome'}, ID: ${group.id}`);
          });
        } else {
          console.log('Nenhum grupo encontrado.');
        }
      } catch (error) {
        console.error('Erro ao obter os contatos:', error.message);
      }
    }
  });

})();
