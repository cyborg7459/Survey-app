## How to run this project locally

- Clone the given repository into your device
- Run the command `npm install` in your terminal in the root directory of the project to install the various dependencies
- You'll have to setup your firebase database for the project. For that create an account on Google Firebase and then add a project. After your project is created, you'll get credentials like apiKey, authDomain, etc. Keep these details handy as you'd need them in the next step
- In the src/ folder, create another folder by the name firebase and add create a file by the name firebase.utils.js
- Within that file copy-paste the following code
 ```
  import firebase from 'firebase/app';`
  import 'firebase/firestore';
  import 'firebase/auth';

  const firebaseConfig = {
      apiKey: "AIzaSyAT3ucUhVw2cKbgTu9Zp_kv0q2E8WZKtRY",
      authDomain: "opinion-poll-8604c.firebaseapp.com",
      projectId: "opinion-poll-8604c",
      storageBucket: "opinion-poll-8604c.appspot.com",
      messagingSenderId: "1058779521374",
      appId: "1:1058779521374:web:40f8ac5d519856f5b8efcf",
      measurementId: "G-VSN4FCJGND"
  };

  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();
  export default firebase;
```
- Use the comman `npm start` to run the app locally
