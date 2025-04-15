import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getSessionData(){
  const store = JSON.parse(sessionStorage.getItem('store') || '{}');
  console.log('Store data from session:', store);
  return store;
}







