import { beforeEach, describe, expect, it, vi } from 'vitest';
import formReducer, { FormValues, setInputValue } from '../formSlice';

beforeEach(() => {
  // Мок для localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: vi.fn((key) => {
        return ''; // Возвращаем пустую строку для незаданных ключей
      }),
      setItem: vi.fn(),
    },
    writable: true,
  });
});

describe('formSlice', () => {
  const initialState = {
    values: {
      inputSearch: '',
      inputAddOne: '',
      inputAddTwo: '',
      textareaAdd: '',
    },
  };

  it('should initialize state from localStorage', () => {
    // Устанавливаем начальные значения в localStorage для теста
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('formInputSearch', 'searchValue');
      window.localStorage.setItem('formInputAddOne', 'addOneValue');
      window.localStorage.setItem('formInputAddTwo', 'addTwoValue');
      window.localStorage.setItem('formTextareaAdd', 'textareaValue');
    }

    const state = formReducer(undefined, { type: '' });
    expect(state.values.inputSearch).toBe('searchValue');
    expect(state.values.inputAddOne).toBe('addOneValue');
    expect(state.values.inputAddTwo).toBe('addTwoValue');
    expect(state.values.textareaAdd).toBe('textareaValue');
  });

  it('should set textareaAdd value and update localStorage', () => {
    const newState = formReducer(initialState, setInputValue({ field: 'textareaAdd', value: 'newTextareaValue' }));

    expect(newState.values.textareaAdd).toBe('newTextareaValue');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('formTextareaAdd', 'newTextareaValue');
  });
});
