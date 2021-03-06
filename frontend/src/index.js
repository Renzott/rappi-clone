import React from 'react';
import { createRoot } from 'react-dom/client';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/home';
import NotFound from './views/NotFound/notFound';
import GSIProvider from './common/GSIProvider';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <GSIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </GSIProvider>
  </Provider>
);