import { useMutation, useQuery } from "@tanstack/react-query"
import { auth } from "../firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"

export const useUserRegister = () => {
    return useMutation({
        mutationKey: ['userRegister'],
        mutationFn: async (data: {name:string,email: string, password: string}) => {
            const user = auth?.currentUser;
            if (user) {
                const response = await createUserWithEmailAndPassword(auth, data.email, data.password);
                await updateProfile(user, { displayName: data.name });
                return response;
            }
            throw new Error('User is not authenticated');
        }
    })
}

export const useUserLogin = () => {
    return useMutation({
        mutationKey: ['userLogin'],
        mutationFn: async (data: {email: string, password: string}) => {
            const response = await signInWithEmailAndPassword(auth,data.email, data.password)
            return response
        }
    })
}

export const useGetUserDetails = () => {
    return useQuery({
        queryKey: ['userDetails'],
        queryFn: async () => {
            const user = auth?.currentUser;
            if (user) {
                return user;
            }
            throw new Error('User is not authenticated');
        },
        enabled: true
    })
}