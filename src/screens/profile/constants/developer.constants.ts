import { DeveloperInfo, SocialMediaItem } from '../types/developer.types';

/**
 * Data social media pengembang
 */
export const SOCIAL_MEDIA_ITEMS: SocialMediaItem[] = [
  {
    platform: 'GitHub',
    icon: 'logo-github',
    url: 'https://github.com/axelregina',
  },
  {
    platform: 'LinkedIn',
    icon: 'logo-linkedin',
    url: 'https://www.linkedin.com/in/axelregina',
  },
  {
    platform: 'Instagram',
    icon: 'logo-instagram',
    url: 'https://www.instagram.com/axelregina',
  },
];

/**
 * Data informasi pengembang
 */
export const DEVELOPER_INFO: DeveloperInfo = {
  name: 'Axel Reginald Wiranto',
  role: 'Mobile Developer',
  university: 'Universitas Multimedia Nusantara',
  department: 'Informatika',
  year: '2024',
  socialMedia: SOCIAL_MEDIA_ITEMS,
  description: 'Saya adalah seorang mahasiswa Informatika yang memiliki minat dalam pengembangan aplikasi mobile. Aplikasi ini dibuat sebagai bagian dari tugas mata kuliah Mobile Cross Platform. Saya berharap aplikasi ini dapat membantu pengguna dalam mengelola keuangan pribadi mereka dengan lebih baik.',
};
