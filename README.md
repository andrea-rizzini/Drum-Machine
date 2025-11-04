Drum machine version using ```Vite``` as the frontend building tool and ```firebase``` to persistenly store the patterns.
1) ```sudo apt update```
2) Install node: ```sudo apt install -y nodejs```
3) Verify the installation: ```node -v```  
4) Install npm: ```sudo apt install -y npm```  
5) Verify the installation: ```npm -v```  
2) In your terminal, run: ```npm install```
3) To start the development server, run: ```npm run dev```. The app will be available at http://localhost:5173/  

For windows: either use a [WSL](https://ubuntu.com/desktop/wsl) or install node directly from the official [website](https://nodejs.org/en/download).  
If you go with the WSL, make sure to open VS Code’s terminal from WSL (e.g. “Ubuntu” terminal) when running commands ```like npm install``` or ```npm run dev```.  

Notes:  
1) You don’t need to restart the dev server every time you make a change, just save your files and Vite will automatically reload the page with your latest updates.
2) To set up Firebase, copy the following configuration structure into your JavaScript code.
You can find these values in Firebase Console → Your project → Your app settings.  

```
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
}
```
3) For quick local testing you can allow all reads/writes; do not use this in production. Change the security rules you find in Firebase Console → Your project → FireStore Database → Rules, with:

```
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```