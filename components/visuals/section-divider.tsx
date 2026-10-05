import IsoCube from "@/components/visuals/iso-cube"

// Hairline between sections with a faint signal pulse travelling along it.
export default function SectionDivider() {
  return (
    <div className="relative mx-auto flex max-w-5xl items-center gap-4 px-4 md:px-6" aria-hidden="true">
      <div className="relative h-px flex-1 overflow-hidden bg-border">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-signal/70 to-transparent motion-safe:animate-[signal-travel_6s_linear_infinite]" />
      </div>
      <IsoCube size={28} className="text-foreground" />
      <div className="relative h-px flex-1 overflow-hidden bg-border">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-signal/70 to-transparent motion-safe:animate-[signal-travel_6s_linear_infinite] [animation-delay:3s]" />
      </div>
    </div>
  )
}
