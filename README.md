# Cerebro Backend API

> REST API powering the **Cerebro Agent Network** — a decentralized education streaming platform built on the Stellar blockchain.

[![CI](https://github.com/cerebro-agent-network/cerebro-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/cerebro-agent-network/cerebro-backend/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Configuration](#configuration)
- [Testing](#testing)
- [CI/CD](#cicd)
- [Related Projects](#related-projects)

---

## Overview

Cerebro Backend is the server-side layer of the Cerebro Agent Network ecosystem. It exposes a lightweight, high-availability REST API that surfaces real-time project metadata and Stellar smart-contract information to frontend clients and on-chain agents.

Key characteristics:

- **Minimal footprint** — single-process Node.js/Express server, trivially deployable to any cloud or edge runtime.
- **Blockchain-aware** — exposes the on-chain contract address so clients can interact directly with Cerebro's Stellar smart contract.
- **12-factor ready** — all environment-specific values are injected via environment variables; no secrets baked into the image.
- **Fully tested** — comprehensive test suite using Node's built-in test runner (no external framework needed).

---

## Architecture

```
┌─────────────────────────────────────────┐
│            Cerebro Agent Network        │
│                                         │
│  ┌──────────┐      ┌──────────────────┐ │
│  │ Frontend │─────▶│  Backend API     │ │
│  │ (React)  │      │  (Express / Node)│ │
│  └──────────┘      └────────┬─────────┘ │
│                             │           │
│                   ┌─────────▼─────────┐ │
│                   │ Stellar Blockchain │ │
│                   │ (Smart Contracts)  │ │
│                   └───────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js     | ≥ 20    |
| npm         | ≥ 9     |

### Installation

```bash
# Clone the repository
git clone https://github.com/cerebro-agent-network/cerebro-backend.git
cd cerebro-backend

# Install dependencies
npm install
```

### Run

```bash
# Start the server (default port 3000)
npm start
```

The API is available at `http://localhost:3000`.

---

## API Reference

### `GET /`

Returns live project metadata and the on-chain smart contract address.

**Request**

```http
GET / HTTP/1.1
Host: localhost:3000
```

**Response `200 OK`**

```json
{
  "project":  "cerebro-agent-network",
  "status":   "Streaming Education",
  "contract": "CB7OZPTIUENDWJWNHRGDPZLIEIS6TXMFRYT4WCGHIZVYLCTXEONC6VHY"
}
```

| Field      | Type   | Description                                         |
|------------|--------|-----------------------------------------------------|
| `project`  | string | Canonical project identifier                        |
| `status`   | string | Current platform status                             |
| `contract` | string | Stellar smart-contract address (overridable via env)|

---

## Configuration

All configuration is supplied through environment variables.

| Variable      | Default                                           | Description                          |
|---------------|---------------------------------------------------|--------------------------------------|
| `PORT`        | `3000`                                            | Port the HTTP server listens on      |
| `CONTRACT_ID` | `CB7OZPTIUENDWJWNHRGDPZLIEIS6TXMFRYT4WCGHIZVYLCTXEONC6VHY` | Stellar contract address |

Create a `.env` file at the project root for local overrides (never commit this file):

```env
PORT=3000
CONTRACT_ID=YOUR_CONTRACT_ID_HERE
```

---

## Testing

The test suite uses **Node's built-in test runner** — no additional test framework is required.

```bash
npm test
```

Coverage includes:

- `GET /` returns HTTP 200 with `application/json` content-type
- Response body contains all required fields (`project`, `status`, `contract`)
- Field values match expected data
- Contract field reflects `CONTRACT_ID` environment variable
- Idempotency: repeated calls return identical responses
- Unknown routes return HTTP 404
- Unsupported HTTP methods return HTTP 404

---

## CI/CD

GitHub Actions runs the full test suite on every push and pull request to `main`, across **Node.js 20 and 22**.

```
.github/workflows/ci.yml
```

Workflow steps:

1. Checkout source
2. Set up Node.js (matrix: 20, 22)
3. `npm ci` — install pinned dependencies
4. `npm test` — run test suite

---

## Related Projects

| Project | Repository |
|---------|-----------|
| Cerebro Contracts | [cerebo-contracts](https://github.com/cerebro-agent-network/cerebo-contracts) |
| Cerebro Frontend  | [cerebo-frontend](https://github.com/cerebro-agent-network/cerebo-frontend)   |

---

## License

MIT © Cerebro Agent Network
