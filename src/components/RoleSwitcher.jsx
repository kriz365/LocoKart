import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const roles = [
  { key: 'customer', label: '🛍️ Customer' },
  { key: 'merchant', label: '🏪 Merchant' },
  { key: 'rider', label: '🛵 Rider' },
];

function RoleSwitcher() {
  const { role, setRole } = useApp();
  const navigate = useNavigate();

  const handleSwitch = (r) => {
    setRole(r);
    navigate(`/${r}`);
  };

  return (
    <div className="role-switcher">
      <span className="role-switcher-label">Switch Role</span>
      <div className="role-switcher-buttons">
        {roles.map((r) => (
          <button
            key={r.key}
            className={`role-btn${role === r.key ? ' active' : ''}`}
            onClick={() => handleSwitch(r.key)}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoleSwitcher;
