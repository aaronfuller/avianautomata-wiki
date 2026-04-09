import React, { useState } from 'react';
import styles from './styles.module.css';

const ONBOARD_MW = 825;
const ETA = 0.87;

const PORTS_5V = [
  { key: 'telem1',  label: 'TELEM 1',       recommended: 500,  max: 1000 },
  { key: 'telem2',  label: 'TELEM 2',       recommended: 500,  max: 1000 },
  { key: 'gps',     label: 'GPS',           recommended: 300,  max: 1000 },
  { key: 'can1',    label: 'CAN 1',         recommended: 500,  max: 1000 },
  { key: 'can2',    label: 'CAN 2',         recommended: 500,  max: 1000 },
  { key: 'i2c',     label: 'External I2C',  recommended: 300,  max: 1000 },
  { key: 'spi',     label: 'External SPI',  recommended: 400,  max: 1000 },
  { key: 'rc',      label: 'RC IN',         recommended: 250,  max: 1000 },
  { key: 'motors',  label: 'Motors (5V)',   recommended: 250,  max: 1000 },
];

const RAIL_5V = { recommended: 1500, max: 2000, ceiling: 2500 };
const RAIL_9V = { recommended: 800,  max: 1000, ceiling: 1000 };

const CELLS: { label: string; voltage: number }[] = [
  { label: '2S', voltage: 7.4  },
  { label: '3S', voltage: 11.1 },
  { label: '4S', voltage: 14.8 },
  { label: '5S', voltage: 18.5 },
  { label: '6S', voltage: 22.2 },
];

function status(value: number, recommended: number, max: number): 'ok' | 'warn' | 'over' {
  if (value <= recommended) return 'ok';
  if (value <= max) return 'warn';
  return 'over';
}

function StatusBadge({ s }: { s: 'ok' | 'warn' | 'over' }) {
  const map = { ok: ['OK', styles.statusOk], warn: ['Approaching maximum', styles.statusWarn], over: ['Over limit', styles.statusOver] };
  const [text, cls] = map[s];
  return <span className={`${styles.statusBadge} ${cls}`}>{text}</span>;
}

function Meter({ value, recommended, max, ceiling, unit = 'mA' }: {
  value: number; recommended: number; max: number; ceiling: number; unit?: string;
}) {
  const fillPct = Math.min(value / ceiling, 1) * 100;
  const recPct  = (recommended / ceiling) * 100;
  const maxPct  = (max / ceiling) * 100;
  const s = status(value, recommended, max);
  return (
    <div className={styles.meter}>
      <div className={styles.meterTrack}>
        <div className={`${styles.meterFill} ${styles[`fill_${s}`]}`} style={{ width: `${fillPct}%` }} />
        <div className={styles.tick} style={{ left: `${recPct}%` }} />
        <div className={`${styles.tick} ${styles.tickMax}`} style={{ left: `${maxPct}%` }} />
      </div>
      <div className={styles.meterLabels}>
        <span className={styles.meterVal}>
          {value} {unit} <StatusBadge s={s} />
        </span>
        <span className={styles.meterLimits}>rec {recommended} / max {max} {unit}</span>
      </div>
    </div>
  );
}

function PortRow({ label, value, recommended, max, portVoltage, onChange }: {
  label: string; value: number; recommended: number; max: number; portVoltage: number;
  onChange: (v: number) => void;
}) {
  const s = status(value, recommended, max);
  const watts = (value * portVoltage / 1000);

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value, 10);
    if (!isNaN(n)) onChange(Math.min(Math.max(n, 0), max));
  };

  return (
    <div className={styles.portRow}>
      <span className={styles.portLabel}>{label}</span>
      <input
        type="range" min={0} max={max} step={10} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className={`${styles.slider} ${styles[`slider_${s}`]}`}
      />
      <input
        type="number" min={0} max={max} step={10} value={value}
        onChange={handleText}
        className={`${styles.numInput} ${styles[`num_${s}`]}`}
      />
      <span className={styles.portMa}>mA</span>
      <span className={`${styles.portWatts} ${value > 0 ? styles.portWattsActive : ''}`}>
        {watts > 0 ? `${watts.toFixed(2)} W` : '—'}
      </span>
    </div>
  );
}

