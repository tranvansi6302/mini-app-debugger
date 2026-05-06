/**
 * @file layouts/MainLayout.tsx
 * @description Layout chính của ứng dụng — bao gồm Container nội dung và Thanh điều hướng dưới (BottomBar).
 */
import React, { useEffect } from 'react';
import { useLocation, useRouterStore } from 'ejsc-ma-router';
import type { IRouterStoreState } from 'ejsc-ma-router';
import { BottomBar, useNavBar } from 'ejsc-ma-component';
import { apisAsync, type IEjscSetNavigationBarOptions } from 'ejsc-ma-api';
import { getRouterConfig } from '../navigation/router-config';

const routerConfigData = getRouterConfig();

import { Home, Terminal, Sparkles, Info } from 'lucide-react';

/** 
 * Hàm ánh xạ tên icon sang Lucide icons. 
 * Giúp tùy biến giao diện thanh điều hướng dễ dàng.
 */
const getIcon = (name: string) => {
  switch (name) {
    case 'home':
    case 'overview':
    case 'grid':
      return <Home size={18} />;
    case 'api':
    case 'code':
      return <Terminal size={18} />;
    case 'ui-ux':
    case 'sparkles':
      return <Sparkles size={18} />;
    case 'about':
    case 'circle-info':
      return <Info size={18} />;
    default:
      return <Home size={18} />;
  }
};

/**
 * MemoizedBottomBar - Thanh điều hướng dưới cùng, tối ưu để không render lại khi trang cuộn.
 */
interface IBottomBarProps {
  show: boolean;
  items: Array<{ path: string; icon: string; name: string }>;
  currentPath: string;
}

const MemoizedBottomBar = React.memo(({ show, items, currentPath }: IBottomBarProps) => {
  if (!show) return null;
  return (
    <BottomBar>
      {items.map((tab) => (
        <BottomBar.Item
          key={tab.path}
          path={tab.path}
          isActive={currentPath === tab.path}
          icon={getIcon(tab.icon)}
          label={tab.name}
        />
      ))}
    </BottomBar>
  );
});

interface MainLayoutProps {
  children?: React.ReactNode;
}

/**
 * MainLayout - Vỏ bọc ứng dụng, quản lý sự đồng bộ giữa Web và Native Navigation.
 */
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const pageLocation = useLocation();
  
  // Lấy trạng thái Router từ Store
  const isTransitioning = useRouterStore((s: IRouterStoreState) => s.isPending);
  const histories = useRouterStore((s: IRouterStoreState) => s.histories);
  const globalLastHistory = histories[histories.length - 1];
  
  // Kiểm tra instance Layout này có đang ở trên cùng (Active) không
  const isActive = globalLastHistory?.location?.key === pageLocation.key;
  
  const { updateNavBar } = useNavBar();

  const currentPage = routerConfigData.pages.find(p => p.pathname === pageLocation.pathname);
  const showAppBar = currentPage?.showAppBar ?? true;
  const showBottomNav = currentPage?.showBottomNav ?? true;

  /** 
   * Đồng bộ hóa Header (AppBar) giữa các môi trường.
   * Khi một trang mới được mount, Layout sẽ báo cho Bridge và NavBarContext cập nhật UI.
   */
  useEffect(() => {
    if (isActive && currentPage) {
      // Thiết lập thanh điều hướng Native Bridge
      const navOptions: IEjscSetNavigationBarOptions = {
        visible: false, // Luôn ẩn Native Bar để dùng Web Custom Bar cho mượt
        immersive: true,
        title: currentPage.appBar.type === 'native' ? currentPage.appBar.title : '',
        backIcon: currentPage.appBar.type === 'native' ? (currentPage.appBar.backIcon || (pageLocation.pathname === '/' ? 'none' : 'arrow')) : 'none'
      };
      
      apisAsync.setNavigationBar(navOptions);

      // Cập nhật Simulator NavBar (Dùng cho môi trường Browser/Debug)
      if (!showAppBar) {
        updateNavBar({ visible: false, title: '', backIcon: 'none' });
      } else if (currentPage.appBar.type === 'native') {
        updateNavBar({ 
          visible: true, 
          title: currentPage.appBar.title, 
          backIcon: currentPage.appBar.backIcon || (pageLocation.pathname === '/' ? 'none' : 'arrow') 
        });
      } else {
        updateNavBar({ visible: false, title: '', backIcon: 'none' });
      }
    }
  }, [isActive, pageLocation.pathname, updateNavBar, currentPage, showAppBar]);

  return (
    <div
      className="app-layout"
      style={{ 
        pointerEvents: isTransitioning ? 'none' : 'auto', // Chặn tương tác khi đang animation chuyển trang
        background: 'var(--color-ejsc-bg-page)'
      }}
    >
      {/* Vùng nội dung chính của trang */}
      <main className="app-main">
        {children}
      </main>

      {/* Thanh Bottom Nav */}
      <MemoizedBottomBar 
        show={showBottomNav} 
        items={routerConfigData.bottomTabBar.items} 
        currentPath={pageLocation.pathname} 
      />
    </div>
  );
};

export default React.memo(MainLayout);
