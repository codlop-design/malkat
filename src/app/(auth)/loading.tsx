export default function AuthLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div
        className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-label="جاري التحميل"
      />
    </main>
  );
}
