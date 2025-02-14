import { create } from 'zustand';
export const useName = create((set) => {
	return {
		name: localStorage.getItem('name') || '',
		setName: (name) => {
			set({ name });
			localStorage.setItem('name', name);
		},
		clearName: () => {
			set({ name: '' });
			localStorage.removeItem('name');
		},
	};
});
