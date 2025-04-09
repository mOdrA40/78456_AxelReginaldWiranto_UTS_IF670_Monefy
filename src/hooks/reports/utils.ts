import { Timestamp } from 'firebase/firestore';
import { ChartData } from '../../types';
export const convertTransactionsToChartDataByCategory = (querySnapshot: any): ChartData[] => {
  const categoryMap = new Map<string, number>();
  
  querySnapshot.forEach((doc: any) => {
    const data = doc.data();
    const currentAmount = categoryMap.get(data.category) || 0;
    categoryMap.set(data.category, currentAmount + data.amount);
  });
  
  const chartData: ChartData[] = Array.from(categoryMap.entries()).map(
    ([name, value]) => ({
      id: name,
      name,
      value,
      color: '#000000',
    })
  );
  
  return chartData;
};

export const convertTransactionsToChartDataByPeriod = (
  querySnapshot: any,
  interval: 'day' | 'week' | 'month',
  type: string
): ChartData[] => {
  const periodMap = new Map<string, number>();
  
  querySnapshot.forEach((doc: any) => {
    const data = doc.data();
    const date = data.date instanceof Timestamp ? data.date.toDate() : new Date(data.date);
    let periodKey: string;
    
    switch (interval) {
      case 'day':
        periodKey = date.toLocaleDateString('id-ID', { 
          day: 'numeric',
          month: 'short'
        });
        break;
      case 'week':
        periodKey = `Minggu ${Math.ceil(date.getDate() / 7)}`;
        break;
      case 'month':
        periodKey = date.toLocaleDateString('id-ID', { 
          month: 'long',
          year: 'numeric'
        });
        break;
      default:
        periodKey = date.toLocaleDateString('id-ID');
    }
    
    const currentAmount = periodMap.get(periodKey) || 0;
    periodMap.set(periodKey, currentAmount + data.amount);
  });
  
  const chartData: ChartData[] = Array.from(periodMap.entries()).map(
    ([name, value]) => ({
      id: name,
      name,
      value,
      color: type === 'income' ? '#4CAF50' : '#F44336',
    })
  );
  
  return chartData;
};
