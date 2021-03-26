import React from 'react';
import Home from './pages/Home';

const App = () => (
  <div
    className="h-100"
  >
    <div
      className="flex-column h-100"
    >
      <div
        className="py-2 px-4 bg-primary fs-3 text-white"
      >
        <b>
          Todo
        </b>
      </div>
      <div
        className="flex-grow-1"
      >
        <Home />
      </div>
    </div>
  </div>
);

export default App;
