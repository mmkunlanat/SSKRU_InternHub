import React from 'react';
import {
  LayoutDashboard,
  Users,
  Building,
  CheckCircle,
  ShieldAlert,
  GraduationCap,
  Award,
  Clock,
  Search,
  Filter,
  FileCheck,
  TrendingUp
} from 'lucide-react';

export default function ModuleAdminOverview({
  studentData,
  companyData,
  attendanceList,
  isVoided,
  voidReason,
  onToggleVoid,
  onSelectModule
}) {
  const presentCount = attendanceList.filter((a) => a.status === 'present').length;
  const hoursCompleted = presentCount * 8; // approx 8 hours per day

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">ศูนย์ฝึกประสบการณ์วิชาชีพฯ</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Admin & Center Management</span>
        </div>
        <h2 className="hero-title">ศูนย์บริหารจัดการภาพรวม (CoopFlow Center)</h2>
        <p className="hero-subtitle">
          ตรวจสอบสถานะนักศึกษาฝึกงาน ภาพรวมการประเมินผล จัดการเกรด ตรวจสอบการทุจริต และออกรายงานสถิติสำหรับผู้บริหาร
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">128 คน</span>
            <span className="hero-stat-label">นักศึกษาฝึกงานทั้งหมด</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">46 แห่ง</span>
            <span className="hero-stat-label">สถานประกอบการพันธมิตร</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              94.2%
            </span>
            <span className="hero-stat-label">อัตราผ่านการประเมิน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: isVoided ? 'var(--danger)' : 'var(--sskru-gold-light)' }}>
              {isVoided ? "1 ราย (ตรวจพบ)" : "0 ราย"}
            </span>
            <span className="hero-stat-label">คดีทุจริตเวลา (เกรด E)</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Admin Widgets */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Users size={18} />
              </div>
              <h4 className="card-title">สรุปสถานะการลงเวลา</h4>
            </div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.25rem' }}>
              {presentCount} / {attendanceList.length} วัน
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              นักศึกษาบันทึกเวลาสม่ำเสมอ รวมเวลาปฏิบัติงานจริงสะสม {hoursCompleted} ชม.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onSelectModule('module2')}>
                ดูบันทึกเวลาละเอียด
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                <FileCheck size={18} />
              </div>
              <h4 className="card-title">ความคืบหน้าการส่งเอกสาร</h4>
            </div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--sskru-purple)', marginBottom: '0.25rem' }}>
              ครบถ้วน 100%
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              เค้าโครง 3 สัปดาห์แรกผ่านแล้ว และส่งรายงานฉบับแยกข้อมูลลับเรียบร้อย
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onSelectModule('module8')}>
                ดูเล่มรายงาน
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'var(--sskru-gold)', color: '#fff' }}>
                <Award size={18} />
              </div>
              <h4 className="card-title">ผลการประเมิน 24 ข้อ</h4>
            </div>
          </div>
          <div className="card-body">
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--sskru-gold-dark)', marginBottom: '0.25rem' }}>
              เกรด {isVoided ? "E (โมฆะ)" : "A (95%)"}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              พนักงานที่ปรึกษาประเมิน 24 ข้อ ครบ 4 หมวด ผลงานระดับดีเยี่ยม
            </p>
            <div style={{ marginTop: '1rem' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => onSelectModule('module5')}>
                ดูแบบประเมิน 24 ข้อ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Student List Table in Admin View */}
      <div className="card">
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon-badge">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="card-title">รายชื่อนักศึกษาและสถานะการตรวจสอบภาพรวม</h3>
              <p className="card-subtitle">ข้อมูลการฝึกงาน คณะศิลปศาสตร์และวิทยาศาสตร์</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span className="badge badge-purple">ภาคการศึกษา 2/2568</span>
          </div>
        </div>

        <div className="card-body" style={{ padding: 0 }}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>รหัสนักศึกษา</th>
                  <th>ชื่อ-สกุล</th>
                  <th>สถานประกอบการ</th>
                  <th>อาจารย์นิเทศ</th>
                  <th>ชั่วโมงสะสม</th>
                  <th>ผลประเมิน</th>
                  <th>สถานะ</th>
                  <th>การดำเนินการ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>{studentData.id}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{studentData.fullName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{studentData.major}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '0.88rem' }}>{companyData.companyName.split('(')[0]}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>พี่เลี้ยง: {companyData.supervisorName.split('(')[0]}</div>
                  </td>
                  <td>{studentData.advisorName}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{hoursCompleted} ชม.</span>
                  </td>
                  <td>
                    <span className="badge badge-success" style={{ fontWeight: 700 }}>
                      เกรด {isVoided ? "E" : studentData.finalGrade}
                    </span>
                  </td>
                  <td>
                    {isVoided ? (
                      <span className="badge badge-danger">
                        🚫 โมฆะ (เกรด E)
                      </span>
                    ) : (
                      <span className="badge badge-success">
                        ปกติ (Active)
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${isVoided ? 'btn-secondary' : 'btn-danger'}`}
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                      onClick={() => onToggleVoid(isVoided ? "" : "พบหลักฐานทุจริตเวลา")}
                    >
                      <ShieldAlert size={12} />
                      {isVoided ? "ยกเลิกโมฆะ" : "ปรับโมฆะ (E)"}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
