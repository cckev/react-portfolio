const async = new Promise((resolve, reject) => {
    if (true) {
        setTimeout(() => {
            resolve('I have succeeded');
        }, 1000);
    } else {
        reject('I have failed');
    }
})

async.then(value => value + "!!!!")
    .then(value => console.log(value))
    .catch(rejectValue => console.log(rejectValue));


const asyncFunction = async () => {
    try {
        const usersResponse = await fetch('https://jsonplaceholder.typicode.com/usersMISTYPE');

        const users = await usersResponse.json();
        const secondUser = users[1];
        const postsResponse = await fetch('https://jsonplaceholder.typicode.com/posts?user=' + secondUser.id);
        const posts = await postsResponse.json();

        console.log(posts);
    } catch {
        console.log('there was an error');
    }

}

asyncFunction();