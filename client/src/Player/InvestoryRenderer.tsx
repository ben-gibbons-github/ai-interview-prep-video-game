interface InventoryEntry {
  id: string
  name: string
  description: string
  count: number
  consumeIndex: number
}

interface InvestoryRendererProps {
  entries: InventoryEntry[]
  onConsume: (index: number) => void
}

export function InvestoryRenderer({ entries, onConsume }: InvestoryRendererProps) {
  const totalConsumables = entries.reduce((total, entry) => total + entry.count, 0)

  return (
    <section className="inventory-hud" aria-label="Inventory">
      <div className="inventory-hud-header">
        <h2>Inventory</h2>
        <span>{totalConsumables} consumable{totalConsumables === 1 ? '' : 's'}</span>
      </div>
      {entries.length === 0 ? (
        <p className="inventory-empty">No consumables yet. Choose rewards after each wave.</p>
      ) : (
        <ul className="inventory-list">
          {entries.map((item) => (
            <li key={item.id} className="inventory-item">
              <button
                type="button"
                className="inventory-item-button"
                title={item.description}
                onClick={() => onConsume(item.consumeIndex)}
              >
                <strong>{item.name} x{item.count}</strong>
                <small>{item.description}</small>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export type { InventoryEntry }
