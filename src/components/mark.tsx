import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-5 text-fg", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18.4 12.4c-.5 4.4-4 7.5-7.9 6.8C6.2 18.4 3.4 14.4 4.1 10.1 4.8 5.9 8.8 3.1 13.4 4c2.9.6 5.1 2.8 5.6 5.6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
