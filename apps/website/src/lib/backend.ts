import { localStorageStore } from "@skeletonlabs/skeleton";
import { get, writable, type Writable } from "svelte/store";

export type User = {
    id: string;
    username: string;
    email: string;
}

export type Tokens = {
    at: string;
    rt: string;
}

export const userStore: Writable<User|null> = localStorageStore('user', null);
export const tokenStore: Writable<Tokens|null> = localStorageStore('tokens', null);

export function logoutUser(){
    userStore.set(null);
}

export class VenuezApi {
	
    baseUrl: string;

    constructor(baseUrl: string){
        this.baseUrl = baseUrl;
    }

    public async login(usernameOrEmail: string, password: string){
        const res = await fetch(this.baseUrl + '/auth/login',
        {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({usernameOrEmail: usernameOrEmail, password: password})});
        const json: Tokens = await res.json();
        tokenStore.set(json);
    }

    public async register(username: string, email: string, password: string) {
		const res = await fetch(this.baseUrl + '/auth/register', 
        {method: 'POST', headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, email: email, password: password})} );
        const json = await res.json();
        tokenStore.set(json);
	}
    public async getCurrentUser(at: string = ''){
        if (get(tokenStore)?.at){
            const at = get<Tokens|null>(tokenStore)?.at; 
            const res = await fetch(this.baseUrl + '/auth/current',
            {
            method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${at}`}
            });
            const json = await res.json();
            userStore.set(json);
        }
    }
}