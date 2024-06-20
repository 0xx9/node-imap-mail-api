const Imap = require('node-imap');
const { simpleParser } = require('mailparser');

const imapConfig = {
  user: 'ceo@theblackpoison.online', // replace with your mail
  password: 'password',
  host: 'host', // replace with your IMAP server like this imap.theblackpoison.oline
  port: 993,
  tls: true,
};

function fetchLatestEmail(emailAddress) {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    function openInbox(cb) {
      imap.openBox('INBOX', true, cb);
    }

    imap.once('ready', function () {
      openInbox((err, box) => {
        if (err) {
          console.error('Error opening inbox:', err);
          reject(err);
          return;
        }
        console.log('Inbox opened successfully');
        
        imap.search([['TO', emailAddress]], (err, results) => {
          if (err) {
            console.error('Search error:', err);
            imap.end();
            reject(err);
            return;
          }
          console.log('Search results:', results);
          if (!results.length) {
            console.log('No emails found for address:', emailAddress);
            imap.end();
            resolve(null);
            return;
          }

          const f = imap.fetch(results, { bodies: '' });
          f.on('message', msg => {
            msg.on('body', stream => {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  console.error('Error parsing email:', err);
                  imap.end();
                  reject(err);
                  return;
                }
                const { subject, text } = parsed;
                imap.end();
                resolve({ subject, body: text });
              });
            });
          });

          f.once('error', err => {
            console.error('Fetch error:', err);
            imap.end();
            reject(err);
          });
        });
      });
    });

    imap.once('error', function (err) {
      console.error('IMAP connection error:', err);
      reject(err);
    });

    imap.once('end', function () {
      console.log('Connection ended');
    });

    imap.connect();
  });
}

module.exports = { fetchLatestEmail };
