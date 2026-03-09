---
id: can-bus
title: CAN Bus
sidebar_label: CAN Bus
---

# CAN Bus

The 305AP has two independent FDCAN ports supporting DroneCAN (formerly UAVCAN v1/v0) peripherals.

## Hardware

| Port | TX | RX | Enable (STB) | Notes |
|---|---|---|---|---|
| FDCAN1 | PD1 | PD0 | PA10 (active-high) | PA10 was repurposed from USART1 — no conflict |
| FDCAN2 | PB6 | PB5 | PE1 (active-high) | |

The STB (standby) pin controls the CAN transceiver. PX4 asserts it high to enable the transceiver.

## Wiring

CAN uses a differential pair. Connect:

- CAN H to CAN H
- CAN L to CAN L
- GND to GND

Use a 120 Ω termination resistor at each **end** of the CAN bus. Most commercial CAN peripherals have a built-in termination resistor that can be enabled via a solder jumper or DIP switch.

:::warning
Do not daisy-chain CAN in a star topology. Run a single bus from the FC to each device in a line, with terminators at the two physical ends only.
:::

## Enabling DroneCAN in PX4

1. In QGC → **Parameters**, set `UAVCAN_ENABLE` = **Sensors Automatic Config (2)** or higher
2. Reboot
3. PX4 will enumerate all DroneCAN devices on the bus and configure them automatically

For FDCAN2, set `UAVCAN_ENABLE` for the second bus (parameter naming depends on PX4 version).

## Common DroneCAN Peripherals

| Device type | Examples |
|---|---|
| ESCs | Myxa, Zubax Kotleta20, Flame |
| GPS | Zubax GNSS, Holybro M9N DroneCAN |
| Airspeed | Zubax Baro, SDP3x via DroneCAN |
| Power monitor | Zubax Power, Pomegranate Systems |

## Troubleshooting

In the MAVLink Console:

```
uavcan status
```

Lists all enumerated DroneCAN nodes with their node IDs and health status.
