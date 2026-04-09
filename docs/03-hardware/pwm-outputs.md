---
id: pwm-outputs
title: PWM Outputs
sidebar_label: PWM Outputs
---

# PWM Outputs

## Hardware

The 305ap provides 8 PWM/DSHOT motor outputs routed to the motor connector.

| Channel | Timer | GPIO | Default |
|---|---|---|---|
| 1 | TIM1 CH1 | PA8 | Motor 1 |
| 2 | TIM1 CH2 | PE11 | Motor 2 |
| 3 | TIM2 CH1 | PA15 | Motor 3 |
| 4 | TIM2 CH3 | PA2 | Motor 4 |
| 5 | TIM3 CH2 | PA7 | Motor 5 |
| 6 | TIM3 CH4 | PB1 | Motor 6 |
| 7 | TIM4 CH2 | PB7 | Motor 7 |
| 8 | TIM4 CH3 | PD14 | Motor 8 |

Outputs 1–4 share TIM1/TIM2 and outputs 5–8 share TIM3/TIM4. Within each timer, all channels share the same timer frequency (period), so protocols must be compatible within a timer group if mixing is required.

## Motor Connector

The motor connector also carries:
- **+5 V** for ESC BEC and signal power
- **Current sense input** for ESC current monitoring, fed to ASENSE
- **Motor telemetry RX** via USART1 single-wire ESC telemetry (BLHeli32/AM32)
- **GND**

## Supported Protocols

The 305ap supports all standard PX4 output protocols:

| Protocol | Description | Notes |
|---|---|---|
| PWM | Standard 1000–2000 µs | Universal ESC compatibility |
| OneShot125 | ~125–250 µs (8× faster than PWM) | Requires ESC support |
| DSHOT150 | Digital, 150 kbps | Recommended baseline |
| DSHOT300 | Digital, 300 kbps | Typical default for modern ESCs |
| DSHOT600 | Digital, 600 kbps | High-speed DSHOT |
| DSHOT1200 | Digital, 1200 kbps | Fastest DSHOT |

DSHOT is recommended over PWM for most applications. It is noise-immune, bidirectional with BDSHOT support, and eliminates calibration.

## Configuring Protocol in QGroundControl

1. Go to **Vehicle Setup → Actuators**
2. Select the output protocol for each motor group
3. For DSHOT, set the appropriate speed under **DSHOT_CONFIG**

Or set directly in **Parameters**:

| Parameter | Description |
|---|---|
| `DSHOT_CONFIG` | DSHOT speed: 0=disabled, 150/300/600/1200 |
| `PWM_MAIN_RATE` | PWM update rate in Hz (if using standard PWM) |

## Motor Order

PX4 uses a fixed motor numbering convention for common airframe types. For a **quadcopter in X configuration**:

```
   Front
  1   2
  4   3
```

- Motor 1: front-left, counter-clockwise
- Motor 2: front-right, clockwise
- Motor 3: rear-right, counter-clockwise
- Motor 4: rear-left, clockwise

Verify motor order in **Vehicle Setup → Actuators → Motor Testing** before flying.

## Bidirectional DSHOT (BDSHOT)

BDSHOT allows the FC to receive RPM telemetry directly over the signal wire without separate ESC telemetry wiring. To enable:

1. Set `DSHOT_CONFIG` to a supported speed (300 or 600 recommended)
2. Set `MOT_POLE_COUNT` to match your motors
3. RPM data will appear in `esc_status` and be used by the RPM-based notch filter

:::note ESC DSHOT support
Verify your ESCs support the selected DSHOT speed. BLHeli32, AM32, and most modern 4-in-1 ESCs support DSHOT300/DSHOT600.
:::

## ESC Telemetry

USART1 (ttyS0) is dedicated to **single-wire ESC serial telemetry** from BLHeli32 or AM32 ESCs. This is separate from BDSHOT and provides temperature, voltage, current, and RPM data per ESC.

To enable, configure your ESC firmware to output serial telemetry and connect the telemetry wire to the USART1 pin (PA9) on the motor connector.

**PX4 parameter:** `SER_UART1_FUNC` = `ESC Telemetry (10)`
