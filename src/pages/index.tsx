import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

interface ProductCardProps {
  name: string;
  description: string;
  to: string;
  tags: string[];
}

function ProductCard({ name, description, to, tags }: ProductCardProps) {
  return (
    <div className={styles.productCard}>
      <div className={styles.productCardContent}>
        <Heading as="h3">{name}</Heading>
        <p>{description}</p>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      </div>
      <div className={styles.productCardFooter}>
        <Link className="button button--primary button--md" to={to}>
          View Docs
        </Link>
      </div>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="avian automata product documentation">
      <header className={styles.hero}>
        <div className="container">
          <Heading as="h1">avian automata Wiki</Heading>
          <p className={styles.heroSubtitle}>
            Technical documentation for avian automata hardware and firmware.
          </p>
        </div>
      </header>
      <main className="container margin-vert--xl">
        <Heading as="h2">Products</Heading>
        <div className={styles.productGrid}>
          <ProductCard
            name="305AP Flight Controller"
            description="High-performance PX4 flight controller based on the STM32H743VIH6. Dual ICM-45686 IMUs, BMP581 baro, MMC5983MA mag, dual CAN, 8 PWM outputs."
            to="/305ap/intro"
            tags={['PX4', 'STM32H7', 'FDCAN', 'DSHOT']}
          />
        </div>
      </main>
    </Layout>
  );
}
