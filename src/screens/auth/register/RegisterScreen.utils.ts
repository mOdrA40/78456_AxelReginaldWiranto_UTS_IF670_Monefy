import { FormData, FormErrors } from './RegisterScreen.types';

/**
 * Validasi nama
 */
export const validateName = (name: string): string => {
  if (!name.trim()) {
    return 'Nama tidak boleh kosong';
  }
  
  if (name.length < 3) {
    return 'Nama minimal 3 karakter';
  }
  
  return '';
};

/**
 * Validasi email
 */
export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email tidak boleh kosong';
  }
  
  // Membersihkan email dari spasi yang tidak diinginkan
  const trimmedEmail = email.trim();
  
  // Validasi format email dengan regex yang lebih ketat sesuai standar Firebase
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmedEmail)) {
    return 'Format email tidak valid';
  }
  
  // Validasi tambahan untuk mencegah karakter khusus yang tidak valid
  if (trimmedEmail.includes('..') || trimmedEmail.startsWith('.') || trimmedEmail.endsWith('.')) {
    return 'Email mengandung format yang tidak valid';
  }
  
  // Validasi domain email
  const domain = trimmedEmail.split('@')[1];
  if (!domain || !domain.includes('.') || domain.split('.')[1].length < 2) {
    return 'Domain email tidak valid';
  }
  
  return '';
};

/**
 * Validasi password
 */
export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password tidak boleh kosong';
  }
  
  if (password.length < 6) {
    return 'Password minimal 6 karakter';
  }
  
  // Validasi kekuatan password (opsional)
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (!(hasUpperCase && hasLowerCase && hasNumbers)) {
    return 'Password harus mengandung huruf besar, huruf kecil, dan angka';
  }
  
  return '';
};

/**
 * Validasi konfirmasi password
 */
export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
  if (!confirmPassword) {
    return 'Konfirmasi password tidak boleh kosong';
  }
  
  if (password !== confirmPassword) {
    return 'Konfirmasi password tidak cocok';
  }
  
  return '';
};

/**
 * Validasi seluruh form
 */
export const validateForm = (formData: FormData): FormErrors => {
  const { name, email, password, confirmPassword } = formData;
  
  return {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword)
  };
};

/**
 * Cek apakah form valid
 */
export const isFormValid = (errors: FormErrors): boolean => {
  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword;
};
