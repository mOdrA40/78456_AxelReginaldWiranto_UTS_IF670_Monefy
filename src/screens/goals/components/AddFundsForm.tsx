import React, { useState, memo } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/GoalDetailScreen.styles';
import { AddFundsFormProps } from '../types/GoalDetailScreen.types';
import { validateAmount, formatCurrencyInput, parseCurrencyInput } from '../utils';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';

/**
 * Komponen untuk form tambah dana
 */
const AddFundsForm: React.FC<AddFundsFormProps> = ({ 
  onAddFunds, 
  onCancel,
  disabled = false
}) => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  
  const handleAmountChange = (value: string) => {
    const formattedValue = formatCurrencyInput(value);
    setAmount(formattedValue);
    
    if (error) {
      setError('');
    }
  };
  
  const handleSubmit = () => {
    const validationError = validateAmount(amount);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    const numericAmount = parseCurrencyInput(amount);
    onAddFunds(numericAmount);
    setAmount('');
  };
  
  return (
    <View style={styles.addFundsForm}>
      <Input
        label="Jumlah Dana"
        placeholder="Masukkan jumlah dana"
        value={amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
        error={error}
        prefix="Rp"
        touched={true}
      />
      
      <View style={styles.formButtons}>
        <Button
          title="Batal"
          onPress={onCancel}
          style={{ flex: 1, marginRight: 8, backgroundColor: '#f1f1f1' }}
          textStyle={{ color: '#333' }}
          disabled={disabled}
        />
        <Button
          title="Tambah Dana"
          onPress={handleSubmit}
          style={{ flex: 1 }}
          disabled={disabled || !amount}
        />
      </View>
    </View>
  );
};

export default memo(AddFundsForm);
