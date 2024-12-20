import { useEffect } from 'react';

export const useDownload = (data: string) => {
  useEffect(() => {
    document.addEventListener('click', downloadObjectAsJson);
    return () => document.removeEventListener('click', downloadObjectAsJson);
  }, []);

  function downloadObjectAsJson(e: MouseEvent) {
    if (e.altKey) {
      const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute('href', dataStr);
      const name = `palettebruh-${Date.now()}`;
      downloadAnchorNode.setAttribute('download', `${name}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }
  }

  return { downloadObjectAsJson };
};
