import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container" style={{ paddingBlock: "var(--space-16)", textAlign: "center" }}>
      <h1 className="heading-display" style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-4)" }}>
        Page not found
      </h1>
      <p className="text-muted" style={{ marginBottom: "var(--space-8)" }}>
        This page is not part of the prototype yet, or the link may be outdated.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "var(--space-4)" }}>
        <Link href="/" className="btn btn--primary">
          Back home
        </Link>
        <Link href="/collections/all" className="btn btn--secondary">
          Shop all
        </Link>
        <Link href="/search" className="btn btn--secondary">
          Search
        </Link>
      </div>
    </div>
  );
}
