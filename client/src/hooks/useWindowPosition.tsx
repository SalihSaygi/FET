import { useLayoutEffect, useState } from 'react';

export default function useWindowPosition(id: string): boolean {
  const [animation, setAnimation] = useState(false);

  useLayoutEffect((): () => void => {
    function updatePosition(): void {
      const offetSetHeight = window.document.getElementById(id)!.offsetHeight;
      if (window.pageYOffset > offetSetHeight * 0.7) {
        setAnimation(true);
      }
    }
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  }, [id]);
  return animation;
}