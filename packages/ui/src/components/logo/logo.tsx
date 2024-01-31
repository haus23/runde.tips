import logoHref from './logo.svg';

export { logoHref };

export function Logo() {
  return (
    <div className="flex items-center gap-x-1">
      <svg
        className="h-10 w-10 fill-current"
        role="img"
        aria-label="Haus23 Logo"
      >
        <use href={`${logoHref}#logo`} />
      </svg>
      <span className="text-xl font-medium">runde.tips</span>
    </div>
  );
}
