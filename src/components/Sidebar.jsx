import React from 'react';
import {
  User,
  Clock,
  Calendar,
  ClipboardCheck,
  Star,
  Award,
  BookOpen,
  FileSpreadsheet,
  LayoutDashboard,
  ShieldAlert,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function Sidebar({
  activeModule,
  onSelectModule,
  isOpen,
  onCloseMobile,
  currentRole,
  isVoided
}) {
  const menuItems = [
    {
      id: 'module1',
      title: 'ข้อมูลนักศึกษาและหน่วยงาน',
      subtitle: 'ส่วนที่ 1: Profile & Company',
      icon: <User size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'module2',
      title: 'ระบบลงเวลาปฏิบัติงาน',
      subtitle: 'ส่วนที่ 2: Time Attendance',
      icon: <Clock size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin'],
      badge: isVoided ? 'โมฆะ' : null,
      badgeColor: 'var(--danger)'
    },
    {
      id: 'module7',
      title: 'สมุดบันทึกรายวัน (Logbook)',
      subtitle: 'ส่วนที่ 7: Daily Tasks & Analytics',
      icon: <BookOpen size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'module3',
      title: 'แบบรายงานประจำเดือน',
      subtitle: 'ส่วนที่ 3: Monthly Progress',
      icon: <Calendar size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'module4',
      title: 'บันทึกการนิเทศฝึกงาน',
      subtitle: 'ส่วนที่ 4: Advisor Supervision',
      icon: <ClipboardCheck size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'module5',
      title: 'แบบประเมินผล 24 ข้อ',
      subtitle: 'ส่วนที่ 5: Confidential Evaluation',
      icon: <Star size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin'],
      badge: currentRole === 'student' ? 'ความลับ' : null,
      badgeColor: 'var(--sskru-gold)'
    },
    {
      id: 'module8',
      title: 'เค้าโครงและเล่มรายงาน',
      subtitle: 'ส่วนที่ 8: Proposal & Final Report',
      icon: <FileSpreadsheet size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'module6',
      title: 'ประกาศนียบัตรรับรอง',
      subtitle: 'ส่วนที่ 6: Certificate of Completion',
      icon: <Award size={18} />,
      roles: ['student', 'supervisor', 'advisor', 'admin']
    },
    {
      id: 'admin_overview',
      title: 'ศูนย์บริหารจัดการภาพรวม',
      subtitle: 'Admin & Center Dashboard',
      icon: <LayoutDashboard size={18} />,
      roles: ['advisor', 'admin']
    }
  ];

  return (
    <>
      <aside className={`app-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-badge">
            S
          </div>
          <div className="brand-text">
            <h1>SSKRU InternHub</h1>
            <p>CoopFlow System v2.5</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">โมดูลระบบฝึกงาน (SRS Modules)</div>
          {menuItems.map((item) => {
            const isAccessible = item.roles.includes(currentRole);
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  onSelectModule(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                style={{
                  opacity: isAccessible ? 1 : 0.45,
                  cursor: isAccessible ? 'pointer' : 'default'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <span style={{ color: isActive ? '#ffffff' : 'inherit' }}>
                    {item.icon}
                  </span>
                  <div style={{ textAlign: 'left', overflow: 'hidden' }}>
                    <div style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: isActive ? 'rgba(255,255,255,0.8)' : '#64748b' }}>
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className="nav-badge"
                    style={{ backgroundColor: item.badgeColor, color: '#ffffff' }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          {isVoided && (
            <div className="alert-box alert-danger" style={{ padding: '0.75rem', margin: 0, fontSize: '0.78rem' }}>
              <ShieldAlert size={16} style={{ flexShrink: 0 }} />
              <div>
                <strong>สถานะ: โมฆะ (เกรด E)</strong>
                <div>ตรวจพบการทุจริตเวลา</div>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
            ศูนย์ฝึกประสบการณ์วิชาชีพและสหกิจศึกษา<br />
            มหาวิทยาลัยราชภัฏศรีสะเกษ
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 25
          }}
        />
      )}
    </>
  );
}
