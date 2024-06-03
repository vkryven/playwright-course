export const isDesktopViewport = (page) => {
    const size = page.viewportSize() 
    return size.width >= 600
    //return true or false
  }