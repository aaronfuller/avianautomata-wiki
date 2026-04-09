---
id: usb
title: USB
sidebar_label: USB
---

# USB

## Hardware

The 305ap uses a **USB-C connector** wired as a USB 2.0 Full Speed device.

| Signal | Pin | Notes |
|---|---|---|
| D+ | PA12 | USB OTG FS data+ |
| D− | PA11 | USB OTG FS data− |
| VBUS | 5V_USB_IN | Powers 5 V supply via TPS2116 mux |
| CC1 | — | 5.1 kΩ pulldown to GND |
| CC2 | — | 5.1 kΩ pulldown to GND |

ESD protection is provided by an **ST USBLC6-4SC6**, a very-low-capacitance protector rated for USB 2.0 high-speed interfaces with ~3 pF typical line capacitance.

## USB 2.0 FS Only

This is a **USB 2.0 Full Speed** (12 Mbps) device port. High-speed (480 Mbps) is not supported. For PX4 ground station connectivity and firmware flashing, FS is entirely sufficient.

There is **no USB Power Delivery controller**. The 5.1 kΩ CC pulldown resistors identify the board as a USB sink (UFP), telling the host to supply standard 5 V. No PD negotiation occurs.

## Power Behavior

VBUS from the USB connector feeds the **TPS2116** power mux alongside the onboard 5 V switcher. The mux selects whichever rail is higher and supplies it to the +5V_BOARD net. This means:

- **USB only (no battery):** the board powers from USB. All sensors and peripherals come up normally. PWM outputs may not reach operating voltage.
- **Battery + USB connected:** the onboard 5 V switcher typically wins the mux and powers the board. USB VBUS is present but not driving any load.

There is **no VBUS detection line**. The firmware cannot sense whether USB power is present, so the board behaves identically regardless of USB connection state.

## Connecting to QGroundControl

1. Connect the 305ap to a host PC via a USB-C cable that supports data (not charge-only)
2. QGroundControl will detect the board automatically and show a green link indicator
3. On Linux: `sudo usermod -aG dialout $USER` (then log out and back in) to allow non-root USB access

## Firmware Flashing

USB is used for both DFU (bootloader) and QGC over-the-air firmware flashing. See [Flashing](../firmware/flashing) for details.

## MAVLink over USB

The USB port exposes a serial device (`/dev/ttyACM0` on Linux, COM port on Windows) that carries MAVLink. QGC connects to this automatically. The default MAVLink instance on USB is separate from the telemetry radios on UART4/UART7.
