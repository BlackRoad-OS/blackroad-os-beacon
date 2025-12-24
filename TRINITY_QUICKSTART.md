# 🚦 Quick Start: Trinity System

**For Developers Working on blackroad-os-beacon**

---

## What is Trinity?

The Light Trinity is BlackRoad OS's unified system for:
- 🟢 **GreenLight**: Project management & event logging
- 🟡 **YellowLight**: Infrastructure automation & deployment
- 🔴 **RedLight**: Brand templates & visual consistency

**All three are already installed and ready to use!**

---

## Quick Verification

```bash
# Run the registration script to verify everything is set up
./scripts/trinity-register.sh
```

Expected output: ✅ All lights should be **ACTIVE**

---

## Most Common Use Cases

### 1. Log a Deployment (GreenLight)

```bash
# Source the templates first
source .trinity/greenlight/scripts/memory-greenlight-templates.sh

# Log deployment
gl_deployed "blackroad-os-beacon" "v1.2.3" "production" "New health check endpoints added"

# Log completion of a development phase
gl_phase_done "api-development" "blackroad-os-beacon" "All /beacon endpoints tested and documented" "🎯"
```

### 2. Track Infrastructure Changes (YellowLight)

```bash
# Source the templates first
source .trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# Log successful deployment
yl_deployment_succeeded "blackroad-os-beacon" "railway" "https://blackroad-os-beacon.railway.app" "v1.2.3" "production"

# Log health check
yl_health_check "blackroad-os-beacon" "https://blackroad-os-beacon.railway.app/health" "95"
```

### 3. Create Status Page (RedLight)

```bash
# Copy a brand template
cp .trinity/redlight/templates/blackroad-dashboard.html ./public/status.html

# Edit with Beacon-specific content while keeping brand colors
```

---

## Available Template Functions

### GreenLight (103 functions)
- **Deployments**: `gl_deployed`, `gl_deployment_started`, `gl_rollback_initiated`
- **Errors**: `gl_error_detected`, `gl_error_resolved`, `gl_bug_found`
- **Tasks**: `gl_wip`, `gl_task_done`, `gl_phase_done`
- **Coordination**: `gl_coordinate`, `gl_agent_available`, `gl_collaboration_success`
- **Full list**: `source .trinity/greenlight/scripts/memory-greenlight-templates.sh && show_help`

### YellowLight (Infrastructure)
- **Deployments**: `yl_deployment_succeeded`, `yl_deployment_failed`, `yl_deployment_rollback`
- **Health**: `yl_health_check`, `yl_service_down`, `yl_service_recovered`
- **CI/CD**: `yl_workflow_trigger`, `yl_workflow_done`
- **Platforms**: Works with Railway, Cloudflare, DigitalOcean, Raspberry Pi

### RedLight (23 templates)
- Brand templates in `.trinity/redlight/templates/`
- Categories: Dashboards, Landing pages, 3D worlds, Animations
- All use BlackRoad gradient: `#FF9D00 → #0066FF`

---

## Common Workflows

### During Development

```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh

# Start work
gl_wip "beacon-api" "Adding metrics endpoint"

# Mark progress
gl_progress "beacon-api" "Metrics endpoint skeleton done" "Adding tests" "👉" "🔧"

# Complete
gl_task_done "beacon-api-metrics" "Metrics endpoint with Prometheus format" "📊"
```

### During Deployment

```bash
source .trinity/yellowlight/scripts/memory-yellowlight-templates.sh

# Before deploy
yl_deployment_started "blackroad-os-beacon" "railway" "v1.3.0"

# After success
yl_deployment_succeeded "blackroad-os-beacon" "railway" "https://blackroad-os-beacon.railway.app" "v1.3.0" "production"

# Verify health
yl_health_check "blackroad-os-beacon" "https://blackroad-os-beacon.railway.app/health" "120"
```

### Coordinating with Other Services

```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh

# Announce to blackroad-os-web (dashboard team)
gl_coordinate "beacon" "web" "New /metrics endpoint available for dashboard integration"

# Request help from blackroad-os-infra
gl_help_requested "beacon" "Need SIG schema update for new metric types" "medium"
```

---

## Documentation

### Essential Reading
1. **[docs/TRINITY_INTEGRATION.md](docs/TRINITY_INTEGRATION.md)** - Complete integration guide
2. **[.trinity/README.md](.trinity/README.md)** - Trinity system overview
3. **[.trinity/COMPLIANCE_STATUS.md](.trinity/COMPLIANCE_STATUS.md)** - Current compliance status

### Quick References
- **Emoji Dictionary**: `.trinity/greenlight/docs/GREENLIGHT_EMOJI_DICTIONARY.md`
- **Quick Reference**: `.trinity/greenlight/docs/GREENLIGHT_CLAUDE_QUICK_REFERENCE.md`
- **Infrastructure Guide**: `.trinity/yellowlight/docs/YELLOWLIGHT_INFRASTRUCTURE_SYSTEM.md`

---

## Troubleshooting

### "Command not found: gl_*"
**Solution**: Source the templates first
```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh
```

### "Memory system not initialized"
**This is okay!** The memory system (PS-SHA∞) is optional. The templates still work and log events locally. To fully initialize the Codex system:
```bash
source .trinity/yellowlight/scripts/trinity-codex-integration.sh
```

### "Need to see all available functions"
**For GreenLight**:
```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh
show_help
```

**For YellowLight**:
```bash
cat .trinity/yellowlight/scripts/memory-yellowlight-templates.sh | grep "^    yl_" | head -20
```

---

## Examples from Beacon

### Logging a Beacon Polling Cycle

```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh

gl_task_done "beacon-poll" "Polled 15 services: 14 healthy, 1 degraded (blackroad-os-api timeout)" "🔍"
```

### Logging Deploy Record API Call

```bash
source .trinity/greenlight/scripts/memory-greenlight-templates.sh

gl_api_call_logged "beacon" "POST /deploys" "201" "Deploy record for blackroad-os-web v2.1.0"
```

### Infrastructure Health Check

```bash
source .trinity/yellowlight/scripts/memory-yellowlight-templates.sh

yl_health_check "blackroad-os-beacon" "https://blackroad-os-beacon.railway.app/health" "89"
```

---

## Need Help?

- **Questions about templates**: Check `.trinity/*/docs/`
- **Compliance issues**: Run `./scripts/trinity-register.sh`
- **System updates**: Source repo is `blackroad-os/blackroad-os-infra`
- **Report issues**: Create issue in source repo

---

**Built with:** 🌈 Light Trinity v1.0  
**Last Updated:** December 24, 2025  
**Maintained By:** BlackRoad OS Team + All Claude Agents

🚦 **Keep the lights green!** ✨
