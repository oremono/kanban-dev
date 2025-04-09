import React from 'react';

import { withDemoStudentHome } from '@operations';

import View from './components/View';

const Board = (props: any) => {
  return <View {...props} />;
};

export default withDemoStudentHome(Board);
