---
id: uarts
title: UARTs
sidebar_label: UARTs
---

# UARTs

The 305AP exposes 7 hardware UARTs. Each maps to a NuttX `ttyS` device and a PX4 serial port name.

## Port Map

| UART | `ttyS` | PX4 Port | Default Function | Baud |
|---|---|---|---|---|
| USART1 | ttyS0 | — | Motor Telemetry RX | 57600 |
| USART2 | ttyS1 | TEL3 | VTX | 57600 |
| USART3 | ttyS2 | — | VTX SBUS output | — |
| UART4 | ttyS3 | TEL1 | Telemetry 1 / MAVLink | 57600 |
| UART5 | ttyS4 | RC | RC Input | — |
| USART6 | ttyS5 | GPS1 | GPS | Auto |
| UART7 | ttyS6 | TEL2 | Telemetry 2 | 57600 |

## Port Details

### USART1 — Motor Telemetry RX (ttyS0)

**Mode:** SINGLEWIRE + SWAP

The physical TX pin (PA9) is reconfigured as the RX line. This is a receive-only port used to collect ESC telemetry (e.g. BLHeli32/AM32 serial telemetry).

- RX pin: PA9
- PA10 is repurposed as the FDCAN1 standby (STB) enable — it is **not** available as USART1 RX/TX

### USART2 — VTX / TEL3 (ttyS1)

Standard full-duplex UART. Assigned as TEL3 by default.

- TX: PD5, RX: PD6

### USART3 — VTX SBUS / Debug Console (ttyS2)

TX-only port. PD9 (the red LED) occupies the physical RX pin position, so no RX is possible.

- TX: PD8
- Used as the NuttX debug console (boot messages appear here)
- Can output SBUS to a VTX/OSD if reconfigured

### UART4 — Telem 1 (ttyS3)

Primary telemetry port. Supports hardware flow control.

- TX: PA0, RX: PA1
- RTS: PB14, CTS: PB0
- Hardware flow control can be toggled from QGroundControl via **`MAV_0_FLOW_CTRL`** (no rebuild required)

### UART5 — RC Input (ttyS4)

**Mode:** SINGLEWIRE + SWAP

Single-wire half-duplex RC input port. The physical TX pin (PB13) is the signal line. PB12 is the green LED and is not available.

- Signal pin: PB13
- Supports SBUS (inverted), CRSF, and other single-wire protocols via PX4's RC driver

:::tip CRSF/ELRS on Telem 1
For CRSF/ELRS receivers that need a full-duplex UART, connect to **UART4 (Telem 1)** instead and set `SER_UART4_FUNC = RC Input (13)` in QGroundControl.
:::

### USART6 — GPS (ttyS5)

Standard full-duplex UART. Paired with I2C4 on the GPS connector for combined GPS+compass modules.

- TX: PC6, RX: PC7
- I2C4 (PD12/PD13) shares the same connector

### UART7 — Telem 2 (ttyS6)

Secondary telemetry port with hardware flow control enabled by default. Intended for companion computers.

- TX: PE8, RX: PE7
- RTS: PE9, CTS: PE10

## Changing Port Functions

Port functions are configurable from QGroundControl without a firmware rebuild:

1. Go to **Vehicle Setup → Parameters**
2. Search for `SER_` to find serial port assignments
3. Change the function (e.g. set `SER_UART4_FUNC` to `RC Input` for CRSF on Telem 1)
4. Reboot — additional parameters for that function will appear
