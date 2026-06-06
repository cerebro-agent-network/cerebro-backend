const express = require('express');
const app = express();

const contractId = process.env.CONTRACT_ID || 'CB7OZPTIUENDWJWNHRGDPZLIEIS6TXMFRYT4WCGHIZVYLCTXEONC6VHY';

app.get('/', (req, res) => {
  res.json({
    project: 'cerebro-agent-network',
    status: 'Streaming Education',
    contract: contractId,
  });
});

if (require.main === module) {
  app.listen(3000);
}

module.exports = app;
