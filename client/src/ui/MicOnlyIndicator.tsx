export function MicOnlyIndicator() {
  return (
    <div className="mic-only-indicator" aria-label="Mic only mode enabled" title="Mic only mode enabled">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 15a4 4 0 0 0 4-4V7a4 4 0 1 0-8 0v4a4 4 0 0 0 4 4Zm-6-4a1 1 0 0 1 2 0 4 4 0 1 0 8 0 1 1 0 1 1 2 0 6 6 0 0 1-5 5.91V20h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-3.09A6 6 0 0 1 6 11Z" />
      </svg>
      <span>Mic Only</span>
    </div>
  )
}
