import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/store';
// scrollManager.ts
import { setScrollPosition } from '@/store/scrollStore';
import { useEffect } from 'react';

export const useScrollManager = () => {
  const dispatch = useDispatch();
  const scrollPosition = useSelector((state: RootState) => state.scroll.scrollPosition);

  useEffect(() => {
    // Восстанавливаем позицию прокрутки при загрузке страницы
    const savedScrollPosition = localStorage.getItem('scrollPosition');
    if (savedScrollPosition) {
      dispatch(setScrollPosition(Number(savedScrollPosition)));
      window.scrollTo(0, Number(savedScrollPosition));
    }

    const handleScroll = () => {
      // Сохраняем позицию прокрутки при прокручивании
      const currentScrollPosition = window.scrollY;
      dispatch(setScrollPosition(currentScrollPosition));
      localStorage.setItem('scrollPosition', currentScrollPosition.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);
};
