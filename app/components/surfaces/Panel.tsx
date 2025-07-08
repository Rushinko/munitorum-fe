import React, { PropsWithChildren } from 'react'

type PanelProps = {
  width?: string
  height?: string
  className?: string
}

export default function Panel(props: PropsWithChildren<PanelProps>): JSX.Element {
  return (
    <div className={`${props.className}
      ${props.width !== undefined ? `w-${props.width}` : ''}
      ${props.height !== undefined ? `h-${props.height}` : ''}
      z-1 max-w-md bg-surface dark:bg-surface-dark text-text dark:text-dark rounded-lg shadow-lg p-8 space-y-6`}
    >
      {props.children}
    </div>
  )
}
