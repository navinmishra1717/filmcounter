import { AuthFlowProvider } from "@/components/auth/auth-flow";

// Placeholder poster fills until real artwork is wired in.
const WALL_FILLS = Array.from({ length: 48 }, (_, i) => (i % 2 === 0 ? "#eae7e7" : "#e0dcdc"));

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-night p-10">
      <div
        className="absolute inset-0 grid grid-cols-8 content-start gap-[5px] p-[5px] opacity-[0.32] contrast-[1.08] grayscale"
        aria-hidden="true"
      >
        {WALL_FILLS.map((fill, i) => (
          <div key={i} className="aspect-[2/3]" style={{ background: fill }} />
        ))}
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,20,19,.55),rgba(21,20,19,.9))]" />
      <AuthFlowProvider>{children}</AuthFlowProvider>
    </main>
  );
}
