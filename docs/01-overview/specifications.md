---
id: specifications
title: Specifications
sidebar_label: Specifications
---

# Specifications

## Processor

| Parameter | Value |
|---|---|
| MCU | STM32H743VIH6 |
| Package | TFBGA100 |
| Core | Cortex-M7, 480 MHz |
| Flash | 2 MB (dual-bank) |
| RAM | 1 MB (AXI SRAM + TCM + D2/D3) |
| Crystal | 24 MHz HSE |

## Sensors

| Sensor | Type | Interface |
|---|---|---|
| ICM-45686 (×2) | 6-axis IMU (accel + gyro) | SPI2, SPI3 |
| BMP581 | Barometer | SPI1 |
| MMC5983MA | 3-axis Magnetometer | I2C1 |

## Connectivity

| Interface | Count | Notes |
|---|---|---|
| UARTs | 7 | USART1/2/3, UART4/5/6/7 |
| I2C | 3 | I2C1 (mag), I2C2 (external), I2C4 (GPS) |
| SPI | 4 | SPI1–4 (3 internal sensors + 1 external) |
| CAN | 2 | FDCAN1, FDCAN2 |
| USB | 1 | OTG HS, internal FS PHY |
| SD Card | 1 | SDMMC1 |
| PWM Outputs | 8 | 4× TIM1/2 + 2× TIM3 + 2× TIM4 |

## Power

| Parameter | Value |
|---|---|
| Power architecture | Always-on (no power enable GPIOs) |
| Voltage sensing | PC4 / ADC1 INP4, 1:11 divider |
| Current sensing | PC3\_C / ADC3 INP1, external sensor required |
| USB | Bus-powered, no VBUS detection |

## Mechanical

| Parameter | Value |
|---|---|
| No heater | — |
| No arm/safety switch | — |
| No hardware revision sensing | — |
| No trace connector | — |
| Bootloader reserved | 128 KB (sector 0) |
| PX4 firmware space | 1920 KB (sectors 1–15) |
