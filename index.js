const express = require('express');
const bodyParser = require('body-parser');
const { fetchLatestEmail } = require('./imapService');

const app = express();
const port = 5555;

app.use(bodyParser.json());

app.get('/:emailAddress', async (req, res) => {
  const { emailAddress } = req.params
  try {
    const emailData = await fetchLatestEmail(emailAddress);
    if (emailData) {
      res.json(emailData);
    } else {
      res.status(404).json({ error: 'No emails found for this address' });
    }
  } catch (error) {
    console.error('Error fetching email:', error);
    res.status(500).json({ error: 'Failed to fetch email' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
