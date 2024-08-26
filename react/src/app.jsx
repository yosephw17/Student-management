// /* eslint-disable perfectionist/sort-imports */
// import 'src/global.css';

// import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// import Router from 'src/routes/sections';
// import ThemeProvider from 'src/theme';

// // ----------------------------------------------------------------------

// export default function App() {
//   useScrollToTop();

//   return (
//     <ThemeProvider>
//       <Router />
//     </ThemeProvider>
//   );
// }
import React from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import HomePage from './sections/student/view/HomePage';

const App = () => {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
};

export default App;
{
  /*   <ThemeProvider>
      <Router />
    </ThemeProvider>*/
}
