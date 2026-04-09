import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

interface SectionCardProps {
  title: string;
  description: string;
  to: string;
}

function SectionCard({ title, description, to }: SectionCardProps) {
  return (
    <Link to={to} className={styles.card}>
      <div className={styles.cardBody}>
        <div className={styles.cardTitle}>{title}</div>
        <div className={styles.cardDescription}>{description}</div>
      </div>
      <div className={styles.cardArrow}>→</div>
    </Link>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout title="Documentation" description="avian automata product documentation">
      <div className={styles.hero}>
        <div className="container">
          <div className={styles.heroLabel}>305ap Flight Controller</div>
          <h1 className={styles.heroTitle}>avian automata docs</h1>
          <p className={styles.heroSubtitle}>
            Everything you need to set up, configure, and fly the 305ap.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.grid}>
          <SectionCard
            title="Getting Started"
            description="Quickstart guide, firmware install, and first flight checklist."
            to="/305ap/getting-started/quickstart"
          />
          <SectionCard
            title="Connectors & Pinout"
            description="Full pinout tables for every port — UARTs, SPI, I2C, CAN, PWM, and power."
            to="/305ap/hardware/connectors-pinout"
          />
          <SectionCard
            title="Flashing Firmware"
            description="Flash PX4 via QGroundControl, DFU, or the PX4 bootloader."
            to="/305ap/firmware/flashing"
          />
          <SectionCard
            title="RC Setup"
            description="Configure SBUS, CRSF, and ELRS receivers on the 305ap."
            to="/305ap/configuration/rc-setup"
          />
          <SectionCard
            title="Hardware Reference"
            description="IMUs, barometer, magnetometer, CANBUS, PWM outputs, and more."
            to="/305ap/hardware/board-layout"
          />
          <SectionCard
            title="Configuration"
            description="QGroundControl setup, sensor calibration, ESC config, and telemetry."
            to="/305ap/configuration/qgc-setup"
          />
          <SectionCard
            title="Building from Source"
            description="Clone PX4, build the avianautomata_305ap target, and upload."
            to="/305ap/firmware/building-from-source"
          />
          <SectionCard
            title="Troubleshooting"
            description="LED status codes, common issues, and log analysis."
            to="/305ap/troubleshooting/common-issues"
          />
        </div>
      </div>
    </Layout>
  );
}
