/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const logData = ({ data }) => {
  console.log(data);
};

const myProfile = "depadiernos";
const myFollowers = "depadiernos/followers";
const instructors = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

const getUser = (endpoint, callback) => {
  axios
    .get(`https://api.github.com/users/${endpoint}`)
    .then(response => callback(response))
    .catch(error => console.log(error));
};

const cardComponent = ({ data }) => {
  let card = document.createElement("div");
  card.className = "card";

  const elementCreator = (parent, type, elementAttribute, content) => {
    let element = document.createElement(type);
    elementAttribute
      ? element.setAttribute(elementAttribute[0], elementAttribute[1])
      : null;
    content ? (element.textContent = content) : null;
    parent.appendChild(element);
    return element;
  };

  let avatar = elementCreator(card, "img", ["src", data.avatar_url]);
  let cardInfo = elementCreator(card, "div", ["class", "card-info"]);
  let name = elementCreator(cardInfo, "h3", ["class", "name"], data.name);
  let username = elementCreator(
    cardInfo,
    "p",
    ["class", "username"],
    data.login
  );
  let location = elementCreator(
    cardInfo,
    "p",
    null,
    `Location: ${data.location}`
  );
  let profile = elementCreator(cardInfo, "p");
  let profileLink = elementCreator(profile, "a", ["href", data.url], data.url);
  let followers = elementCreator(
    cardInfo,
    "p",
    null,
    `Followers: ${data.followers}`
  );
  let following = elementCreator(
    cardInfo,
    "p",
    null,
    `Following: ${data.following}`
  );
  let bio = elementCreator(cardInfo, "p", null, `Bio: ${data.bio}`);
  document.querySelector(".cards").appendChild(card);
};

const addFollowers = ({ data }) => {
  data.map(follower => {
    followerData = {data: follower}
    cardComponent(followerData);
  });
};
instructors.forEach(profile => getUser(profile, cardComponent));
getUser(myProfile, cardComponent);
getUser(myFollowers, addFollowers);

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>
*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
