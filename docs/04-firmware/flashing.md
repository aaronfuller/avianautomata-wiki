---
id: flashing
title: Flashing Firmware
sidebar_label: Flashing
---

# Flashing Firmware

## Via QGroundControl (Recommended)

1. Connect the 305AP to your PC via USB.
2. Open QGroundControl.
3. Go to **Vehicle Setup → Firmware**.
4. Select **PX4 Flight Stack** and choose the stable release.
5. QGroundControl will detect the board and flash automatically.

:::tip
If QGroundControl does not detect the board, try entering DFU mode manually (see below).
:::

## Via DFU (dfu-util)

### Enter DFU Mode

The 305AP has no dedicated DFU button. To enter DFU mode:

1. Locate the **BOOT0** pin/pad on the board.
2. Hold BOOT0 high (connect to 3.3V) while applying power or pressing NRST.
3. The board will enumerate as an STM32 DFU device.

### Flash with dfu-util

```bash
# Install dfu-util if needed
sudo apt install dfu-util    # Debian/Ubuntu
brew install dfu-util        # macOS

# Flash PX4 firmware
dfu-util -a 0 -s 0x08020000:leave -D avianautomata_305ap_default.bin
```

:::note Flash address
`0x08020000` is the PX4 application start address — sector 1, immediately after the 128 KB bootloader reservation.
:::

### Flash via STM32CubeProgrammer

1. Enter DFU mode as above.
2. Open STM32CubeProgrammer.
3. Select **USB** interface and connect.
4. Set start address to `0x08020000`.
5. Browse to the `.bin` file and click **Start Programming**.

## Via PX4 Bootloader (USB or Serial)

If the PX4 bootloader is already installed:

1. Power cycle the board — the bootloader waits 5 seconds for an upload request.
2. Use QGroundControl or `px_uploader.py` to upload within that window.

```bash
python3 Tools/px_uploader.py --port /dev/ttyACM0 build/avianautomata_305ap_default/avianautomata_305ap_default.px4
```

## Flashing the Bootloader

If you need to re-flash the PX4 bootloader itself:

```bash
dfu-util -a 0 -s 0x08000000:leave -D avianautomata_305ap_bootloader.bin
```

The bootloader occupies sector 0 (`0x08000000`–`0x0801FFFF`, 128 KB). Flashing PX4 firmware does not overwrite the bootloader.
