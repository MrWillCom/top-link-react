import React from 'react'
import Frame from "react-frame-component"
import  {FrameContextConsumer}  from "react-frame-component"
import { StyleSheetManager, withTheme, ThemeProvider } from 'styled-components'

export default withTheme((props) => {
  const {
    refs,
    theme,
    style = { },
    children,
    ...rest
  } = props

  return (
    <Frame
      ref = {refs}
      style={{
        ...style
      }}
      {...rest}
    >
      <FrameContextConsumer>
        {(frameContext) => (
          <StyleSheetManager target={frameContext.document.head}>
            {theme ? (
              <ThemeProvider theme={theme}>
                {children}
              </ThemeProvider>
            ) : (
              children
            )}
          </StyleSheetManager>
        )}
      </FrameContextConsumer>
    </Frame>
  )
})