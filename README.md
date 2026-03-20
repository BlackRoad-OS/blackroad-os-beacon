# blackroad-os-beacon

Beacon is the centralized health and deploy-log service for BlackRoad OS. It collects standardized SIG beacons from every configured service and stores recent deploy events for quick debugging and dashboards.

## Features
- Polls configured services and emits SIG-compliant beacons
- Lightweight deploy-log store with append/query APIs
- Ready for dashboards (`blackroad-os-web`) and operator hooks (`blackroad-os-operator`)

## Getting started

### Installation
```bash
npm install
```

### Environment
Copy `.env.example` to `.env` and adjust paths if needed. The default configuration uses `config/services.example.yaml` and stores deploy history in `data/deploy-log.jsonl`.

### Development server
```bash
npm run dev
```

### Tests & validation
```bash
npm test
npm run lint
npm run validate:sig
```

### Example curls
```bash
curl http://localhost:8080/health
curl http://localhost:8080/beacon
curl "http://localhost:8080/deploys?service=blackroad-os-web&limit=5"
```

## HTTP Endpoints
- `GET /health` – self health for beacon
- `GET /services` – list configured services
- `GET /beacon` – aggregated beacons for all services
- `GET /deploys` – query deploy history (`service`, `env`, `limit` optional)
- `POST /deploys` – append deploy record (must satisfy `schemas/sig.deploy-log.spec.json`)

## Relationships
- **blackroad-os-infra**: source of SIG schemas copied into `/schemas`
- **blackroad-os-web**: can visualize beacons for dashboards
- **blackroad-os-operator**: can append deploy records and trigger checks

## Service layout
- `/src` application code (Express)
- `/schemas` SIG specs for validation
- `/config` example service registry
- `/scripts` validation helpers
- `/tests` Vitest coverage for logic and HTTP routes

For a conceptual overview, see [`docs/BEACON_OVERVIEW.md`](docs/BEACON_OVERVIEW.md).

---

**Proprietary Software — BlackRoad OS, Inc.**

This software is proprietary to BlackRoad OS, Inc. Source code is publicly visible for transparency and collaboration. Commercial use, forking, and redistribution are prohibited without written authorization.

**BlackRoad OS — Pave Tomorrow.**

*Copyright 2024-2026 BlackRoad OS, Inc. All Rights Reserved.*
