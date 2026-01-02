import React from 'react';
import { render, act, fireEvent } from '@testing-library/react-native';
import { AppProvider, useApp } from '../src/context/AppContext';
import { Text, Button, View } from 'react-native';

const TestComponent = () => {
  const { credits, deductCredits, history, addToHistory } = useApp();
  return (
    <View>
      <Text testID="credits">{credits}</Text>
      <Text testID="history-count">{history.length}</Text>
      <Button title="Deduct" onPress={() => deductCredits(50)} />
      <Button title="Add History" onPress={() => addToHistory({ name: 'Test', source: 'Test', platform: 'Test', status: 'Completed', type: 'file' })} />
    </View>
  );
};

describe('AppContext', () => {
  it('deducts credits correctly', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(getByTestId('credits').children[0]).toBe('850');
    fireEvent.press(getByText('Deduct'));
    expect(getByTestId('credits').children[0]).toBe('800');
  });

  it('adds history correctly', () => {
    const { getByTestId, getByText } = render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    const initialCount = parseInt(getByTestId('history-count').children[0] as string);
    fireEvent.press(getByText('Add History'));
    expect(getByTestId('history-count').children[0]).toBe((initialCount + 1).toString());
  });
});
