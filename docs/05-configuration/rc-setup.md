---
id: rc-setup
title: RC Setup
sidebar_label: RC Setup
---

# RC Setup

The 305AP supports several RC protocols. Which port and protocol you use depends on your receiver type.

## Option A — SBUS / Single-Wire Protocols (RC IN port)

**Port:** UART5 (ttyS4) — labeled **RC IN**

UART5 is configured as a single-wire half-duplex port. The signal line is PB13. Connect your receiver's SBUS output directly to this pin.

This port works with:
- SBUS (e.g. FrSky, Futaba)
- DSM/DSMX (via spektrum satellite adapter)
- Single-wire PPM

No QGC configuration is needed — the RC driver activates on this port automatically.

## Option B — CRSF / ELRS (Telem 1 port)

**Port:** UART4 (ttyS3) — labeled **Telem 1**

CRSF and ELRS require a full-duplex UART. Connect your receiver's TX to the FC's RX (PA1) and the receiver's RX to the FC's TX (PA0).

### Configuration in QGroundControl

1. Go to **Vehicle Setup → Parameters**
2. Set `SER_UART4_FUNC` = **RC Input (13)**
3. Reboot the flight controller
4. Set `RC_INPUT_PROTO` = **CRSF (5)**
5. Reboot again

The baud rate for CRSF (420000) is set automatically by the RC driver.

:::tip ELRS
ExpressLRS receivers use CRSF protocol. The setup is identical to CRSF above.
:::

## Option C — CRSF / ELRS (Telem 2 port)

**Port:** UART7 (ttyS6) — labeled **Telem 2**

Same procedure as Option B but set `SER_UART7_FUNC` = **RC Input (13)** instead.

## Verifying RC Input

In the MAVLink Console (QGC → Analyze Tools → MAVLink Console):

```
listener input_rc
```

This prints raw RC channel values. Confirm all channels respond correctly to stick movements.

## Flight Mode Assignment

After RC calibration in QGC, assign a switch to flight modes:

1. **Vehicle Setup → Flight Modes**
2. Assign the mode channel to your desired switch
3. Configure at least: Stabilized, Position, Return
