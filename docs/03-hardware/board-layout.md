---
id: board-layout
title: Board Layout
sidebar_label: Board Layout
---

# Board Layout

## Form Factor

The 305ap uses a **30.5 mm × 30.5 mm** mounting pattern, matching standard 30.5 mm stack flight controllers. It is compatible with most 5" and larger freestyle/racing frames as well as custom mounts.

## Connector Placement

The 305ap connector layout is designed for clean wire routing in a typical FPV stack:

| Connector | Location | Function |
|---|---|---|
| USB-C | Side edge | USB 2.0 FS programming and GCS connection |
| Motors | Bottom | 8× PWM/DSHOT outputs + ESC telemetry + current sense |
| TELEM1 | Side/top | 6-pin JST-GH, UART4 with CTS/RTS |
| TELEM2 | Side/top | 6-pin JST-GH, UART7 with CTS/RTS |
| GPS | Side | 6-pin JST-GH, USART6 + I2C4 |
| CAN1 | Side | 4-pin JST-GH, FDCAN1 |
| CAN2 | Side | 4-pin JST-GH, FDCAN2 |
| RC IN | Side | 3-pin, single-wire (SBUS/CRSF/PPM) |
| VTX | Side | 6-pin JST-GH, 9 V + UART2 + SBUS out |
| External I2C | Side | 4-pin JST-GH |
| External SPI | Side | 7-pin JST-GH |
| microSD | Bottom | Push-push slot, card detect supported |

## Top Side

- STM32H743VIH6 MCU (TFBGA100)
- 2× ICM-45686 IMUs (SPI, adjacent, same orientation)
- BMP581 barometer (SPI)
- MMC5983MA magnetometer (I2C, internal)
- SIT1044T CAN transceivers
- Status LEDs (red, green, blue)
- BOOT and RESET buttons

## Bottom Side

- Power components (AP63357 buck converters, LM74700-Q1, TPS2116, RT9193 LDO)
- RGB LED
- Motor output connector (U21)
- Voltage/current sense frontend (TLV9002)
- SMAJ30CA TVS, AON7246E FET
- microSD slot

## Mounting

The 305ap uses the standard 30.5 mm × 30.5 mm M3 hole pattern. Mounting holes have a **3 mm clearance diameter** and accept fasteners with heads up to **6 mm across**. The mounting holes are **electrically connected to GND** — use nylon standoffs or insulating washers if GND continuity to the frame is not desired.

The board is a single-MCU architecture with no FMU/I/O split. All outputs and peripherals are driven directly by the STM32H743.

### Fastener selection

Connectors are densely packed near the board edges, leaving little room to access or torque fasteners from above. Hex-socket bolt heads (like M3 cap screws) are awkward to reach with an Allen key in this layout. Preferred options:

- **Screw-style fastener heads** (slotted or Phillips M3 screws) — a screwdriver accesses the head from above without needing the lateral clearance that an Allen key requires
- **Rubber anti-vibration standoffs** — the raised profile lifts a bolt head above the board surface and clear of the surrounding connectors, providing enough room to tighten

:::tip Vibration isolation
Soft-mount the FC using rubber standoffs (M3 anti-vibration grommets) for best IMU performance. The ICM-45686 IMUs have good vibration immunity, but excessive airframe resonance will still degrade EKF2 estimation.
:::

## Buttons

| Button | Function |
|---|---|
| BOOT | Hold at power-on to enter DFU bootloader mode |
| RESET | Hard reset the MCU |

To enter DFU mode for flashing: hold BOOT, apply power (or press RESET while powered), then release BOOT. The board will enumerate as a DFU device over USB.

## LEDs

See [Troubleshooting → LED Status](../troubleshooting/led-status) for a full LED code reference.

| LED | GPIO | PX4 Function |
|---|---|---|
| Red | PD9 | Errors, boot state |
| Green | PB12 | GPS lock, armed state |
| Blue | PE12 | Flight mode indicator |
| RGB | — | Full status (arming, modes, errors) |

Active-low: GPIO LOW = LED on.
