export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper" role="status" aria-label="Loading">
      <span className="size-6 animate-spin rounded-full border-2 border-divider border-t-accent" />
    </div>
  );
}
