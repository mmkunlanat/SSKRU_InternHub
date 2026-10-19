import React, { useState } from 'react';
import {
  Bell,
  Sun,
  Moon,
  Menu,
  Shield,
  GraduationCap,
  Briefcase,
  UserCheck,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';

export default function Navbar({
  currentRole,
  onRoleChange,
  theme,
  onToggleTheme,
  onToggleMobileMenu,
  studentData,
  activeModuleTitle,
  pendingApprovalsCount = 2
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'student':
        return { label: 'นักศึกษา (Student)', icon: <GraduationCap size={15} />, color: 'var(--primary)' };
      case 'supervisor':
        return { label: 'พนักงานที่ปรึกษา (Supervisor)', icon: <Briefcase size={15} />, color: 'var(--sskru-purple)' };
      case 'advisor':
        return { label: 'อาจารย์นิเทศ (Advisor)', icon: <UserCheck size={15} />, color: 'var(--sskru-gold)' };
      case 'admin':
        return { label: 'ศูนย์ฝึกประสบการณ์ฯ (Admin)', icon: <Shield size={15} />, color: 'var(--danger)' };
      default:
        return { label: 'ผู้ใช้งาน', icon: null, color: 'var(--text-main)' };
    }
  };

  const roleInfo = getRoleBadge(currentRole);

  return (
    <header className="top-navbar">
      <div className="top-navbar-left">
        <button
          className="mobile-menu-btn icon-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <div className="breadcrumb-trail">
          <span>SSKRU InternHub</span>
          <span>/</span>
          <span className="breadcrumb-active">{activeModuleTitle}</span>
        </div>
      </div>

      <div className="top-navbar-right">
        {/* Role Switcher Pill */}
        <div className="role-switcher-container">
          <span className="role-switcher-label">สิทธิ์การใช้งาน:</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: roleInfo.color }}>
            {roleInfo.icon}
            <select
              className="role-select"
              value={currentRole}
              onChange={(e) => onRoleChange(e.target.value)}
              aria-label="Select User Role"
            >
              <option value="student">🎓 นักศึกษา (Student)</option>
              <option value="supervisor">💼 พนักงานที่ปรึกษา (Supervisor)</option>
              <option value="advisor">👨‍🏫 อาจารย์นิเทศ (Advisor)</option>
              <option value="admin">🏛️ ศูนย์ฝึกประสบการณ์ฯ (Admin)</option>
            </select>
          </div>
        </div>

        {/* Theme Toggle Button */}
        <button
          className="icon-btn"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="var(--sskru-gold)" /> : <Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <div style={{ position: 'relative' }}>
          <button
            className="icon-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="การแจ้งเตือน"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {pendingApprovalsCount > 0 && <span className="notification-badge-dot" />}
          </button>

          {showNotifications && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: '0',
                width: '320px',
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 40,
                overflow: 'hidden'
              }}
            >
              <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>การแจ้งเตือนระบบ</span>
                <span className="badge badge-purple">{pendingApprovalsCount} รายการใหม่</span>
              </div>
              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.65rem' }}>
                  <Clock size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>บันทึกเวลาสิ้นเดือนรอรับรอง</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>พนักงานที่ปรึกษาสามารถกดลงลายมือชื่อรับรองเวลาได้</div>
                  </div>
                </div>
                <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', gap: '0.65rem' }}>
                  <FileText size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>Logbook ประจำวันได้รับการอนุมัติ</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>คุณกุลณัฐ ได้อนุมัติบันทึกงานประจำวันเรียบร้อยแล้ว</div>
                  </div>
                </div>
                <div style={{ padding: '0.85rem 1rem', display: 'flex', gap: '0.65rem' }}>
                  <CheckCircle size={16} color="var(--sskru-gold)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>เค้าโครงรายงาน 3 สัปดาห์แรกผ่านแล้ว</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>ผศ.ดร. ธีรเดช เจริญผล ได้อนุมัติเค้าโครงเรียบร้อย</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '0.6rem 1rem', background: 'rgba(0,0,0,0.02)', textAlign: 'center', borderTop: '1px solid var(--border-subtle)' }}>
                <button
                  style={{ background: 'none', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: 600 }}
                  onClick={() => setShowNotifications(false)}
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Pill */}
        <div className="user-profile-badge">
          <img
            src={studentData.avatar}
            alt="Profile Avatar"
            className="user-avatar"
          />
          <div className="user-info-text">
            <div className="user-info-name">
              {currentRole === 'student' && studentData.fullName}
              {currentRole === 'supervisor' && 'คุณกุลณัฐ มงคล'}
              {currentRole === 'advisor' && 'ผศ.ดร. ธีรเดช เจริญผล'}
              {currentRole === 'admin' && 'ศูนย์ฝึกประสบการณ์ฯ'}
            </div>
            <div className="user-info-role">
              {currentRole === 'student' && `รหัสนักศึกษา ${studentData.id}`}
              {currentRole === 'supervisor' && 'Job Supervisor'}
              {currentRole === 'advisor' && 'อาจารย์นิเทศ'}
              {currentRole === 'admin' && 'System Admin'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
