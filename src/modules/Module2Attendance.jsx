import React, { useState } from 'react';
import {
  Clock,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Upload,
  PenTool,
  ShieldAlert,
  Plus,
  Image as ImageIcon,
  Check,
  X,
  FileCheck
} from 'lucide-react';
import SignatureModal from '../components/SignatureModal';
import FraudModal from '../components/FraudModal';

export default function Module2Attendance({
  attendanceList,
  onAddAttendance,
  isVoided,
  voidReason,
  onToggleVoid,
  currentRole,
  studentData
}) {
  const [selectedMonth, setSelectedMonth] = useState('2026-02');
  const [showSignModal, setShowSignModal] = useState(false);
  const [showFraudModal, setShowFraudModal] = useState(false);
  const [supervisorSignature, setSupervisorSignature] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedDate, setVerifiedDate] = useState(null);

  // New check-in form state
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTimeIn, setNewTimeIn] = useState('08:25');
  const [newTimeOut, setNewTimeOut] = useState('17:30');
  const [newStatus, setNewStatus] = useState('present');
  const [newNotes, setNewNotes] = useState('');
  const [newCardImage, setNewCardImage] = useState(null);

  // Modal for previewing time card image
  const [previewCardImage, setPreviewCardImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCardImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddNewRecord = (e) => {
    e.preventDefault();
    if (isVoided) {
      alert('ไม่สามารถลงเวลาได้ เนื่องจากสถานะการฝึกงานเป็นโมฆะ (เกรด E)');
      return;
    }

    const dayNames = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const dateObj = new Date(newDate);
    const dayOfWeek = dayNames[dateObj.getDay()];

    let statusLabel = 'มาปฏิบัติงาน';
    if (newStatus === 'sick_leave') statusLabel = 'ลาป่วย';
    if (newStatus === 'personal_leave') statusLabel = 'ลากิจ';
    if (newStatus === 'holiday') statusLabel = 'วันหยุด';

    const newRecord = {
      id: `att-${Date.now()}`,
      date: newDate,
      day: dayOfWeek,
      timeIn: newStatus === 'holiday' || newStatus === 'sick_leave' ? '-' : newTimeIn,
      timeOut: newStatus === 'holiday' || newStatus === 'sick_leave' ? '-' : newTimeOut,
      status: newStatus,
      statusLabel: statusLabel,
      notes: newNotes || 'บันทึกเวลาปฏิบัติงานผ่านระบบ',
      hasTimeCard: !!newCardImage,
      timeCardImage: newCardImage || "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80",
      isFraud: false
    };

    onAddAttendance(newRecord);
    setNewNotes('');
    setNewCardImage(null);
  };

  const handleSaveSignature = (signatureDataUrl) => {
    setSupervisorSignature(signatureDataUrl);
    setIsVerified(true);
    setVerifiedDate(new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }));
  };

  // Quick statistics
  const totalDays = attendanceList.length;
  const presentDays = attendanceList.filter((a) => a.status === 'present').length;
  const sickDays = attendanceList.filter((a) => a.status === 'sick_leave').length;
  const holidayDays = attendanceList.filter((a) => a.status === 'holiday').length;

  return (
    <div className="page-container">
      {/* Voided Alert Banner if fraud detected */}
      {isVoided && (
        <div className="alert-box alert-danger" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderWidth: '2px' }}>
          <ShieldAlert size={32} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>
              🚫 สถานะการฝึกงาน: เป็นโมฆะ (เกรด E)
            </h3>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
              ตามระเบียบศูนย์ฝึกประสบการณ์วิชาชีพฯ ตรวจพบการทุจริตการลงเวลาปฏิบัติงาน: <strong>{voidReason}</strong>
              <br />
              ผลการฝึกงานถูกปรับเป็นเกรด E โดยอัตโนมัติ และระงับการออกใบประกาศนียบัตร
            </p>
            {(currentRole === 'supervisor' || currentRole === 'admin') && (
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setShowFraudModal(true)}
                style={{ marginTop: '0.65rem' }}
              >
                จัดการสถานะโมฆะ / ยกเลิกโทษ
              </button>
            )}
          </div>
        </div>
      )}

      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 2 (ส่วนที่ 2)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-2.1 ถึง FR-2.4</span>
        </div>
        <h2 className="hero-title">ระบบลงเวลาปฏิบัติงาน (Attendance Tracking)</h2>
        <p className="hero-subtitle">
          บันทึกเวลา มา-กลับ ออนไลน์ รองรับการอัปโหลดสำเนาบัตรตอก การลงลายมือชื่อดิจิทัลรับรองเมื่อสิ้นเดือน และระบบตรวจสอบการทุจริต
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{presentDays} วัน</span>
            <span className="hero-stat-label">มาปฏิบัติงาน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">{sickDays} วัน</span>
            <span className="hero-stat-label">การลา (ป่วย/กิจ)</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">{holidayDays} วัน</span>
            <span className="hero-stat-label">วันหยุดราชการ/บริษัท</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: isVerified ? 'var(--success)' : 'var(--sskru-gold-light)' }}>
              {isVerified ? 'รับรองแล้ว ✓' : 'รอรับรองสิ้นเดือน'}
            </span>
            <span className="hero-stat-label">การรับรองโดยที่ปรึกษา</span>
          </div>
        </div>
      </div>

      {/* Top Action Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>เลือกเดือน:</label>
          <select
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ width: '200px' }}
          >
            <option value="2026-02">กุมภาพันธ์ 2569</option>
            <option value="2026-01">มกราคม 2569</option>
            <option value="2025-12">ธันวาคม 2568</option>
            <option value="2025-11">พฤศจิกายน 2568</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          {/* Supervisor Signature Button */}
          {(currentRole === 'supervisor' || currentRole === 'admin') && (
            <button
              className="btn btn-gold"
              onClick={() => setShowSignModal(true)}
            >
              <PenTool size={16} />
              {isVerified ? "ลงลายมือชื่อรับรองใหม่" : "ลงลายมือชื่อดิจิทัลรับรองสิ้นเดือน (FR-2.2)"}
            </button>
          )}

          {/* Fraud Detection Toggle Button */}
          {(currentRole === 'supervisor' || currentRole === 'admin') && (
            <button
              className={`btn ${isVoided ? 'btn-secondary' : 'btn-danger'}`}
              onClick={() => setShowFraudModal(true)}
              title="ระบบตรวจสอบการทุจริตตามกฎศูนย์ฝึกฯ"
            >
              <ShieldAlert size={16} />
              {isVoided ? "จัดการโทษโมฆะ" : "ตรวจพบทุจริต / ปรับโมฆะ (FR-2.4)"}
            </button>
          )}
        </div>
      </div>

      {/* Supervisor Verification Banner */}
      {isVerified && (
        <div className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--success)', background: 'var(--success-bg)' }}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--success)' }}>
                  FR-2.2 พนักงานที่ปรึกษาลงลายมือชื่อรับรองเวลาเรียบร้อยแล้ว
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  รับรองโดย คุณกุลณัฐ มงคล เมื่อวันที่ {verifiedDate}
                </p>
              </div>
            </div>
            {supervisorSignature && (
              <div style={{ textAlign: 'center', padding: '0.5rem 1rem', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <img src={supervisorSignature} alt="Supervisor Signature" style={{ height: '45px', objectFit: 'contain' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ลายมือชื่อดิจิทัลที่ผ่านการยืนยัน</div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid-3" style={{ gridTemplateColumns: currentRole === 'student' ? '1fr 2fr' : '1fr' }}>
        {/* FR-2.1 Daily Check-in Form for Student */}
        {currentRole === 'student' && !isVoided && (
          <div className="card" style={{ height: 'fit-content' }}>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-2.1 บันทึกเวลาปฏิบัติงาน</h3>
                  <p className="card-subtitle">ลงเวลาประจำวันหรือย้อนหลัง</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleAddNewRecord}>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">
                    วันที่ปฏิบัติงาน <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-input"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    สถานะการปฏิบัติงาน <span className="required">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="present">🟢 มาปฏิบัติงานตามปกติ</option>
                    <option value="sick_leave">🟡 ลาป่วย (มีใบรับรอง)</option>
                    <option value="personal_leave">🟠 ลากิจ</option>
                    <option value="holiday">🔴 วันหยุด</option>
                  </select>
                </div>

                {newStatus === 'present' && (
                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">เวลามา</label>
                      <input
                        type="time"
                        className="form-input"
                        value={newTimeIn}
                        onChange={(e) => setNewTimeIn(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">เวลากลับ</label>
                      <input
                        type="time"
                        className="form-input"
                        value={newTimeOut}
                        onChange={(e) => setNewTimeOut(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">หมายเหตุ / กิจกรรมสำคัญ</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="เช่น ทำงานโปรเจกต์, ประชุมทีม ฯลฯ"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                  />
                </div>

                {/* FR-2.3 Time card upload */}
                <div className="form-group">
                  <label className="form-label">
                    FR-2.3 อัปโหลดสำเนาบัตรตอก / ตั๋วเวลา
                  </label>
                  <div style={{
                    border: '2px dashed var(--border-strong)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-app)'
                  }}>
                    {newCardImage ? (
                      <div>
                        <img
                          src={newCardImage}
                          alt="Timecard preview"
                          style={{ maxHeight: '100px', borderRadius: 'var(--radius-sm)', marginBottom: '0.5rem' }}
                        />
                        <div>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setNewCardImage(null)}
                          >
                            ลบรูป
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                        <Upload size={20} color="var(--primary)" />
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                          คลิกเพื่ออัปโหลดรูปบัตรตอก (JPG, PNG)
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          style={{ display: 'none' }}
                        />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  <Plus size={16} /> บันทึกเวลาลงตาราง
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Attendance Table */}
        <div className="card" style={{ gridColumn: currentRole === 'student' ? '2 / 3' : '1 / -1' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="card-title">บันทึกเวลาประจำเดือน {selectedMonth}</h3>
                <p className="card-subtitle">รวม {attendanceList.length} วันทำการ</p>
              </div>
            </div>
          </div>

          <div className="card-body" style={{ padding: 0 }}>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>วัน</th>
                    <th>เวลามา</th>
                    <th>เวลากลับ</th>
                    <th>สถานะ</th>
                    <th>บัตรตอก</th>
                    <th>หมายเหตุ</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceList.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontWeight: 600 }}>{row.date}</td>
                      <td>{row.day}</td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {row.timeIn}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                          {row.timeOut}
                        </span>
                      </td>
                      <td>
                        {row.status === 'present' && <span className="badge badge-success">มาปฏิบัติงาน</span>}
                        {row.status === 'sick_leave' && <span className="badge badge-warning">ลาป่วย</span>}
                        {row.status === 'personal_leave' && <span className="badge badge-warning">ลากิจ</span>}
                        {row.status === 'holiday' && <span className="badge badge-info">วันหยุด</span>}
                      </td>
                      <td>
                        {row.hasTimeCard ? (
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
                            onClick={() => setPreviewCardImage(row.timeCardImage)}
                          >
                            <ImageIcon size={13} /> ดูบัตรตอก
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-subtle)', fontSize: '0.78rem' }}>ไม่มี</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {row.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      <SignatureModal
        isOpen={showSignModal}
        onClose={() => setShowSignModal(false)}
        onSave={handleSaveSignature}
        title="ลงลายมือชื่อดิจิทัลรับรองเวลาสิ้นเดือน (FR-2.2)"
      />

      {/* Fraud Modal */}
      <FraudModal
        isOpen={showFraudModal}
        onClose={() => setShowFraudModal(false)}
        onConfirm={(reason) => onToggleVoid(reason)}
        studentName={studentData.fullName}
        isAlreadyVoided={isVoided}
      />

      {/* Timecard Image Preview Modal */}
      {previewCardImage && (
        <div className="modal-overlay" onClick={() => setPreviewCardImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <div className="card-header">
              <h3 className="card-title">สำเนาบัตรตอกบันทึกเวลา (FR-2.3)</h3>
              <button className="icon-btn" onClick={() => setPreviewCardImage(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="card-body" style={{ textAlign: 'center' }}>
              <img
                src={previewCardImage}
                alt="Time Card Verification"
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', borderRadius: 'var(--radius-md)' }}
              />
              <p style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                ตรวจสอบเอกสารตอกบัตร/ตั๋วเวลาจากเครื่องสแกนของสถานประกอบการ
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
