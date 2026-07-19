import { Children, cloneElement, isValidElement, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface OrbitingCirclesProps {
  className?: string;
  children?: ReactNode;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  radius?: number;
  path?: boolean;
  paused?: boolean;
  startAngle?: number;
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  delay = 0,
  radius = 160,
  path = true,
  paused = false,
  startAngle = 0,
}: OrbitingCirclesProps) {
  const items = Children.toArray(children);

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
            strokeWidth={1}
            strokeDasharray="4 6"
          />
        </svg>
      )}
      {items.map((child, index) => {
        const angle = startAngle + (360 / items.length) * index;

        return (
          <div
            key={index}
            style={
              {
                "--duration": duration,
                "--radius": radius,
                "--angle": angle,
                "--delay": -delay,
                animationPlayState: paused ? "paused" : "running",
              } as React.CSSProperties
            }
            className={cn(
              "absolute left-1/2 top-1/2 animate-orbit rounded-full [animation-fill-mode:both] [animation-delay:calc(var(--delay)*1000ms)]",
              { "[animation-direction:reverse]": reverse },
              className,
            )}
          >
            {isValidElement(child) ? cloneElement(child as any) : child}
          </div>
        );
      })}
    </>
  );
}

export default OrbitingCircles;
