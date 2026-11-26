import { useCallback, useEffect, useState } from 'react'
import { productById } from '../data/catalogue'

const KEY = 'patropack.order.v1'

// The order lives outside React so every mounted component (the page, the
// navbar badge, the cart) reads the same list without prop-drilling or a
// context provider wrapping the whole site.
let items = load()
const listeners = new Set()

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(items))
  } catch {
    /* private mode or blocked storage — the order still works for this visit */
  }
}

function emit() {
  persist()
  listeners.forEach((fn) => fn(items))
}

/** A line is one configured product: size + quantity + chosen options. */
export function addLine(line) {
  items = [...items, { ...line, key: `${line.productId}-${Date.now()}` }]
  emit()
}

export function updateLine(key, patch) {
  items = items.map((l) => (l.key === key ? { ...l, ...patch } : l))
  emit()
}

export function removeLine(key) {
  items = items.filter((l) => l.key !== key)
  emit()
}

export function clearOrder() {
  items = []
  emit()
}

export function useOrder() {
  const [list, setList] = useState(items)

  useEffect(() => {
    const fn = (next) => setList(next)
    listeners.add(fn)
    setList(items) // re-sync in case something changed before we subscribed
    return () => listeners.delete(fn)
  }, [])

  return list
}

/** One human-readable line, used in the email body and the WhatsApp message. */
export function describeLine(line) {
  const product = productById(line.productId)
  const bits = [
    product?.name || line.productId,
    line.size,
    line.quantity && `${line.quantity} pcs`,
    ...Object.entries(line.options || {})
      .filter(([, v]) => v && v !== 'Not sure')
      .map(([, v]) => v),
    line.notes,
  ].filter(Boolean)
  return bits.join(' · ')
}

export const useOrderCount = () => useOrder().length

export const formatOrder = (list) =>
  list.map((l, i) => `${i + 1}. ${describeLine(l)}`).join('\n')

export { items as orderItems }

/** Stable callback for components that only need to clear after sending. */
export function useClearOrder() {
  return useCallback(() => clearOrder(), [])
}
