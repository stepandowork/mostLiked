async function myAsync() {
  return 1+2;
}

myAsync().then( (res)=> console.log(res));

async function myAss() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    if (data.status === 404) {
      throw "Fuck you!";
    }
    return data;
  } catch(error) {
    console.log(error);
  }
}

const getPosts = async () => {
  const posts = await myAss();
  console.log(posts);
}