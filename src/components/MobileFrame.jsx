import { Wifi, Battery, Signal } from 'lucide-react';

function MobileFrame({ children }) {
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="mobile-frame">
      {/* Top Phone Status Bar */}
      <div className="phone-status-bar">
        <span className="status-bar-time">{currentTime || '9:41'}</span>
        <div className="dynamic-island" />
        <div className="status-bar-icons">
          <Signal size={12} strokeWidth={2.5} />
          <Wifi size={12} strokeWidth={2.5} />
          <Battery size={13} strokeWidth={2.5} />
        </div>
      </div>

      {/* Screen Content */}
      {children}
    </div>
  );
}

export default MobileFrame;
