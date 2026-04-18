---
id: qgc-setup
title: QGroundControl Setup
sidebar_label: QGroundControl Setup
---

# QGroundControl Setup

[QGroundControl](https://qgroundcontrol.com) (QGC) is the recommended ground station application for configuring and operating the 305ap.

## Connecting

Connect the board via USB. QGC will detect it automatically and show a green connected indicator in the toolbar. If it does not connect:

- Ensure firmware is flashed (see [Flashing](../firmware/flashing))
- Check that the USB cable supports data (not charge-only)
- On Linux, add your user to the `dialout` group: `sudo usermod -aG dialout $USER`

## Vehicle Setup Wizard

After connecting for the first time, complete the setup wizard in order:

### 1. Airframe

Select your vehicle type and the closest matching airframe. For a custom build, choose the generic frame for your vehicle type (e.g. **Generic Quadcopter X** for a quad).

Reboot after changing airframe. This resets PID gains and mixer to defaults for that frame.

### 2. Sensors

Calibrate all sensors before flying. Follow the on-screen instructions:

| Calibration | Notes |
|---|---|
| Accelerometer | Hold the board in each of 6 orientations as prompted |
| Gyroscope | Keep the board completely still on a flat surface |
| Compass | Rotate the board in all axes as prompted |
| Level Horizon | Place the board level, then calibrate |

:::note IMU orientation
Both IMU slots are mounted flat on the top of the board with the same orientation, regardless of which part is populated (LSM6DSV or ICM-45686). No rotation offset is needed if the board is mounted flat and forward-facing.
:::

### 3. Radio

With your RC receiver connected and bound to your transmitter:

1. Click **Calibrate** and follow the prompts
2. Move all sticks and switches to their extremes
3. Confirm channel assignments (throttle, roll, pitch, yaw)

### 4. Flight Modes

Assign your transmitter switches to flight modes. At minimum configure:
- **Manual / Stabilized** for direct control
- **Position** for GPS-assisted flight (requires GPS lock)
- **Return** for RTL failsafe

### 5. Power

Configure battery monitoring:

| Parameter | Value for 305ap |
|---|---|
| Number of cells | Match your battery |
| Full voltage (per cell) | 4.20 V (LiPo) |
| Empty voltage (per cell) | 3.50 V (LiPo) |
| Voltage divider | Calibrate against a multimeter reading |
| Amps per volt | Set per your external current sensor datasheet |

:::note No onboard current shunt
The 305ap requires an external current sensor. If no sensor is connected, current and consumed mAh will not be reported.
:::

## Key Parameters

Access parameters via **Vehicle Setup → Parameters**. Useful ones to know:

| Parameter | Description |
|---|---|
| `SER_UART4_FUNC` | Function assigned to Telem 1 (UART4) |
| `SER_UART7_FUNC` | Function assigned to Telem 2 (UART7) |
| `MAV_0_FLOW_CTRL` | Hardware flow control for MAVLink instance 0 |
| `COM_ARM_SWSBTN` | Arming behavior without a safety switch |
| `EKF2_MAG_TYPE` | Magnetometer fusion mode |
| `DSHOT_CONFIG` | DSHOT protocol selection for ESCs |
