import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      data-slot="skeleton"
      className={cn("bg-stone-700 animate-pulse rounded-md", className)}
      {...props} />)
  );
}

export { Skeleton }
