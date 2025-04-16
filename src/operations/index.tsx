import { useState, useEffect, FunctionComponent } from 'react';

export const withDemoStudentHome = (Component: FunctionComponent) => {
  const WithComponent = (props: any) => {
    const [loading, setLoading] = useState(true);
    const [weekEvents, setWeekEvents] = useState(null);

    useEffect(() => {
      fetch('/api/board')
        .then(response => response.json())
        .then(data => {
          setWeekEvents(data);
          setLoading(false);
        });
    }, []);

    return <Component {...{ loading, weekEvents }} {...props} />;
  };
  return WithComponent;
};
