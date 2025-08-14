import { GalleryVerticalEnd } from "lucide-react"
import { Outlet } from "react-router"



import LogoButton from "~/components/ui/button/logoButton"

export default function AuthLayout() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-2 p-4 col-span-2 md:p-6">
        <div className="flex justify-center gap-2 md:justify-center">
          <LogoButton size="2xl" className="h-16 -ml-8 my-16" />
        </div>
        <div className="flex flex-1 items-start justify-center">
          <div className="w-full max-w-xs">
            <Outlet />
          </div>
        </div>
      </div>
      {/* <div className="bg-muted relative hidden col-span-1 lg:block bg-cover bg-left" style={{ backgroundImage: 'linear-gradient(to left, rgba(0,0,0,0) 0, var(--image-gradient-middle) 40%, var(--color-background) 100%), url(https://i.imgur.com/A4RTXAO.jpeg)' }}>
        <img
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div> */}
    </div>
  )
}