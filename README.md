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
      apiKey: (your api key),
      authDomain: (your auth domain),
      projectId: (your project ID),
      storageBucket: (your storage bucket),
      messagingSenderId: (your messagingsenderID),
      appId: (your app ID),
      measurementId: (your measurement ID)
  };

  firebase.initializeApp(firebaseConfig);

  export const firestore = firebase.firestore();
  export const auth = firebase.auth();
  export default firebase;
```
- Use the comman `npm start` to run the app locally
