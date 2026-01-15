import React, { useState } from 'react'
import './FieldHelpTooltip.css'

/**
 * Field Help Tooltip Component
 * Shows a help icon that displays a tooltip with:
 * - A simplified diagram showing where the field appears on the site
 * - Example text based on existing VAs
 */
export default function FieldHelpTooltip({ fieldName, diagram, example }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="field-help-container">
      <button
        type="button"
        className="field-help-icon"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        aria-label={`Help for ${fieldName}`}
      >
        ?
      </button>
      {isVisible && (
        <div className="field-help-tooltip">
          <div className="field-help-content">
            {diagram && (
              <div className="field-help-diagram">
                <div className="field-help-diagram-title">📍 Where it appears:</div>
                <pre className="field-help-diagram-content">{diagram}</pre>
              </div>
            )}
            {example && (
              <div className="field-help-example">
                <div className="field-help-example-title">💡 Example:</div>
                <div className="field-help-example-text">{example}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
