---
id: intro
title: 305AP Documentation
sidebar_label: Introduction
slug: /intro
---

# avian automata 305AP

The 305AP is a compact, high-performance flight controller designed for multirotor, fixed-wing, and rover platforms. It runs [PX4](https://px4.io) on NuttX RTOS and is built around the STM32H743VIH6 microcontroller.

## Quick Links

| I want to... | Go to |
|---|---|
| Flash firmware for the first time | [Firmware → Flashing](firmware/flashing) |
| See the connector pinout | [Hardware → Connectors & Pinout](hardware/connectors-pinout) |
| Set up QGroundControl | [Configuration → QGroundControl Setup](configuration/qgc-setup) |
| Build firmware from source | [Firmware → Building from Source](firmware/building-from-source) |
| Troubleshoot a problem | [Troubleshooting → Common Issues](troubleshooting/common-issues) |

## Key Specifications

| Parameter | Value |
|---|---|
| MCU | STM32H743VIH6 (TFBGA100) |
| Flash | 2 MB |
| RAM | 1 MB |
| Clock | 24 MHz HSE, 480 MHz core |
| IMUs | 2× ICM-45686 (SPI) |
| Barometer | BMP581 (SPI) |
| Magnetometer | MMC5983MA (I2C) |
| UARTs | 7 (USART1/2/3, UART4/5/6/7) |
| CAN | Dual FDCAN (FDCAN1, FDCAN2) |
| PWM Outputs | 8 |
| USB | OTG HS, internal FS PHY |
| SD Card | SDMMC1 |
| Firmware | PX4 (`avianautomata_305ap`) |
