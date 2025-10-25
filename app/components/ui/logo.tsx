import { ShieldCheck, type LucideProps } from 'lucide-react'


type LogoProps = LucideProps & {
  className?: string
}
export default function Logo(props: LogoProps) {
  return (
    <img src="../../../public/Logo.png" alt="Munitorum Logo" className={`${props.className} w-8 h-8`} />
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   viewBox="0 0 200 200" // The viewBox would come from your exported SVG
    //   {...props} // This lets you pass width, height, className, etc.
    // >
    //   {/* These <path> elements are what you would copy
    //   from your exported SVG file. 
    //   The 'd' attribute contains the actual path data.
    // */}

    //   {/* Placeholder path for the Cog */}
    //   <path
    //     d="M...[path data from your vector program]..."
    //     fill="#666666"
    //     stroke="#000"
    //     strokeWidth="1"
    //   />

    //   {/* Placeholder path for the 'M' */}
    //   <path
    //     d="M...[path data from your vector program]..."
    //     fill="#666666"
    //     stroke="#000"
    //     strokeWidth="1"
    //   />

    //   {/* Placeholder path for the Wings */}
    //   <path
    //     d="M...[path data from your vector program]..."
    //     fill="#FF0000"
    //     stroke="#000"
    //     strokeWidth="1"
    //   />

    //   {/* Placeholder path for the Skull */}
    //   <path
    //     d="M...[path data from your vector program]..."
    //     fill="#FFFFFF"
    //     stroke="#000"
    //     strokeWidth="1"
    //   />

    //   {/* Placeholder path for the Skull's features (eyes/nose) */}
    //   <path
    //     d="M...[path data from your vector program]..."
    //     fill="#000"
    //   />
    // </svg>
  );

}
