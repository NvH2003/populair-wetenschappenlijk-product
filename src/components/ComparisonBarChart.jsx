import { motion } from 'framer-motion'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts'
import { RESULT_CHARTS } from '../data/studyResults'

function formatM(value) {
  return Number(value).toFixed(2)
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const row = payload[0].payload
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl px-3 py-2 text-sm shadow-lg">
      <p className="text-white font-semibold">{row.name}</p>
      <p className="text-slate-300">
        Persoonlijke acceptatie:{' '}
        <span className="text-orange-400 font-bold">{formatM(row.value)}</span>
      </p>
    </div>
  )
}

export default function ComparisonBarChart({ chartKey }) {
  const config = RESULT_CHARTS[chartKey]
  if (!config) return null

  const { title, subtitle, comparison, pValue, pLabel, yMax, bars, compareInChart } = config
  const highlighted = new Set(compareInChart ?? bars.map(b => b.name))
  const hasHighlight = compareInChart && compareInChart.length < bars.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/90 border border-slate-600 rounded-2xl p-4 shadow-lg"
    >
      <div className="mb-3">
        <p className="text-orange-400 text-[10px] font-bold uppercase tracking-widest">{title}</p>
        <p className="text-white text-sm font-semibold">{subtitle}</p>
        <p className="text-slate-400 text-xs mt-0.5">{comparison}</p>
      </div>

      <div className="h-[180px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bars} margin={{ top: 20, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#475569' }}
            />
            <YAxis
              domain={[0, yMax]}
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              axisLine={{ stroke: '#475569' }}
              label={{
                value: 'Persoonlijke acceptatie',
                angle: -90,
                position: 'insideLeft',
                fill: '#64748b',
                fontSize: 9,
                dx: 14,
              }}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(249,115,22,0.08)' }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={44}>
              {bars.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.fill}
                  fillOpacity={highlighted.has(entry.name) ? 1 : 0.35}
                  stroke={highlighted.has(entry.name) ? '#f8fafc' : 'transparent'}
                  strokeWidth={highlighted.has(entry.name) ? 2 : 0}
                />
              ))}
              <LabelList
                dataKey="value"
                position="top"
                formatter={v => formatM(v)}
                fill="#e2e8f0"
                fontSize={11}
                fontWeight={600}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-slate-500 text-[10px] text-center mt-1">
        Staafhoogte = gemiddelde persoonlijke acceptatie
        {hasHighlight && ' · Lichtere staven vallen buiten deze vergelijking'}
      </p>

      {pValue != null && (
        <p className="text-center text-sm mt-2 pt-3 border-t border-slate-700">
          <span className="text-slate-400">p-waarde vergelijking: </span>
          <span className="text-white font-mono font-semibold">p = {pValue}</span>
          {pLabel && (
            <span className="text-slate-500 text-xs ml-1">({pLabel})</span>
          )}
        </p>
      )}
    </motion.div>
  )
}
