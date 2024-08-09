/** Dispatch event on click outside of node */
export function clickOutside(node) {
    
    const handleClick = event => {
        console.log(event.target, node)
      if (node && !node.contains(event.target) && !event.target.contains(node) && !event.defaultPrevented) {
        node.dispatchEvent(
          new CustomEvent('clickoutside', node)
        )
      }
    }
  
      document.addEventListener('click', handleClick, true);
    
    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
      }
  }