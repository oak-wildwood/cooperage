import { TIERS, type Tier } from "@/lib/projects";

/**
 * The maturity axis, made visible. Four rules; filled ones are lit, the rest are
 * dashed and dim. This — not the typography — is what tells you how finished
 * something is, so every project's type stays identical.
 */
export function TierMeter({ tier, size = "lg" }: { tier: Tier; size?: "lg" | "sm" }) {
  const { label, note, steps } = TIERS[tier];
  const lit = tier === "polished";
  const small = size === "sm";

  return (
    <div>
      <div className="flex items-center gap-3.5">
        <div className="flex gap-[5px]" aria-hidden>
          {[0, 1, 2, 3].map((i) =>
            i < steps ? (
              <span
                key={i}
                className={small ? "h-[2.5px] w-[18px]" : "h-[3px] w-6"}
                style={{
                  background: lit ? "var(--color-gold)" : "var(--color-gold-dim)",
                  boxShadow: lit ? "0 0 7px rgba(232,201,140,.65)" : undefined,
                }}
              />
            ) : (
              <span
                key={i}
                className={`border-t-[1.5px] border-dashed border-line-700 ${
                  small ? "w-[18px]" : "w-6"
                }`}
              />
            ),
          )}
        </div>
        <span
          className="font-mono text-[11.5px] font-semibold tracking-[0.22em]"
          style={{ color: lit ? "var(--color-gold)" : "var(--color-gold-dim)" }}
        >
          {label.toUpperCase()}
        </span>
      </div>
      {!small && (
        <span className="mt-2.5 block font-mono text-[11.5px] text-paper-faint">
          {note}
        </span>
      )}
    </div>
  );
}
