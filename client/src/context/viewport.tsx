
import React from 'react';

const viewportContext = React.createContext({ viewport: '' });

type ViewportContextProps = { children: React.ReactNode };

export const ViewportProvider = ({ children }: ViewportContextProps) => {
  // const [width, setWidth] = React.useState(window.innerWidth);
  // const [height, setHeight] = React.useState(window.innerHeight);
  const [viewport, setViewport] = React.useState('');

  const handleWindowResize = () => {
    // setWidth(window.innerWidth);
    // setHeight(window.innerHeight);
    if (window.innerWidth < 567) {
      setViewport('mobile');
    } else {
      setViewport('fullhd');
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewportContext.Provider value={{ /* width, height,  */viewport }}>
      {children}
    </viewportContext.Provider>
  );
};

export const useViewport = () => {
  const { /* width, height,  */viewport } = React.useContext(viewportContext);
  return { /* width, height, */ viewport };
}
