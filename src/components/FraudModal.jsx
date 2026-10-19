import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, X, Check } from 'lucide-react';

export default function FraudModal({ isOpen, onClose, onConfirm, studentName, isAlreadyVoided }) {
  const [reason, setReason] = useState('พบหลักฐานการปลอมแปลงข้อมูลการลงเวลาทำงาน (Time Stamp Fraud)');
  const [confirmedChecked, setConfirmedChecked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!confirmedChecked && !isAlreadyVoided) return;
    onConfirm(reason);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div className="card-header" style={{ borderBottomColor: 'var(--danger)' }}>
          <div className="card-title-group">
            <div className="card-icon-badge" style={{ background: 'var(--danger-bg)', color: 'var(--danger)' }}>
              <ShieldAlert size={22} />
            </div>
            <div>
              <h3 className="card-title" style={{ color: 'var(--danger)' }}>
                {isAlreadyVoided ? "ยกเลิกสถานะโมฆะ (Revert)" : "ระบบตรวจสอบการทุจริตเวลา (FR-2.4)"}
              </h3>
              <p className="card-subtitle">ระเบียบศูนย์ฝึกประสบการณ์วิชาชีพฯ มหาวิทยาลัยราชภัฏศรีสะเกษ</p>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="card-body">
          {!isAlreadyVoided ? (
            <>
              <div className="alert-box alert-danger">
                <AlertTriangle size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>คำเตือนบทลงโทษขั้นสูงสุด:</strong>
                  <p style={{ marginTop: '0.35rem', fontSize: '0.88rem' }}>
                    หากตรวจสอบพบว่านักศึกษา <strong>{studentName}</strong> มีการทุจริตเวลาปฏิบัติงานจริง 
                    ระบบจะทำการ <strong>ปรับผลการฝึกงานเป็นโมฆะทันที (เกรด E)</strong> 
                    และไม่สามารถออกใบประกาศนียบัตรได้ตามข้อบังคับมหาวิทยาลัย
                  </p>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  ระบุหลักฐานหรือเหตุผลการตรวจพบการทุจริต <span className="required">*</span>
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="เช่น ตรวจสอบพบ IP Address ไม่ตรงกับสถานที่ฝึกงาน, มีการตอกบัตรแทนกัน ฯลฯ"
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem' }}>
                <input
                  type="checkbox"
                  style={{ marginTop: '3px' }}
                  checked={confirmedChecked}
                  onChange={(e) => setConfirmedChecked(e.target.checked)}
                />
                <span>
                  ข้าพเจ้าได้ตรวจสอบพยานหลักฐานและยืนยันการลงมติปรับผลการฝึกงานเป็นโมฆะ (เกรด E)
                </span>
              </label>
            </>
          ) : (
            <div className="alert-box alert-warning">
              <AlertTriangle size={24} style={{ flexShrink: 0 }} />
              <div>
                <strong>ยกเลิกโทษโมฆะ:</strong> คุณต้องการปลดล็อกสถานะโมฆะของ <strong>{studentName}</strong> ให้กลับมาเป็นสถานะปกติหรือไม่?
              </div>
            </div>
          )}
        </div>

        <div className="card-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            ยกเลิก
          </button>
          {!isAlreadyVoided ? (
            <button
              className="btn btn-danger"
              disabled={!confirmedChecked || !reason.trim()}
              onClick={handleSubmit}
              style={{ opacity: confirmedChecked && reason.trim() ? 1 : 0.6 }}
            >
              <ShieldAlert size={16} /> ยืนยันปรับเป็นโมฆะ (เกรด E)
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleSubmit}>
              <Check size={16} /> ยืนยันปลดล็อกสถานะ
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
