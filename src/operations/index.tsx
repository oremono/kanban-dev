import { useState, useEffect, FunctionComponent } from 'react';

export const withDemoStudentHome = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState(null);

    useEffect(() => {
      fetch('/api/board')
        .then(response => response.json())
        .then(data => {
          setEvents(data);
          setLoading(false);
        });
    }, []);

    return <Component {...{ loading, events }} {...props} />;
  };
  return WithComponent;
};
