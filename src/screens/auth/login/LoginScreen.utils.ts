export const validateEmail = (email: string): string => {
  if (!email) {
    return 'Email tidak boleh kosong';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Format email tidak valid';
  }
  
  return '';
};

export const validatePassword = (password: string): string => {
  if (!password) {
    return 'Password tidak boleh kosong';
  }
  
  if (password.length < 6) {
    return 'Password minimal 6 karakter';
  }
  
  return '';
};
