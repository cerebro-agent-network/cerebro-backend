# Cerebro Backend API

Express API for the cerebro-agent-network decentralized education streaming platform.

## Overview

Provides a REST endpoint for querying cerebro-agent-network platform data including project status and smart contract information.

## Getting Started

```bash
npm install
npm start
```

The server runs on `http://localhost:3000`.

## Endpoints

### `GET /`

Returns project metadata:

```json
{
  "project": "cerebro-agent-network",
  "status": "Streaming Education",
  "contract": "CB7OZPTIUENDWJWNHRGDPZLIEIS6TXMFRYT4WCGHIZVYLCTXEONC6VHY"
}
```

## Related

- [Cerebro Contracts](https://github.com/cerebro-agent-network/cerebo-contracts)
- [Cerebro Frontend](https://github.com/cerebro-agent-network/cerebo-frontend)
