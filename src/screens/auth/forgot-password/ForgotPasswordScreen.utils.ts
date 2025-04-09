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
