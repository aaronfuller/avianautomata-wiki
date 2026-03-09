---
id: connectors-pinout
title: Connectors & Pinout
sidebar_label: Connectors & Pinout
description: Full pinout reference for the avian automata 305AP flight controller.
---

# Connectors & Pinout

## UARTs

| UART | `ttyS` | Function | TX Pin | RX Pin | RTS | CTS | Notes |
|---|---|---|---|---|---|---|---|
| USART1 | ttyS0 | Motor Telemetry RX | — | PA9 | — | — | SINGLEWIRE + SWAP: physical TX pin (PA9) used as RX. PA10 is CAN1 STB. |
| USART2 | ttyS1 | VTX / TEL3 | PD5 | PD6 | — | — | |
| USART3 | ttyS2 | VTX SBUS / Debug Console | PD8 | — | — | — | TX only. PD9 is RED LED. |
| UART4 | ttyS3 | Telem 1 | PA0 | PA1 | PB14 | PB0 | HW flow control supported (`MAV_0_FLOW_CTRL`). |
| UART5 | ttyS4 | RC Input | PB13 | — | — | — | SINGLEWIRE + SWAP. PB12 is GREEN LED — cannot be used as UART5 RTS. |
| USART6 | ttyS5 | GPS | PC6 | PC7 | — | — | |
| UART7 | ttyS6 | Telem 2 | PE8 | PE7 | PE9 | PE10 | HW flow control enabled by default. |

:::note SINGLEWIRE ports
USART1 and UART5 use single-wire half-duplex mode. The physical TX pin is reconfigured as the RX line via the SWAP setting. Do not wire a normal RX signal to these ports.
:::

## I2C

| Bus | Device | SCL | SDA | Notes |
|---|---|---|---|---|
| I2C1 | MMC5983MA (Mag, internal) | PB8 | PB9 | Internal only |
| I2C2 | External plug | PB10 | PB11 | User-accessible |
| I2C4 | GPS plug | PD12 | PD13 | Paired with USART6 for GPS+compass modules |

## SPI

| Bus | Device | CS | SCLK | MOSI | MISO | INT1 (DRDY) | INT2 |
|---|---|---|---|---|---|---|---|
| SPI1 | BMP581 (Baro) | PD11 | PA5 | PD7 | PA6 | PB15 | — |
| SPI2 | ICM-45686 #1 (IMU) | PE4 | PD3 | PC1 | PC2\_C | PE0 | PD4 |
| SPI3 | ICM-45686 #2 (IMU) | PA14 | PB3 | PB2 | PB4 | PC15 | PA13 |
| SPI4 | External port | PC13, PC14 | PE2 | PE6 | PE13 | — | — |

## CAN

| Port | TX | RX | Enable GPIO | Notes |
|---|---|---|---|---|
| FDCAN1 | PD1 | PD0 | PA10 | STB active-high |
| FDCAN2 | PB6 | PB5 | PE1 | STB active-high |

## PWM Outputs

| Channel | Timer | GPIO | Function |
|---|---|---|---|
| 1 | TIM1 CH1 | PA8 | Motor 1 |
| 2 | TIM1 CH2 | PE11 | Motor 2 |
| 3 | TIM2 CH1 | PA15 | Motor 3 |
| 4 | TIM2 CH3 | PA2 | Motor 4 |
| 5 | TIM3 CH2 | PA7 | Motor 5 |
| 6 | TIM3 CH4 | PB1 | Motor 6 |
| 7 | TIM4 CH2 | PB7 | Motor 7 |
| 8 | TIM4 CH3 | PD14 | Motor 8 |

## LEDs

Active-low: GPIO LOW = ON, GPIO HIGH = OFF.

| Color | GPIO | PX4 Meaning |
|---|---|---|
| Red | PD9 | Error / boot state |
| Green | PB12 | GPS lock / armed state |
| Blue | PE12 | Flight mode indicator |

## Buzzer

| Parameter | Value |
|---|---|
| GPIO | PA3 |
| Timer | TIM5, Channel 4 |

## SD Card (SDMMC1)

| Signal | Pin |
|---|---|
| CMD | PD2 |
| CLK | PC12 |
| DAT0 | PC8 |
| DAT1 | PC9 |
| DAT2 | PC10 |
| DAT3 | PC11 |
| Card Detect | PE3 |

## USB

| Signal | Pin |
|---|---|
| D+ | PA12 |
| D− | PA11 |

Bus-powered. No VBUS detection line. The board cannot detect whether USB power is present.

## ADC / Power Sensing

| Signal | GPIO | ADC Channel | Notes |
|---|---|---|---|
| VSENSE (voltage) | PC4 | ADC1 INP4 | 1:11 resistor divider |
| ASENSE (current) | PC3\_C | ADC3 INP1 | External current sensor required |

## Unconnected (NC) Pins

The following pins are unconnected on this board and safe to ignore:
`PA4`, `PC0`, `PC5`, `PD10`, `PD15`, `PE5`, `PE14`, `PE15`
