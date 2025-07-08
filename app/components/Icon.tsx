// Helper function for SVG icons
type IconProps = {
  path: string;
  className?: string;
}

export default function Icon({ path, className }: IconProps): JSX.Element {
  return (
    <span className={` ${className} w-8 h-8 absolute inset-y-1 left-0 flex items-center pl-3`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-text-secondary dark:text-text-secondary-dark">
        <path d={path}>
        </path>
      </svg>
    </span>
  )
}