export default function PowerBudgetCalculator() {
  const [vals5V, setVals5V] = useState<Record<string, number>>(
    Object.fromEntries(PORTS_5V.map(p => [p.key, 0]))
  );
  const [vtx, setVtx] = useState(0);
  const [selectedCell, setSelectedCell] = useState('4S');

  const total5V   = Object.values(vals5V).reduce((a, b) => a + b, 0);
  const totalPower = ONBOARD_MW + total5V * 5 + vtx * 9;

  const s5V = status(total5V, RAIL_5V.recommended, RAIL_5V.max);
  const s9V = status(vtx, RAIL_9V.recommended, RAIL_9V.max);

  const ibatFor = (v: number) => totalPower / (v * ETA * 1000);

  return (
    <div className={styles.calc}>
      <div className={styles.columns}>

        {/* 5V ports */}
        <div className={styles.col}>
          <div className={styles.colHead}>
            <span>5V ports</span>
            <span className={styles.colHeadRight}>current &nbsp;·&nbsp; power</span>
          </div>
          {PORTS_5V.map(p => (
            <PortRow
              key={p.key}
              label={p.label}
              value={vals5V[p.key]}
              recommended={p.recommended}
              max={p.max}
              portVoltage={5}
              onChange={v => setVals5V(prev => ({ ...prev, [p.key]: v }))}
            />
          ))}
        </div>

        {/* 9V + summary */}
        <div className={styles.col}>
          <div className={styles.colHead}>
            <span>9V port</span>
            <span className={styles.colHeadRight}>current &nbsp;·&nbsp; power</span>
          </div>
          <PortRow
            label="VTX"
            value={vtx}
            recommended={RAIL_9V.recommended}
            max={RAIL_9V.ceiling}
            portVoltage={9}
            onChange={setVtx}
          />

          <div className={styles.colHead} style={{ marginTop: '1.25rem' }}>
            <span>Power summary</span>
          </div>
          <div className={styles.summary}>
            <div className={styles.sumRow}>
              <span>Onboard electronics</span>
              <span>{(ONBOARD_MW / 1000).toFixed(2)} W</span>
            </div>
            <div className={styles.sumRow}>
              <span>5V accessories ({total5V} mA)</span>
              <span>{(total5V * 5 / 1000).toFixed(2)} W</span>
            </div>
            <div className={styles.sumRow}>
              <span>9V accessories ({vtx} mA)</span>
              <span>{(vtx * 9 / 1000).toFixed(2)} W</span>
            </div>
            <div className={`${styles.sumRow} ${styles.sumTotal}`}>
              <span>Total</span>
              <span>{(totalPower / 1000).toFixed(2)} W</span>
            </div>
          </div>

          <div className={styles.colHead} style={{ marginTop: '1.25rem' }}>
            <span>Battery current draw</span>
          </div>
          <div className={styles.cellGrid}>
            {CELLS.map(({ label, voltage }) => {
              const ibat = ibatFor(voltage);
              const isSelected = label === selectedCell;
              return (
                <button
                  key={label}
                  className={`${styles.cellCard} ${isSelected ? styles.cellCardActive : ''}`}
                  onClick={() => setSelectedCell(label)}
                >
                  <span className={styles.cellLabel}>{label}</span>
                  <span className={styles.cellVoltage}>{voltage} V</span>
                  <span className={styles.cellCurrent}>{ibat.toFixed(2)} A</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Meters */}
      <div className={styles.meters}>
        <div>
          <div className={styles.meterTitle}>+5V rail total</div>
          <Meter value={total5V} recommended={RAIL_5V.recommended} max={RAIL_5V.max} ceiling={RAIL_5V.ceiling} />
        </div>
        <div>
          <div className={styles.meterTitle}>+9V rail (VTX)</div>
          <Meter value={vtx} recommended={RAIL_9V.recommended} max={RAIL_9V.max} ceiling={RAIL_9V.ceiling} />
        </div>
      </div>
    </div>
  );
}
