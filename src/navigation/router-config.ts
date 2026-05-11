/**
 * @file router-config.ts
 * @description Cấu hình Router tinh giản bao gồm HomeScreen và các trang khác.
 */
import HomeScreen from '../screens/HomeScreen';
import OverviewScreen from '../screens/OverviewScreen';
import AboutScreen from '../screens/AboutScreen';
import ApiScreen from '../screens/ApiScreen';
import UiUxScreen from '../screens/UiUxScreen';
import LoginScreen from '../screens/LoginScreen';
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
      Component: HomeScreen,
      animation: 'none',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/overview',
      Component: OverviewScreen,
      animation: 'slide_left',
      appBar: { type: 'native', title: 'Overview', backIcon: 'none' }
    },
    {
      pathname: '/api',
      Component: ApiScreen,
      animation: 'slide_left',
      appBar: { type: 'custom' },
      showAppBar: false
    },
    {
      pathname: '/ui-ux',
      Component: UiUxScreen,
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
      { id: 'home', name: 'Trang chủ', path: '/', icon: 'home' },
      { id: 'overview', name: 'Overview', path: '/overview', icon: 'grid' },
      { id: 'api', name: 'APIs', path: '/api', icon: 'code' },
      { id: 'ui-ux', name: 'UI/UX', path: '/ui-ux', icon: 'sparkles' },
      { id: 'about', name: 'About', path: '/about', icon: 'circle-info' },
    ]
  }
});
