/**
 * 语言上下文
 * 
 * 管理应用的语言设置
 */

import { Locale, translations } from '/@/i18n/index';
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 上下文类型定义   
export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: keyof typeof translations) => string;
}

// 创建上下文
export const LocaleContext = createContext<LocaleContextType>({} as LocaleContextType);
