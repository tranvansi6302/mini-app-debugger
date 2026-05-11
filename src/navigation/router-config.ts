/**
 * @file router-config.ts
 * @description Cấu hình Router tinh giản bao gồm HomeScreen và các trang khác.
 */
// HomeScreen giữ nguyên file nhưng không dùng trong router hiện tại
// import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen'; // Giữ nguyên, không xóa
import DeepLinkHomeScreen from '../screens/DeepLinkHomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ApiScreen from '../screens/ApiScreen';
import SwitchAppScreen from '../screens/SwitchAppScreen';
import AccountScreen from '../screens/AccountScreen';
import LoginScreen from '../screens/LoginScreen'; // giữ nguyên file
import React from 'react';

export type AnimationType = 'none' | 'slide_left' | 'slide_up' | 'fade_in';

/** Cấu hình cho AppBar Native */
export interface INativeAppBar {
  type: 'native';
  title: string;
  backIcon?: 'arrow' | 'none';
  backgroundColor?: string;
  textColor?: string;
}

/** Cấu hình cho AppBar Custom */
export interface ICustomAppBar {
  type: 'custom';
  Component?: React.ComponentType<any>;
}

export type AppBarConfig = INativeAppBar | ICustomAppBar;

export interface IRouterPageConfig {
  pathname: string;
  Component: React.ComponentType<any>;
  animation: AnimationType;
  appBar: AppBarConfig;
  showAppBar?: boolean;
  showBottomNav?: boolean;
}

export interface IRouterConfig {
  pages: IRouterPageConfig[];
  bottomTabBar: {
    items: { id: string; name: string; path: string; icon: string }[];
  };
}

export const getRouterConfig = (): IRouterConfig => ({
  pages: [
    {
      pathname: '/',
      Component: DeepLinkHomeScreen, // OverviewScreen cũ vẫn giữ nguyên
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },

    {
      pathname: '/api',
      Component: ApiScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/switch-app',
      Component: SwitchAppScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/about',
      Component: AboutScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/account',
      Component: AccountScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/login',
      Component: LoginScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false,
      showBottomNav: false
    },
  ],
  bottomTabBar: {
    items: [
      { id: 'overview', name: 'Home', path: '/', icon: 'link' },
      { id: 'api', name: 'APIs', path: '/api', icon: 'code' },
      { id: 'about', name: 'About', path: '/about', icon: 'circle-info' },
      { id: 'account', name: 'Tài khoản', path: '/account', icon: 'user' },
    ]
  }
});
