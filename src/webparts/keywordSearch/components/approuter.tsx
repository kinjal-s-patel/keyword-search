import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import CsvSearchForm from './searchform';

import { IKeywordSearchProps } from './IKeywordSearchProps';

const AppRouter: React.FC<IKeywordSearchProps> = ({ context }) => {
  return (
    <Routes>
      <Route path="/" element={<CsvSearchForm context={context} />} />
    </Routes>
  );
};

export default AppRouter;
