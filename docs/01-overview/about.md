---
id: about
title: About the 305AP
sidebar_label: About
---

# About the 305AP

The 305AP is a compact flight controller designed and manufactured by avian automata for multirotor, fixed-wing, and rover platforms running [PX4](https://px4.io).

## Design Goals

- **High sensor redundancy** — dual ICM-45686 IMUs allow PX4 to cross-check and fall back if one sensor reports anomalies
- **Full connectivity** — dual FDCAN, 8 PWM outputs, 7 UARTs, and an external SPI port cover virtually any peripheral combination
- **Clean power architecture** — no enable/disable GPIOs; everything is always powered, reducing firmware complexity

## What It Is Not

The 305AP does not include:

- An onboard current shunt — an external current sensor is required for current monitoring
- A safety/arm switch or button
- A heater
- Hardware version sensing
- An FRAM chip — parameters are stored on the SD card at `/fs/microsd/params`

## MCU Package Note

The 305AP uses the STM32H743VIH6 in the TFBGA100 package. This package exposes GPIO ports A through E only (no ports F–K). All pin assignments reflect this constraint.
