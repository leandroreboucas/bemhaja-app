import { AuthCredentialsAPI } from '@domain';

import { storage } from './../storage/storage';

const AUTH_KEY = '@bemhaja:authCredentials';

async function set(ac: AuthCredentialsAPI): Promise<void> {
    await storage.setItem(AUTH_KEY, ac);
}

async function get(): Promise<AuthCredentialsAPI | null> {
    const ac = await storage.getItem<AuthCredentialsAPI>(AUTH_KEY);
    return ac;
}

async function remove(): Promise<void> {
    await storage.removeItem(AUTH_KEY);
}

export const authCredentialsStorage = { set, get, remove };
