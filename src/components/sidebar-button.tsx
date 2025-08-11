// components/SidebarButton.tsx
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface SidebarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  children: React.ReactNode;
}

export function SidebarButton({
  icon: Icon,
  children,
  className,
  ...props
}: SidebarButtonProps) {
  return (
    <Button className={`justify-start gap-2 ${className}`} {...props}>
      <Icon />
      <span>{children}</span>
    </Button>
  );
}
