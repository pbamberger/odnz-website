import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}

const styles: Record<Variant, string> = {
  primary: "bg-secondary text-white hover:bg-secondary-dark",
  secondary: "bg-white text-primary border border-primary hover:bg-primary/5",
  outline: "border border-white text-white hover:bg-white/10",
};

export function Button({ href, onClick, variant = "primary", children, className = "" }: ButtonProps) {
  const base = `inline-flex items-center justify-center px-6 py-3 rounded-md font-semibold text-sm transition-colors ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={base}>{children}</Link>;
  return <button onClick={onClick} className={base}>{children}</button>;
}
