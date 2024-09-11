import { User } from "../../domain/models/user.model";
import { IAuthRepository } from "../../domain/repositories/auth.repository";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth"; // Importações necessárias do Firebase
import { auth, provider } from "../firebase/firebase";

export class AuthRepository implements IAuthRepository {
    loginWithGoogle(): Promise<User> {
      return new Promise((resolve, reject) => {
        signInWithPopup(auth, provider)
          .then((result) => {
            const user = result.user;
            if (user) {
              resolve({
                uid: user.uid,
                displayName: user.displayName || '',
                email: user.email || ''
              });
            } else {
              reject(new Error('No user found'));
            }
          })
          .catch(reject);
      });
    }
  
    logout(): Promise<void> {
      return signOut(auth);
    }
  
    onAuthStateChanged(callback: (user: User | null) => void): void {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          callback({
            uid: user.uid,
            displayName: user.displayName || '',
            email: user.email || ''
          });
        } else {
          callback(null);
        }
      });
    }
}
