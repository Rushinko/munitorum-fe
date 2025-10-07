import React from 'react'

type ResultsProps = React.ComponentProps<"div"> & {
  label: string;
}

export default function Results(props: ResultsProps) {
  return (
    <div>
      <div>{props.label}</div>
    </div>
  )
}
