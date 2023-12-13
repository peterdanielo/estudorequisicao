//'https:jsonplaceholder.typicode.com/posts'

const insertButton = document.querySelector('#insertButton');

async function readPosts() {
  const postArea = document.querySelector('.posts');
  postArea.innerHTML = 'Carregando...';

  const response = await fetch('https:jsonplaceholder.typicode.com/posts');
  const json = await response.json();

  if (json.length > 0) {
    postArea.innerHTML = '';

    // for (let i in json) {
    //   const postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr/></div>`;
    //   postArea.innerHTML += postHtml;
    // }

    json.forEach(item => {
      const postHtml = `<div><h1>${item.title}</h1>${item.body}<hr/></div>`;
      postArea.innerHTML += postHtml;
    });

  } else {
    postArea.innerHTML = 'Nenhum post para exibir';
  }

}

readPosts();

async function addNewPost(title, body) {
  await fetch(
    'https:jsonplaceholder.typicode.com/posts',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        body,
        userId: 2
      })
    }
  );
  console.log(title, body)
  document.querySelector('#titleField').value = '';
  document.querySelector('#bodyField').value = '';

  readPosts();
}

insertButton.addEventListener('click', () => {
  const title = document.querySelector('#titleField').value;
  const body = document.querySelector('#bodyField').value;

  if (title && body) {
    addNewPost(title, body);
  } else {
    alert('Preencha todos os campos!');
  }
});