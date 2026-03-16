/**
 * 使用语言上下文的钩子
 * @returns 语言上下文
 */

import { useContext } from 'react';
import { LocaleContext, LocaleContextType } from '/@/contexts/locale-context';

export const useLocale = (): LocaleContextType => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
