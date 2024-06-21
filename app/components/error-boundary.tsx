import {
  type ErrorResponse,
  isRouteErrorResponse,
  useLocation,
  useParams,
  useRouteError,
} from '@remix-run/react';
import UI from '#components/ui';

type StatusHandler = (info: {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
}) => JSX.Element | null;

export function getErrorMessage(error: unknown) {
  if (typeof error === 'string') return error;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof error.message === 'string'
  ) {
    return error.message;
  }
  return 'Unbekannter Fehler';
}

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <>
      <UI.Icon name="frown" className="size-40 text-error" />
      <p className="text-xl">
        {error.status} {error.data}
      </p>
    </>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => (
    <>
      <UI.Icon name="angry" className="size-40 text-error" />
      <p className="text-xl">{getErrorMessage(error)}</p>
    </>
  ),
}: {
  defaultStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}) {
  const { pathname } = useLocation();
  const error = useRouteError();
  const params = useParams();

  return (
    <div className="container mx-auto flex h-dvh flex-col items-center justify-center gap-y-8">
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
      {pathname === '/' ? (
        <p className="block text-xl">Bitte Micha informieren!</p>
      ) : (
        <UI.Link
          href="/"
          className="block px-4 py-1.5 text-xl underline underline-offset-4"
        >
          Zur Startseite
        </UI.Link>
      )}
    </div>
  );
}
