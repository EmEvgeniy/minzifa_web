'use client';

import { useEffect, useRef } from 'react';

function ReviewsInner() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = 'trustindex-script';
    const oldScript = document.getElementById(scriptId);
    if (oldScript) {
      oldScript.remove();
    }
    if (widgetRef.current) {
      widgetRef.current.innerHTML = '';
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?9148d5a459d5117735065c57433';
    script.async = true;
    script.defer = true;
    script.setAttribute('data-trustindex', 'true');
    script.id = scriptId;

    widgetRef.current?.appendChild(script);
  }, []);
  return <div ref={widgetRef} className="w-full" />;
}

export default ReviewsInner;
