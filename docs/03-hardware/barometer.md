---
id: barometer
title: Barometer
sidebar_label: Barometer
---

# Barometer

## Hardware

The 305ap uses a **Bosch BMP581** barometric pressure sensor connected over SPI.

| Parameter | Value |
|---|---|
| Part | Bosch BMP581 |
| Bus | SPI1 |
| CS | PD11 |
| SCLK | PA5 |
| MOSI | PD7 |
| MISO | PA6 |
| DRDY (INT) | PB15 |
| Power supply | 3.3 V LDO (quiet rail) |

## Sensor Specifications

| Specification | Value |
|---|---|
| Pressure range | 30–125 kPa |
| Resolution | 24-bit |
| RMS noise (native) | < 0.1 Pa |
| Temperature range | −40 to +85 °C |
| Output data rate | Configurable |

The BMP581 is a modern barometer with significantly lower noise floor than older sensors like the BMP280 or MS5611. The < 0.1 Pa native noise equates to sub-centimeter altitude resolution in ideal conditions.

## Supply Isolation

The BMP581 is powered from the quiet 3.3 V LDO rail (RT9193), which is fed through a ferrite bead from the 5 V rail and isolated from the main 3.3 V digital switcher. This reduces switching noise on the sensor's analog supply and improves altitude hold stability.

## PX4 Integration

PX4 uses the barometer for:
- Altitude estimation (BARO_MODE in EKF2)
- Vertical velocity estimation in BARO-only modes
- Failsafe altitude hold when GPS is unavailable

The barometer is initialized automatically. No configuration is typically needed unless you need to change the fusion mode.

**Relevant PX4 parameters:**

| Parameter | Description |
|---|---|
| `EKF2_BARO_CTRL` | Enable/disable barometer in EKF2 |
| `EKF2_BARO_NOISE` | Expected baro measurement noise (Pa) |
| `EKF2_GND_EFF_DZ` | Ground effect deadzone for baro correction |

## Calibration

The BMP581 does not require manual calibration. It includes an onboard temperature compensation circuit. For best results:

- Keep the board away from motor heat and exhaust airflow
- If using a case or enclosure, ensure the barometer port is vented to ambient air
- Avoid direct sunlight on the sensor during flight, which can cause thermal drift

## Verifying Baro Data

In the MAVLink Console:

```
listener sensor_baro
```

You should see pressure and temperature values updating at the configured ODR. Altitude can be cross-checked against a known elevation.
