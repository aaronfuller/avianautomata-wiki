---
id: power-system
title: Power System
sidebar_label: Power System
---

# Power System

## Architecture

The 305AP has a simple always-on power architecture. There are no power enable/disable GPIOs — all sensors, peripherals, and logic are powered whenever the board receives power. This eliminates firmware complexity around power sequencing.

## Voltage Sensing

| Signal | GPIO | ADC | Divider Ratio |
|---|---|---|---|
| VSENSE (battery voltage) | PC4 | ADC1 INP4 | 1:11 (10kΩ / 1kΩ) |

The 1:11 divider means a 16.8 V battery reads as ~1.527 V at the ADC pin. PX4 applies the inverse of this ratio to compute the actual battery voltage.

**Voltage divider parameter:** `BAT1_V_DIV` — set to `11.0` for the 305AP.

## Current Sensing

| Signal | GPIO | ADC |
|---|---|---|
| ASENSE (current input) | PC3\_C | ADC3 INP1 |

The 305AP does **not** have an onboard current shunt or hall-effect sensor. The ASENSE pin accepts a 0–3.3 V analog signal from an external current sensor (e.g. from a power module or ESC with current output).

**Current sensor parameter:** `BAT1_A_PER_V` — set per your sensor's datasheet (amps per volt).

:::note No current data without external sensor
If nothing is connected to the current sense input, `BAT1_A_PER_V` should be set to `0` to prevent false current readings.
:::

## USB Power

The board is bus-powered over USB. There is no VBUS detection line — the firmware cannot detect whether USB power is present or absent. The board behaves the same whether powered from USB alone or from a battery while USB is connected.

## Power Recommendations

- Use a regulated power module between the battery and the FC's power input
- The onboard 3.3 V regulator supplies all logic, sensors, and peripherals
- No power sequencing is required
