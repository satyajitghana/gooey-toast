'use client';

import { useState } from 'react';
import { gooeyToast } from 'gooey-ui';
import type { GooeyToastOptions, GooeyToasterProps } from 'gooey-ui';
import { useCopy } from './use-copy';

type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info';
const TOAST_TYPES: ToastType[] = ['default', 'success', 'error', 'warning', 'info'];
const POSITIONS: GooeyToasterProps['position'][] = [
  'top-left',
  'top-center',
  'top-right',
  'bottom-left',
  'bottom-center',
  'bottom-right',
];

interface BuilderSectionProps {
  position: GooeyToasterProps['position'];
  onPositionChange: (pos: GooeyToasterProps['position']) => void;
}

export function BuilderSection({ position, onPositionChange }: BuilderSectionProps) {
  const codeCopy = useCopy();

  // Builder state
  const [bType, setBType] = useState<ToastType>('success');
  const [bTitle, setBTitle] = useState('Changes saved');
  const [bHasDesc, setBHasDesc] = useState(true);
  const [bDesc, setBDesc] = useState(
    'Your changes have been saved and synced successfully.'
  );
  const [bHasAction, setBHasAction] = useState(false);
  const [bActionLabel, setBActionLabel] = useState('Undo');
  const [bFillColor, setBFillColor] = useState('#ffffff');
  const [bHasBorder, setBHasBorder] = useState(false);
  const [bBorderColor, setBBorderColor] = useState('#E0E0E0');
  const [bBorderWidth, setBBorderWidth] = useState(1.5);
  const [bDisplayDuration, setBDisplayDuration] = useState(4000);
  const [bSpring, setBSpring] = useState(true);
  const [bBounce, setBBounce] = useState(0.4);

  const fireBuilderToast = () => {
    const options: GooeyToastOptions = {};
    if (bHasDesc && bDesc) options.description = bDesc;
    if (bHasAction && bActionLabel) {
      options.action = {
        label: bActionLabel,
        onClick: () => {},
        successLabel: 'Done!',
      };
    }
    if (bFillColor !== '#ffffff') options.fillColor = bFillColor;
    if (bHasBorder && bBorderColor) {
      options.borderColor = bBorderColor;
      options.borderWidth = bBorderWidth;
    }
    if (bDisplayDuration !== 4000) {
      options.timing = { displayDuration: bDisplayDuration };
    }
    if (!bSpring) options.spring = false;
    options.bounce = bBounce;

    if (bType === 'default') gooeyToast(bTitle, options);
    else gooeyToast[bType](bTitle, options);
  };

  const generatedCode = (() => {
    const lines: string[] = [];
    const hasFill = bFillColor !== '#ffffff';
    const hasBorder = bHasBorder && bBorderColor;
    const hasSpringOff = !bSpring;
    const hasBounce = bBounce !== 0.4;
    const hasOpts =
      bHasDesc || bHasAction || hasFill || hasBorder || hasSpringOff || hasBounce;
    const call = bType === 'default' ? 'gooeyToast' : `gooeyToast.${bType}`;

    lines.push(`<GooeyToaster position="${position}" />`);
    lines.push('');
    if (!hasOpts) {
      lines.push(`${call}('${bTitle}')`);
    } else {
      lines.push(`${call}('${bTitle}', {`);
      if (bHasDesc && bDesc) lines.push(`  description: '${bDesc}',`);
      if (bHasAction && bActionLabel) {
        lines.push(`  action: {`);
        lines.push(`    label: '${bActionLabel}',`);
        lines.push(`    onClick: () => {},`);
        lines.push(`  },`);
      }
      if (hasFill) lines.push(`  fillColor: '${bFillColor}',`);
      if (hasBorder) {
        lines.push(`  borderColor: '${bBorderColor}',`);
        lines.push(`  borderWidth: ${bBorderWidth},`);
      }
      if (hasSpringOff) lines.push(`  spring: false,`);
      if (hasBounce) lines.push(`  bounce: ${bBounce},`);
      if (bDisplayDuration !== 4000) {
        lines.push(`  timing: {`);
        lines.push(`    displayDuration: ${bDisplayDuration},`);
        lines.push(`  },`);
      }
      lines.push(`})`);
    }
    return lines.join('\n');
  })();

  return (
    <div className="builder" id="builder">
      <div className="builder-header">
        <h2>Builder</h2>
        <p>Design and test your toast in real time.</p>
      </div>

      <div className="builder-card">
        {/* Position */}
        <div className="builder-row">
          <div className="builder-label">Position</div>
          <div className="type-pills">
            {POSITIONS.map((p) => (
              <button
                key={p}
                className="type-pill"
                data-type="position"
                data-active={position === p}
                onClick={() => onPositionChange(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="builder-row">
          <div className="builder-label">Type</div>
          <div className="type-pills">
            {TOAST_TYPES.map((t) => (
              <button
                key={t}
                className="type-pill"
                data-type={t}
                data-active={bType === t}
                onClick={() => setBType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="builder-row">
          <div className="builder-label">Title</div>
          <input
            className="builder-input"
            value={bTitle}
            onChange={(e) => setBTitle(e.target.value)}
            placeholder="Toast title..."
          />
        </div>

        {/* Description toggle + input */}
        <div className="builder-row">
          <div className="toggle-row">
            <span className="toggle-row-label">Description</span>
            <button
              className="toggle"
              data-on={bHasDesc}
              onClick={() => setBHasDesc(!bHasDesc)}
            >
              <div className="toggle-knob" />
            </button>
          </div>
          {bHasDesc && (
            <textarea
              className="builder-input"
              style={{ marginTop: 10 }}
              value={bDesc}
              onChange={(e) => setBDesc(e.target.value)}
              placeholder="Description text..."
            />
          )}
        </div>

        {/* Action toggle + input */}
        <div className="builder-row">
          <div className="toggle-row">
            <span className="toggle-row-label">Action Button</span>
            <button
              className="toggle"
              data-on={bHasAction}
              onClick={() => setBHasAction(!bHasAction)}
            >
              <div className="toggle-knob" />
            </button>
          </div>
          {bHasAction && (
            <input
              className="builder-input"
              style={{ marginTop: 10 }}
              value={bActionLabel}
              onChange={(e) => setBActionLabel(e.target.value)}
              placeholder="Button label..."
            />
          )}
        </div>

        {/* Style */}
        <div className="builder-row">
          <div className="builder-label">Style</div>
          <div className="style-controls">
            <div className="color-row">
              <span className="color-row-label">Fill Color</span>
              <div className="color-picker-group">
                <input
                  type="color"
                  className="color-input"
                  value={bFillColor}
                  onChange={(e) => setBFillColor(e.target.value)}
                />
                <input
                  className="builder-input color-hex"
                  value={bFillColor}
                  onChange={(e) => setBFillColor(e.target.value)}
                  placeholder="#ffffff"
                />
              </div>
            </div>
            <div className="border-section">
              <div className="toggle-row">
                <span className="toggle-row-label">Border</span>
                <button
                  className="toggle"
                  data-on={bHasBorder}
                  onClick={() => setBHasBorder(!bHasBorder)}
                >
                  <div className="toggle-knob" />
                </button>
              </div>
              {bHasBorder && (
                <div className="border-controls">
                  <div className="color-row">
                    <span className="color-row-label">Color</span>
                    <div className="color-picker-group">
                      <input
                        type="color"
                        className="color-input"
                        value={bBorderColor}
                        onChange={(e) => setBBorderColor(e.target.value)}
                      />
                      <input
                        className="builder-input color-hex"
                        value={bBorderColor}
                        onChange={(e) => setBBorderColor(e.target.value)}
                        placeholder="#E0E0E0"
                      />
                    </div>
                  </div>
                  <div className="slider-item">
                    <div className="slider-item-header">
                      <span className="slider-item-label">Width</span>
                      <span className="slider-item-value">{bBorderWidth}px</span>
                    </div>
                    <input
                      type="range"
                      className="slider"
                      min={0.5}
                      max={4}
                      step={0.5}
                      value={bBorderWidth}
                      onChange={(e) => setBBorderWidth(Number(e.target.value))}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Timing sliders */}
        <div className="builder-row">
          <div className="builder-label">Timing</div>
          <div className="slider-group">
            <div className="slider-item">
              <div className="slider-item-header">
                <span className="slider-item-label">Display Duration</span>
                <span className="slider-item-value">
                  {(bDisplayDuration / 1000).toFixed(1)}s
                </span>
              </div>
              <input
                type="range"
                className="slider"
                min={1000}
                max={20000}
                step={500}
                value={bDisplayDuration}
                onChange={(e) => setBDisplayDuration(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Spring Effect */}
        <div className="builder-row">
          <div className="builder-label">Spring Effect</div>
          <div className="slider-group">
            <div className="slider-item">
              <div className="slider-item-header">
                <span className="slider-item-label">
                  {bSpring ? `Bounce: ${bBounce.toFixed(2)}` : 'Off'}
                </span>
                <button
                  className="toggle"
                  data-on={bSpring}
                  onClick={() => setBSpring(!bSpring)}
                  style={{ transform: 'scale(0.85)' }}
                >
                  <div className="toggle-knob" />
                </button>
              </div>
              {bSpring && (
                <input
                  type="range"
                  className="slider"
                  min={0.05}
                  max={0.8}
                  step={0.05}
                  value={bBounce}
                  onChange={(e) => setBBounce(Number(e.target.value))}
                />
              )}
            </div>
          </div>
        </div>

        {/* Fire button */}
        <div className="builder-row">
          <button className="fire-btn" onClick={fireBuilderToast}>
            Fire Toast
          </button>
        </div>

        {/* Generated code */}
        <div className="builder-code">
          <button
            className="code-copy-btn"
            onClick={() => codeCopy.copy(generatedCode)}
          >
            {codeCopy.copied ? 'Copied!' : 'Copy'}
          </button>
          <pre>
            <code>{generatedCode}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
