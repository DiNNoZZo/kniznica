import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Libraries from './pages/library-pages/libraries';
import CreateLibrary from './pages/library-pages/create-library';
import UpdateLibrary from './pages/library-pages/update-library';
import DetailLibrary from './pages/library-pages/detail-library';
import CreateBook from './pages/book-pages/create-book';
import UpdateBook from './pages/book-pages/update-book';
import DetailBook from './pages/book-pages/detail-book';
import ShowBooks from './pages/book-pages/show-books';
import CreateStudent from './pages/student-pages/create-student';
import ShowStudents from './pages/student-pages/show-students';
import UpdateStudent from './pages/student-pages/update-student';
import DetailStudent from './pages/student-pages/detail-student';
import Navbar from './components/navbar/navbar';
import Home from './pages/home';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <main style={{ marginLeft: '30rem', height: '100%' }}>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route excat path="/libraries" element={<Libraries />} />
          <Route excat path="/libraries/create" element={<CreateLibrary />} />
          <Route
            excat
            path="/libraries/:id/detail"
            element={<DetailLibrary />}
          />
          <Route
            excat
            path="/libraries/:id/update"
            element={<UpdateLibrary />}
          />
          <Route
            excat
            path="/libraries/:id/create-book"
            element={<CreateBook />}
          />
          <Route
            excat
            path="/libraries/:id/create-student"
            element={<CreateStudent />}
          />

          <Route excat path="/books" element={<ShowBooks />} />
          <Route excat path="/books/:id/detail" element={<DetailBook />} />
          <Route excat path="/books/:id/update" element={<UpdateBook />} />

          <Route excat path="/students" element={<ShowStudents />} />
          <Route
            excat
            path="/students/:id/detail"
            element={<DetailStudent />}
          />
          <Route
            excat
            path="/students/:id/update"
            element={<UpdateStudent />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
