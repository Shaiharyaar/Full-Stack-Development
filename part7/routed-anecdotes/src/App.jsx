import PropTypes from "prop-types";
import { useState } from "react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import useField from "./hooks/useField";
import { Navbar, Nav, Button, Form, Table } from "react-bootstrap";
const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <Navbar collapseOnSelect expand={"md"} bg={"dark"} variant={"dark"}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              anecdotes
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/add" style={padding}>
              create new
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/about" style={padding}>
              about
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => a.id === Number(id));
  if (!anecdote) return;
  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>has {anecdote.votes} votes</p>
      <p>
        For more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};
Anecdote.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.object),
};

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped>
        <tbody>
          {anecdotes.map((anecdote) => (
            <tr key={anecdote.id}>
              <td>
                <Link key={anecdote.id} to={`/anecdote/${anecdote.id}`}>
                  <li>{anecdote.content}</li>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.object),
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is &quot;a story with a point.&quot;
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for <a href="https://fullstackopen.com/">Full Stack Open</a>.
    See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("content");
  const { reset: resetAuthor, ...author } = useField("author");
  const { reset: resetInfo, ...info } = useField("info");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate("/");
  };

  const handleReset = () => {
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>{"content"}</Form.Label>
          <Form.Control {...content} />
        </Form.Group>
        <Form.Group>
          <Form.Label>{"author"}</Form.Label>
          <Form.Control {...author} />
        </Form.Group>
        <Form.Group>
          <Form.Label>{"url for more info"}</Form.Label>
          <Form.Control {...info} />
        </Form.Group>
        <Button variant="primary" type="submit">
          create
        </Button>
        <Button variant="secondary" type="button" onClick={handleReset}>
          reset
        </Button>
      </Form>
    </div>
  );
};

CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired,
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`a new anecdote ${anecdote.content} created!`);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  return (
    <div className={"container"}>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <div>{notification}</div>}
      <Routes>
        <Route path={"/"} element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path={"/anecdote/:id"}
          element={<Anecdote anecdotes={anecdotes} />}
        />
        <Route path={"/about"} element={<About />} />
        <Route path={"/add"} element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
