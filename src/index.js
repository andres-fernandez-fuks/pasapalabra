

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes, Navigate  } from "react-router-dom";
import routes from './utils/routes';
import GamePage from './pages/gamePage';
import LeaderboardPage from './pages/leaderboardPage';
import IntroductionPage from './pages/introductionPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path={routes.gamePage}
        element={<GamePage />}
      />
      <Route
        path={routes.leaderboardPage}
        element={<LeaderboardPage />}
      />
        <Route
        path={"/"}
        element={<IntroductionPage />}
      />
    </Routes>
  </BrowserRouter>
);

