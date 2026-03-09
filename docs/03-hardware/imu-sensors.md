---
id: imu-sensors
title: IMU Sensors
sidebar_label: IMU Sensors
---

# IMU Sensors

The 305AP has two ICM-45686 6-axis IMUs (accelerometer + gyroscope), both mounted on the top of the board.

## Hardware

| | IMU 1 | IMU 2 |
|---|---|---|
| Part | ICM-45686 | ICM-45686 |
| Bus | SPI2 | SPI3 |
| CS | PE4 | PA14 |
| SCLK | PD3 | PB3 |
| MOSI | PC1 | PB2 |
| MISO | PC2\_C | PB4 |
| DRDY (INT1) | PE0 | PC15 |
| INT2 | PD4 | PA13 |

## Orientation

Both IMUs are mounted flat on the top of the board, adjacent to each other, with the same physical orientation. No rotation offset is required when the board is mounted flat and forward-facing in the frame.

If the board is mounted at a different angle or orientation, set the rotation in PX4:

- **`IMU_1_ROT`** — rotation for IMU 1
- **`IMU_2_ROT`** — rotation for IMU 2

## Redundancy

PX4 runs sensor voting across both IMUs. If one IMU reports data that diverges significantly from the other, PX4 will flag it and fall back to the healthy sensor. This is logged in flight logs as an IMU voting event.

## Checking IMU Data in QGroundControl

To verify both IMUs are reporting:

1. Open QGC → **Analyze Tools → MAVLink Inspector**
2. Look for `RAW_IMU` and `SCALED_IMU2` messages
3. Both should show non-zero gyro and accelerometer values

Or in the MAVLink Console:

```
listener sensor_accel
listener sensor_gyro
```

Multiple instances (`instance 0` and `instance 1`) confirm both IMUs are active.

## Vibration

The ICM-45686 has a wide measurement range and good vibration immunity, but excessive vibration will degrade EKF performance. Use soft-mount standoffs between the FC and the frame for best results. Review vibration levels post-flight in **QGC → Analyze → Log Files → Vibration**.
