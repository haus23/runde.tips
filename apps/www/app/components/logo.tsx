export function Logo() {
  return (
    <div className="flex items-center gap-x-1 text-foreground">
      <svg
        style={{ fill: 'currentcolor' }}
        className="h-10 w-10"
        role="img"
        aria-label="Haus23 Logo"
      >
        <use href="/img/logo.svg#logo" />
      </svg>
      <span className="-translate-y-0.5 font-medium text-xl">runde.tips</span>
    </div>
  );
}
