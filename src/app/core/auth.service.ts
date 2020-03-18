import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  authState: any = null; // 用户信息
  userRef: AngularFireObject<any>;

  get authenticated() {
    return this.authState !== null;
  }

  // 当前用户
  get currentUser() {
    return this.authenticated ? this.authState : null;
  }

  get currentUserObservable() {
    return this.afAuth.authState;
  }

  // 当前登录用户id
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  // 用户账号
  get currentUserName(): string {
    if (!this.authState) {
      return 'User';
    } else {
      return this.authState['displayName'] || '佚名';
    }
  }

  // 匿名用户
  get currentUserAnonymous(): boolean {
    return this.authenticated ? this.authState.anonymous : false;
  }

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
    this.afAuth.authState.subscribe(auth => {
      this.authState = auth;
    });
  }

  githubLogin() {
    const provide = new auth.GithubAuthProvider();
    return this.afAuth.auth
      .signInWithPopup(provide)
      .then(credential => {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider();
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        this.authState = credential.user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(user => {
        this.authState = user;
        this.updateUserData();
      })
      .catch(error => console.log(error));
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.authState = user;
        this.updateUserData();
      });
  }

  /**
   *  邮箱注册
   * */
  emailSignUp(email: string, password: string, username : string, name:string) {
    var obj = {email:email, password:password, username:username, name : name};
    // return this.admin.register()
    // return this.afAuth.auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(user => {
    //     this.authState = user;
    //     this.updateUserData();
    //   })
    //   .catch(
    //     error => console.log(error));

  }

  resetPassword(email: string) {
    const fbAuth = auth();
    return fbAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('密码已发到你的邮箱中');
      })
      .catch(error => console.log('密码重置出错', error));
  }

  /**
   *  退出登录
   * */
  signOut() {
    return this.afAuth.auth
      .signOut()
      .then(() => {
        this.authState = null;
      })
      .catch(error => console.log(error));
  }

  private updateUserData() {
    const path = `users/${this.currentUserId}`;
    this.userRef = this.db.object(path);
    const data = {
      email: this.authState.email,
      name: this.authState.displayName
    };

    this.userRef
      .update(data)
      .catch(error => console.log('更新用户数据：', error));
  }
}
