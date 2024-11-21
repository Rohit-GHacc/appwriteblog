import conf from '../config/config.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);

    }

 
    async createAccount({email, password, name}) {
        console.log(conf)
        console.log(conf.appwriteUrl)
         try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                console.log("ban gaya")
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async resetPassword(email) {
        try {
            // Use Appwrite's createRecovery method for password reset
            const response = await this.account.createRecovery(email);
            return response;  // Returns the response (email sent)
        } catch (error) {
            throw new Error(error.message);  // Propagate the error message
        }
    }

    async updateUserProfile(data) {
        return await this.account.updatePrefs(data); // Modify this based on Appwrite's user structure
    }

    async getUserProfile(){
        return await this.account.getPrefs();
    }

    async updateName(data){
        return await this.account.updateName(data);
    };

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService

