import { forwardRef } from 'react'
import './box.css'

const FloorMark = () => (
  <svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M60 16 100 38v44L60 104 20 82V38z" fill="#3d2417" opacity=".6" />
    <path d="M60 16 100 38 60 60 20 38z" fill="#4d2e1c" opacity=".6" />
    <text
      x="60"
      y="70"
      textAnchor="middle"
      fontFamily="'Space Grotesk', sans-serif"
      fontWeight="700"
      fontSize="26"
      fill="#f3e9d7"
      opacity=".7"
    >
      PP
    </text>
  </svg>
)

/**
 * Presentational 3D box. The Hero drives the per-flap open vars, the dive and
 * the cursor parallax on the forwarded scene element.
 */
const CorrugatedBox = forwardRef(function CorrugatedBox(_props, ref) {
  return (
    <div className="cbox-scene" ref={ref}>
      <div className="cbox">
        <span className="cbox__shadow" />

        {/* interior floor with brand stamp */}
        <div className="cbox__bottom">
          <FloorMark />
        </div>

        {/* inner walls (darker, seen when open) */}
        <span className="cbox__side inner front" />
        <span className="cbox__side inner back" />
        <span className="cbox__side inner left" />
        <span className="cbox__side inner right" />

        {/* outer walls */}
        <span className="cbox__side front flute-x">
          <span className="cbox__label">
            <i />
            <i />
            <i />
          </span>
          <span className="cbox__stamp">FRAGILE</span>
        </span>
        <span className="cbox__side back flute-x" />
        <span className="cbox__side left flute-x" />
        <span className="cbox__side right flute-x" />

        {/* opening rim */}
        <span className="cbox__rim" />

        {/* four hinged flaps */}
        <span className="cbox__flap b flute-x" />
        <span className="cbox__flap l flute-y" />
        <span className="cbox__flap r flute-y" />
        <span className="cbox__flap f flute-x" />
      </div>
    </div>
  )
})

export default CorrugatedBox
