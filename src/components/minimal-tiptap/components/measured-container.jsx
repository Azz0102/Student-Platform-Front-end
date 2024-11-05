import * as React from 'react'
import { useContainerSize } from '../hooks/use-container-size'

export const MeasuredContainer = React.forwardRef(
  (
    { as: Component, name, children, style = {}, ...props },
    ref
  ) => {
    const innerRef = React.useRef(null)
    const rect = useContainerSize(innerRef.current)

    React.useImperativeHandle(ref, () => innerRef.current)

    const customStyle = {
      [`--${name}-width`]: `${rect.width}px`,
      [`--${name}-height`]: `${rect.height}px`
    }

    return (
      <Component {...props} ref={innerRef} style={{ ...customStyle, ...style }}>
        {children}
      </Component>
    )
  }
)

MeasuredContainer.displayName = 'MeasuredContainer'
