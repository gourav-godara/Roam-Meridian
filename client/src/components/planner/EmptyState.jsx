function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16">
      <span className="text-4xl mb-3">✨</span>
      <h3 className="font-display text-xl text-ink">Where should we take you?</h3>
      <p className="text-sm text-muted mt-2 max-w-sm">
        Describe your dream trip, or pick a prompt below to get started.
      </p>
    </div>
  );
}

export default EmptyState;
