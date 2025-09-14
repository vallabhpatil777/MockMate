'use server';

import { User } from "firebase/auth";
import { auth, db } from "../../../firebase/admin";
import { cookies } from "next/headers";
import { CollectionReference, DocumentData } from "firebase-admin/firestore";
import { use } from "react";


interface AppUser {
    uid: string
    name?: string
    email?: string
  }
  

const oneWeek = 60 * 60 * 24 * 7 ;

export async function signUp (params : SignUpParams){
 const { uid, name , email } = params;

 try {
    const userRecord = await db.collection('users').doc(uid).get()
    if (userRecord.exists) {
        return {
            success: false,
            message: 'User already exists. Please sign in instead.'
        }
    }

    await db.collection('users').doc(uid).set({
        name,
        email
    })
    console.error('Sign Up', params);
    return{
        success: true,
        message: 'Account created successfully. Please sign in.'
    }
 }
 catch (error:any) {
    console.error('Error creating an user:', error);
    if(error.code === 'auth/email-already-exists'){
        return {
            success: false,
            message: 'Email already in use'
        }
    }
    return {
        success: false,
        message: 'Something went wrong. Please try again later.'
        }
 }
}

export async function signIn (params: SignInParams){
    const { email, idToken } = params;

    try {

        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return {
                success: false,
                message: 'No user found with this email. Please sign up first.'
            }
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: 'Signed in successfully.'
        }

    }

    catch (error:any) {
        console.error('Error signing in:', error);
        return {
            success: false,
            message: 'Failed to Log in to an account. Please try again later.'
        }
    }
}


export async function setSessionCookie(idToken: string){
const cookieStore = await cookies();
const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: oneWeek*1000}); 
cookieStore.set('session', sessionCookie, {httpOnly: true, maxAge: oneWeek, secure: process.env.NODE_ENV === 'production', sameSite: 'lax'})
}


export async function getCurrentUser(): Promise<AppUser | null> {


    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;
    
    if (!sessionCookie) {
        return null;
    }
    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.
        collection('users').
        doc(decodedClaims.uid).get();

        if (!userRecord.exists) {
            return null;
        }
        return {
            ...userRecord.data(),
            uid:userRecord.id

        } as AppUser;
        
    } catch (error) {
        console.error(error);
        return null;
    }
}


export async function isAuthenticated() {
    const user = await getCurrentUser();
    return !!user;

}

export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
const interviews = await db.collection('interviews').where('userId', '==', userId).orderBy('createdAt','desc').get();

return interviews.docs.map((doc) => ({id: doc.id, ...doc.data()})) as Interview[];

}


export async function getLatestInterview(params : GetLatestInterviewsParams): Promise<Interview[] | null> {
    const {userId, limit = 20} = params;
    
    
    const interviews = await db.collection('interviews').where('finalized', '==', true).where('userId', '!=', userId).orderBy('createAt','desc').limit(limit).get();
    
    return interviews.docs.map((doc) => ({id: doc.id, ...doc.data()})) as Interview[];
    
    }