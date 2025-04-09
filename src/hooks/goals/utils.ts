import { Goal } from '../../types/goal';

export const convertFirestoreDataToGoal = (id: string, data: any): Goal => {
  return {
    id,
    userId: data.userId,
    name: data.name,
    description: data.description,
    targetAmount: data.targetAmount,
    currentAmount: data.currentAmount,
    startDate: data.startDate?.toDate ? data.startDate.toDate() : new Date(data.startDate),
    endDate: data.endDate?.toDate ? data.endDate.toDate() : new Date(data.endDate),
    status: data.status,
    categoryId: data.categoryId || data.category, // Mendukung backward compatibility
    iconName: data.iconName || data.icon, // Mendukung backward compatibility
    color: data.color,
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(data.createdAt),
    updatedAt: data.updatedAt?.toDate ? data.updatedAt.toDate() : new Date(data.updatedAt),
  };
};

export const handleFirestoreError = (error: any, setError: (error: string | null) => void, setIsOfflineMode: (isOffline: boolean) => void) => {
  console.error('Error in goals operation:', error);
  let errorMessage = 'Gagal mengambil data tujuan keuangan';

  if (error?.code === 'permission-denied') {
    errorMessage = 'Error: Missing or insufficient permissions';
  } else if (error?.message) {
    errorMessage = `Error: ${error.message}`;
  }

  if (error?.code === 'unavailable' || error?.code === 'failed-precondition') {
    setIsOfflineMode(true);
    errorMessage = 'Anda sedang offline. Beberapa data mungkin tidak terupdate.';
    console.log('Fallback to offline mode');
  }

  setError(errorMessage);
};
