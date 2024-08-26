import { Helmet } from 'react-helmet-async';

import { ProjectsView } from 'src/sections/projects/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Crber Talent</title>
      </Helmet>

      <ProjectsView />
    </>
  );
}
