const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path'); 

const app = express();
const port = 3000;

// HTML wrapper function
function wrapHTML(content) {
  const navLinks = routes.map(route => `
    <li class="nav-item">
      <a class="nav-link" href="${route.path}">${route.description}</a>
    </li>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>BaireDev Rockstar</title>
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          padding-top: 56px;
        }
        .navbar-brand img {
          width: 30px;
          height: 30px;
        }
          /* Importing Google font - Open Sans */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');

.container {
  height:100%;
}
.footer {
  margin-top:100px;
  position: relative;
  bottom:0;
  max-width: 100%;
  width: 100%;
  background: #10182F;
  border-radius: 6px;
}

.footer .footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3.5rem;
  padding: 60px;
}

.footer-row .footer-col h4 {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 400;
}

.footer-col .links {
  margin-top: 20px;
}

.footer-col .links li {
  list-style: none;
  margin-bottom: 10px;
}

.footer-col .links li a {
  text-decoration: none;
  color: #bfbfbf;
}

.footer-col .links li a:hover {
  color: #fff;
}

.footer-col p {
  margin: 20px 0;
  color: #bfbfbf;
  max-width: 300px;
}

.footer-col form {
  display: flex;
  gap: 5px;
}

.footer-col input {
  height: 40px;
  border-radius: 6px;
  background: none;
  width: 100%;
  outline: none;
  border: 1px solid #7489C6 ;
  caret-color: #fff;
  color: #fff;
  padding-left: 10px;
}

.footer-col input::placeholder {
  color: #ccc;
}

 .footer-col form button {
  background: #fff;
  outline: none;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: 0.2s ease;
}

.footer-col form button:hover {
  background: #cecccc;
}

.footer-col .icons {
  display: flex;
  margin-top: 30px;
  gap: 30px;
  cursor: pointer;
}

.footer-col .icons i {
  color: #afb6c7;
}

.footer-col .icons i:hover  {
  color: #fff;
}

@media (max-width: 768px) {
  .footer {
    position: relative;
    bottom: 0;
    left: 0;
    transform: none;
    width: 100%;
    border-radius: 0;
  }

  .footer .footer-row {
    padding: 20px;
    gap: 1rem;
  }

  .footer-col form {
    display: block;
  }

  .footer-col form :where(input, button) {
    width: 100%;
  }

  .footer-col form button {
    margin: 10px 0 0 0;
  }
}
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <a class="navbar-brand" href="/">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/home.png" alt="Home">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            ${navLinks}
          </ul>
        </div>
      </nav>
      <section>
      <div class="container mt-5">
        ${content}
      </div>
      </section>
      <section class="footer">
  <div class="footer-row">
    <div class="footer-col">
      <h4>Async Programming</h4>
      <ul class="links">
        <li><a href="#">Use Promises</a></li>
        <li><a href="#">Avoid Callback Hell</a></li>
        <li><a href="#">Leverage Async/Await</a></li>
        <li><a href="#">Error Handling</a></li>
        <li><a href="#">Non-blocking Code</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Best Practices</h4>
      <ul class="links">
        <li><a href="https://medium.com/@developerom/functions-in-node-js-fad18f1254fe">Use Named Functions</a></li>
        <li><a href="https://docs.getdbt.com/terms/dry#:~:text=DRY%20is%20a%20software%20development,of%20modular%20and%20referenceable%20code.">Keep Code DRY</a></li>
        <li><a href="https://courses.cs.washington.edu/courses/cse154/17au/styleguide/js/spacing-indentation-js.html#:~:text=Spacing%20and%20indentation%20should%20be,than%20the%20previous%20line's%20indentation.">Proper Indentation</a></li>
        <li><a href="https://medium.com/nerd-for-tech/express-router-for-modular-code-f155d4406897">Modular Code</a></li>
        <li><a href="https://sematext.com/blog/expressjs-best-practices/">Optimize Performance</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Resources</h4>
      <ul class="links">
        <li><a href="https://expressjs.com/en/5x/api.html">Documentation</a></li>
        <li><a href="https://zellwk.com/blog/async-await-express/">Tutorials</a></li>
        <li><a href="https://expressjs.com/en/resources/community.html">Community Forums</a></li>
        <li><a href="https://expressjs.com/en/starter/examples.html">Code Examples</a></li>
        <li><a href="https://quickref.me/express.html">Cheat Sheets</a></li>
      </ul>
    </div>
    <div class="footer-col">
    <h4>Subscribe to Our Newsletter</h4>
    <form action="/subscribe" method="POST" class="mt-3">
      <div class="form-group">
        <label for="inputEmail" style="color:white;">Email address</label>
        <input type="email" class="form-control" id="inputEmail" name="email" placeholder="Your email" required>
      </div>
      <button type="submit" class="btn btn-primary" style="color:black;">SUBSCRIBE</button>
    </form>
      <div class="icons">
        <i class="fa-brands fa-facebook-f"></i>
        <i class="fa-brands fa-twitter"></i>
        <i class="fa-brands fa-linkedin"></i>
        <i class="fa-brands fa-github"></i>
      </div>
    </div>
  </div>
</section>

      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </body>
    </html>
  `;
}

const routes = [
  { path: '/', description: 'Home' },
  { path: '/sync', description: 'Synchronous route example' },
  { path: '/async-callback', description: 'Asynchronous route with callback' },
  { path: '/async-promise', description: 'Asynchronous route with Promise' },
  { path: '/async-await', description: 'Asynchronous route with async/await' },
  { path: '/async-callback-multiple', description: 'Asynchronous route with multiple files using callback' },
  { path: '/async-promise-multiple', description: 'Asynchronous route with multiple files using Promise' },
  { path: '/async-await-multiple', description: 'Asynchronous route with multiple files using async/await' },
  { path: '/yesno-promise', description: 'YesNo API with Promise' },
  { path: '/yesno-async', description: 'YesNo API with async/await' },
  { path: '/yesno-callback', description: 'YesNo API with callback' },
  { path: '/multiple-yesno', description: 'Multiple YesNo API calls' },
  { path: '/code-challenge', description: 'Simple code challenge' },
];

// Default route with index of routes
app.get('/', (req, res) => {
  let routeList = '<h1 class="mb-4">You are a BaireDev Rockstar</h1>';
  routeList += '<h2 class="mb-3">Available Routes:</h2>';
  routeList += '<ul class="list-group">';
  routes.forEach(route => {
    routeList += `<li class="list-group-item"><a href="${route.path}">${route.path}</a>: ${route.description}</li>`;
  });
  routeList += '</ul>';

  res.send(wrapHTML(routeList));
});

// Synchronous route
app.get('/sync', (req, res) => {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  const content = `
    <h1 class="mb-4">Synchronous Route</h1>
    <p class="lead">Result: ${result}</p>
    <h2 class="mt-5">Code:</h2>
    <pre class="bg-light p-3 mt-3"><code>
app.get('/sync', (req, res) => {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += i;
  }
  res.send(\`Result: \${result}\`);
});
    </code></pre>
  `;
  res.send(wrapHTML(content));
});

// Asynchronous route with callback
app.get('/async-callback', (req, res) => {
  const fs = require('node:fs');
  try {
    const data = fs.readFileSync('large-file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
});

// Asynchronous route with Promise
app.get('/async-promise', (req, res) => {
  fs.readFile('large-file.txt', 'utf8')
    .then(data => {
      const content = `
        <h1 class="mb-4">Asynchronous Route with Promise</h1>
        <p class="lead">File content: ${data}</p>
        <h2 class="mt-5">Code:</h2>
        <pre class="bg-light p-3 mt-3"><code>
app.get('/async-promise', (req, res) => {
  fs.readFile('large-file.txt', 'utf8')
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send('Error reading file');
    });
});
        </code></pre>
      `;
      res.send(wrapHTML(content));
    })
    .catch(err => {
      res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading file</h1>'));
    });
});

// Asynchronous route with async/await
app.get('/async-await', async (req, res) => {
  try {
    const data = await fs.readFile('large-file.txt', 'utf8');
    const content = `
      <h1 class="mb-4">Asynchronous Route with Async/Await</h1>
      <p class="lead">File content: ${data}</p>
      <h2 class="mt-5">Code:</h2>
      <pre class="bg-light p-3 mt-3"><code>
app.get('/async-await', async (req, res) => {
  try {
    const data = await fs.readFile('large-file.txt', 'utf8');
    res.send(data);
  } catch (err) {
    res.status(500).send('Error reading file');
  }
});
      </code></pre>
    `;
    res.send(wrapHTML(content));
  } catch (err) {
    res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading file</h1>'));
  }
});


app.get('/sync-multiple', (req, res) => {
  let result1 = '';
  let result2 = '';

  try {
    result1 = fs.readFileSync('large-file.txt', 'utf8');
    result2 = fs.readFileSync('large-file-2.txt', 'utf8');
  } catch (err) {
    return res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading files</h1>'));
  }

  const content = `
    <h1 class="mb-4">Synchronous Multiple Files Route</h1>
    <p class="lead">File 1 content: ${result1}</p>
    <p class="lead">File 2 content: ${result2}</p>
    <h2 class="mt-5">Code:</h2>
    <pre class="bg-light p-3 mt-3"><code>
app.get('/sync-multiple', (req, res) => {
  let result1 = '';
  let result2 = '';

  try {
    result1 = fs.readFileSync('large-file.txt', 'utf8');
    result2 = fs.readFileSync('large-file-2.txt', 'utf8');
  } catch (err) {
    return res.status(500).send('Error reading files');
  }

  res.send(\`File 1 content: \${result1} File 2 content: \${result2}\`);
});
    </code></pre>
  `;
  res.send(wrapHTML(content));
});

app.get('/async-callback-multiple', (req, res) => {
  fs.readFile('large-file.txt', 'utf8', (err1, data1) => {
    if (err1) {
      return res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading first file</h1>'));
    }
    fs.readFile('large-file-2.txt', 'utf8', (err2, data2) => {
      if (err2) {
        return res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading second file</h1>'));
      }
      const content = `
        <h1 class="mb-4">Asynchronous Multiple Files Route with Callback</h1>
        <p class="lead">File 1 content: ${data1}</p>
        <p class="lead">File 2 content: ${data2}</p>
        <h2 class="mt-5">Code:</h2>
        <pre class="bg-light p-3 mt-3"><code>
app.get('/async-callback-multiple', (req, res) => {
  fs.readFile('large-file.txt', 'utf8', (err1, data1) => {
    if (err1) {
      return res.status(500).send('Error reading first file');
    }
    fs.readFile('large-file-2.txt', 'utf8', (err2, data2) => {
      if (err2) {
        return res.status(500).send('Error reading second file');
      }
      res.send(\`File 1 content: \${data1} File 2 content: \${data2}\`);
    });
  });
});
        </code></pre>
      `;
      res.send(wrapHTML(content));
    });
  });
});

app.get('/async-promise-multiple', (req, res) => {
  Promise.all([
    fs.readFile('large-file.txt', 'utf8'),
    fs.readFile('large-file-2.txt', 'utf8')
  ])
    .then(([data1, data2]) => {
      const content = `
        <h1 class="mb-4">Asynchronous Multiple Files Route with Promise</h1>
        <p class="lead">File 1 content: ${data1}</p>
        <p class="lead">File 2 content: ${data2}</p>
        <h2 class="mt-5">Code:</h2>
        <pre class="bg-light p-3 mt-3"><code>
app.get('/async-promise-multiple', (req, res) => {
  Promise.all([
    fs.readFile('large-file.txt', 'utf8'),
    fs.readFile('large-file-2.txt', 'utf8')
  ])
    .then(([data1, data2]) => {
      res.send(\`File 1 content: \${data1} File 2 content: \${data2}\`);
    })
    .catch(err => {
      res.status(500).send('Error reading files');
    });
});
        </code></pre>
      `;
      res.send(wrapHTML(content));
    })
    .catch(err => {
      res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading files</h1>'));
    });
});

app.get('/async-await-multiple', async (req, res) => {
  try {
    const data1 = await fs.readFile('large-file.txt', 'utf8');
    const data2 = await fs.readFile('large-file-2.txt', 'utf8');
    const content = `
      <h1 class="mb-4">Asynchronous Multiple Files Route with Async/Await</h1>
      <p class="lead">File 1 content: ${data1}</p>
      <p class="lead">File 2 content: ${data2}</p>
      <h2 class="mt-5">Code:</h2>
      <pre class="bg-light p-3 mt-3"><code>
app.get('/async-await-multiple', async (req, res) => {
  try {
    const data1 = await fs.readFile('large-file.txt', 'utf8');
    const data2 = await fs.readFile('large-file-2.txt', 'utf8');
    res.send(\`File 1 content: \${data1} File 2 content: \${data2}\`);
  } catch (err) {
    res.status(500).send('Error reading files');
  }
});
      </code></pre>
    `;
    res.send(wrapHTML(content));
  } catch (err) {
    res.status(500).send(wrapHTML('<h1 class="text-danger">Error reading files</h1>'));
  }
});


// YesNo API with Promise
app.get('/yesno-promise', (req, res) => {
  axios.get('https://yesno.wtf/api')
    .then(response => {
      const { answer, image } = response.data;
      const content = `
        <h1 class="mb-4">YesNo API with Promise</h1>
        <h2>Answer: ${answer}</h2>
        <img src="${image}" alt="${answer}" class="img-fluid mt-3">
        <h2 class="mt-5">Code:</h2>
        <pre class="bg-light p-3 mt-3"><code>
app.get('/yesno-promise', (req, res) => {
  axios.get('https://yesno.wtf/api')
    .then(response => {
      const { answer, image } = response.data;
      res.send(\`
        <h1>Answer: \${answer}</h1>
        <img src="\${image}" alt="\${answer}">
      \`);
    })
    .catch(error => {
      res.status(500).send('Error fetching data from API');
    });
});
        </code></pre>
      `;
      res.send(wrapHTML(content));
    })
    .catch(error => {
      res.status(500).send(wrapHTML('<h1 class="text-danger">Error fetching data from API</h1>'));
    });
});

// YesNo API with async/await
app.get('/yesno-async', async (req, res) => {
  try {
    const response = await axios.get('https://yesno.wtf/api');
    const { answer, image } = response.data;
    const content = `
      <h1 class="mb-4">YesNo API with Async/Await</h1>
      <h2>Answer: ${answer}</h2>
      <img src="${image}" alt="${answer}" class="img-fluid mt-3">
      <h2 class="mt-5">Code:</h2>
      <pre class="bg-light p-3 mt-3"><code>
app.get('/yesno-async', async (req, res) => {
  try {
    const response = await axios.get('https://yesno.wtf/api');
    const { answer, image } = response.data;
    res.send(\`
      <h1>Answer: \${answer}</h1>
      <img src="\${image}" alt="\${answer}">
    \`);
  } catch (error) {
    res.status(500).send('Error fetching data from API');
  }
});
      </code></pre>
    `;
    res.send(wrapHTML(content));
  } catch (error) {
    res.status(500).send(wrapHTML('<h1 class="text-danger">Error fetching data from API</h1>'));
  }
});

// YesNo API with callback
app.get('/yesno-callback', (req, res) => {
  axios.get('https://yesno.wtf/api', (error, response) => {
    if (error) {
      return res.status(500).send(wrapHTML('<h1 class="text-danger">Error fetching data from API</h1>'));
    }
    const { answer, image } = response.data;
    const content = `
      <h1 class="mb-4">YesNo API with Callback</h1>
      <h2>Answer: ${answer}</h2>
      <img src="${image}" alt="${answer}" class="img-fluid mt-3">
      <h2 class="mt-5">Code:</h2>
      <pre class="bg-light p-3 mt-3"><code>
app.get('/yesno-callback', (req, res) => {
  axios.get('https://yesno.wtf/api', (error, response) => {
    if (error) {
      return res.status(500).send('Error fetching data from API');
    }
    const { answer, image } = response.data;
    res.send(\`
      <h1>Answer: \${answer}</h1>
      <img src="\${image}" alt="\${answer}">
    \`);
  });
});
      </code></pre>
    `;
    res.send(wrapHTML(content));
  });
});

// Multiple YesNo API calls
app.get('/multiple-yesno', async (req, res) => {
  try {
    const results = await Promise.all([
      axios.get('https://yesno.wtf/api'),
      axios.get('https://yesno.wtf/api'),
      axios.get('https://yesno.wtf/api')
    ]);

    let responseHtml = '<h1 class="mb-4">Multiple API Calls Results:</h1>';

    results.forEach((result, index) => {
      const { answer, forced, image } = result.data;
      console.log(`Call ${index + 1}:`, { answer, forced, image });
      responseHtml += `
        <h2 class="mt-4">Call ${index + 1}</h2>
        <p>Answer: ${answer}</p>
        <p>Forced: ${forced}</p>
        <img src="${image}" alt="${answer}" style="max-width: 200px;" class="img-fluid mt-2">
      `;
    });

    responseHtml += `
      <h2 class="mt-5">Code:</h2>
      <pre class="bg-light p-3 mt-3"><code>
app.get('/multiple-yesno', async (req, res) => {
  try {
    const results = await Promise.all([
      axios.get('https://yesno.wtf/api'),
      axios.get('https://yesno.wtf/api'),
      axios.get('https://yesno.wtf/api')
    ]);

    let responseHtml = '<h1>Multiple API Calls Results:</h1>';

    results.forEach((result, index) => {
      const { answer, forced, image } = result.data;
      console.log(\`Call \${index + 1}:\`, { answer, forced, image });
      responseHtml += \`
        <h2>Call \${index + 1}</h2>
        <p>Answer: \${answer}</p>
        <p>Forced: \${forced}</p>
        <img src="\${image}" alt="\${answer}" style="max-width: 200px;">
      \`;
    });

    res.send(responseHtml);
  } catch (error) {
    res.status(500).send('Error fetching data from API');
  }
});
      </code></pre>
    `;

    res.send(wrapHTML(responseHtml));
  } catch (error) {
    res.status(500).send(wrapHTML('<h1 class="text-danger">Error fetching data from API</h1>'));
  }
});

app.get('/code-challenge', (req, res) => {
  const asyncAwaitChallenge = `
    async function fetchUserData(userId) {
      const response = await fetch(\`https://api.example.com/users/\${userId}\`);
      const data = await response.json();
      return data;
    }

    async function displayUserName(userId) {
      const userData = fetchUserData(userId);
      console.log(userData.name);
    }

    displayUserName(123);
  `;

  const promiseChallenge = `
    function fetchUserData(userId) {
      return fetch(\`https://api.example.com/users/\${userId}\`)
        .then(response => response.json());
    }

    function displayUserName(userId) {
      fetchUserData(userId).then(userData => {
        console.log(userData.name);
      });
    }

    displayUserName(123);
  `;

  const content = `
    <h1 class="mb-4">Code Challenges</h1>

    <h2 class="mt-5">Async/Await Challenge</h2>
    <p class="lead">Fix the broken async/await code below:</p>
    <pre class="bg-light p-3 mt-3"><code>${asyncAwaitChallenge}</code></pre>
    <p class="mt-3">Hint: There's a bug in how the async function is being used.</p>
    <details class="mt-4">
      <summary class="btn btn-primary">Click to reveal the Async/Await solution</summary>
      <div class="mt-3">
        <pre class="bg-light p-3"><code>
async function fetchUserData(userId) {
  const response = await fetch(\`https://api.example.com/users/\${userId}\`);
  const data = await response.json();
  return data;
}

async function displayUserName(userId) {
  const userData = <b>await</b> fetchUserData(userId);
  console.log(userData.name);
}

displayUserName(123);
        </code></pre>
        <p class="mt-3">Bug fixed:</p>
        <ul>
          <li>Added 'await' before fetchUserData(userId) in the displayUserName function</li>
        </ul>
      </div>
    </details>

    <h2 class="mt-5">Promise Challenge</h2>
    <p class="lead">Fix the broken Promise-based code below:</p>
    <pre class="bg-light p-3 mt-3"><code>${promiseChallenge}</code></pre>
    <p class="mt-3">Hint: There's a bug in how the Promise is being handled.</p>
    <details class="mt-4">
      <summary class="btn btn-primary">Click to reveal the Promise solution</summary>
      <div class="mt-3">
        <pre class="bg-light p-3"><code>
function fetchUserData(userId) {
  return fetch(\`https://api.example.com/users/\${userId}\`)
    .then(response => response.json());
}

function displayUserName(userId) {
  fetchUserData(userId).then(userData => {
    console.log(userData.name);<b>
  }).catch(error => {
    console.error('Error:', error);
  }); </b>
}

displayUserName(123);
        </code></pre>
        <p class="mt-3">Bugs fixed:</p>
        <ul>
          <li>Added error handling with .catch() in the displayUserName function</li>
        </ul>
      </div>
    </details>
  `;

  res.send(wrapHTML(content));
});

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Route to handle form submission
app.post('/subscribe', (req, res) => {
  const { email } = req.body;

  // Write email to a text file
  writeEmailToFile(email, (err) => {
    if (err) {
      console.error('Error writing email to file:', err);
      return res.status(500).send('Error subscribing. Please try again later.');
    }

    // Redirect to thank you page
    res.redirect('/thankyou');
  });
});

// Function to write email to a text file
function writeEmailToFile(email, callback) {
  const filePath = path.join(__dirname, 'subscribed_emails.txt');
  const dataToWrite = `${email}\n`;

  fs.appendFile(filePath, dataToWrite, 'utf8', callback);
}

// Route for the thank you page
app.get('/thankyou', (req, res) => {
  res.send('<h1>Thank you for subscribing!</h1>');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});