import React, { useEffect, useState } from 'react';
import {
  Award,
  Printer,
  Download,
  CheckCircle,
  ShieldAlert,
  Sparkles,
  QrCode,
  Calendar,
  Clock,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Module6Certificate({
  certificateData,
  studentData,
  companyData,
  isVoided,
  currentRole
}) {
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!isVoided) {
      // Fire confetti celebration when entering certificate page
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [isVoided]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyVerification = () => {
    navigator.clipboard?.writeText(`https://internhub.sskru.ac.th/verify/${certificateData.certNumber}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero no-print">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 6 (ส่วนที่ 6)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-6.1</span>
        </div>
        <h2 className="hero-title">ประกาศนียบัตรรับรองการฝึกงาน (Digital Certificate)</h2>
        <p className="hero-subtitle">
          ระบบออกใบประกาศนียบัตรดิจิทัลอัตโนมัติ พร้อมตราสัญลักษณ์ ลายเซ็นรับรอง และระบบตรวจสอบความถูกต้องผ่านรหัส QR
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{certificateData.certNumber}</span>
            <span className="hero-stat-label">เลขที่ใบประกาศนียบัตร</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">{certificateData.totalHours} ชั่วโมง</span>
            <span className="hero-stat-label">จำนวนชั่วโมงปฏิบัติงานจริง</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--sskru-gold-light)' }}>
              {certificateData.performanceGrade}
            </span>
            <span className="hero-stat-label">ผลการประเมินมาตรฐาน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: isVoided ? 'var(--danger)' : 'var(--success)' }}>
              {isVoided ? "ถูกระงับ (โมฆะ)" : "ผ่านเกณฑ์รับรอง ✓"}
            </span>
            <span className="hero-stat-label">สถานะการออกเอกสาร</span>
          </div>
        </div>
      </div>

      {/* Void Notice */}
      {isVoided ? (
        <div className="alert-box alert-danger">
          <ShieldAlert size={28} style={{ flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
              ไม่สามารถออกใบประกาศนียบัตรได้เนื่องจากผลการฝึกงานเป็นโมฆะ (เกรด E)
            </h3>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>
              ระบบได้ทำการระงับการสร้างและพิมพ์ใบประกาศนียบัตรสำหรับนักศึกษา <strong>{studentData.fullName}</strong> ตามคำสั่งลงโทษของศูนย์ฝึกประสบการณ์วิชาชีพฯ
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Action Toolbar */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <span className="badge badge-success" style={{ padding: '0.4rem 0.85rem' }}>
                <CheckCircle size={15} /> ได้รับการอนุมัติให้ออกใบประกาศนียบัตรแล้ว
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                ออกเมื่อ {certificateData.issueDate}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={handleCopyVerification}>
                <QrCode size={16} />
                {copiedLink ? "คัดลอกลิงก์ตรวจสอบแล้ว!" : "คัดลอกลิงก์ตรวจสอบ (Verify Link)"}
              </button>
              <button className="btn btn-gold" onClick={handlePrint}>
                <Printer size={16} /> พิมพ์ใบประกาศนียบัตร (Print / PDF)
              </button>
            </div>
          </div>

          {/* Certificate Canvas / Sheet */}
          <div className="certificate-preview-wrapper">
            <div className="certificate-sheet">
              {/* Corner Ornaments */}
              <div className="cert-corner-decor cert-corner-tl" />
              <div className="cert-corner-decor cert-corner-tr" />
              <div className="cert-corner-decor cert-corner-bl" />
              <div className="cert-corner-decor cert-corner-br" />

              {/* Certificate Header */}
              <div className="cert-header">
                <div className="cert-logo-mark">
                  S
                </div>
                <h1 className="cert-title-th">มหาวิทยาลัยราชภัฏศรีสะเกษ</h1>
                <div className="cert-title-en">Sisaket Rajabhat University</div>
                <div style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.4rem', fontWeight: 500 }}>
                  ศูนย์ฝึกประสบการณ์วิชาชีพและสหกิจศึกษา ร่วมกับ {companyData.companyName}
                </div>
              </div>

              {/* Certificate Main Body */}
              <div style={{ margin: '1.25rem 0' }}>
                <p style={{ fontSize: '1.15rem', color: '#475569', letterSpacing: '0.05em' }}>
                  ประกาศนียบัตรฉบับนี้ให้ไว้เพื่อแสดงว่า
                </p>

                <h2 className="cert-student-name">
                  {studentData.fullName}
                </h2>

                <p style={{ fontSize: '1rem', color: '#64748b', marginBottom: '0.75rem' }}>
                  รหัสประจำตัวนักศึกษา {studentData.id} สาขาวิชา{studentData.major}
                </p>

                <p className="cert-body-text">
                  ได้สำเร็จการฝึกปฏิบัติงานตามหลักสูตรสหกิจศึกษาและการฝึกประสบการณ์วิชาชีพ<br />
                  ณ <strong>{companyData.companyName}</strong><br />
                  ตั้งแต่วันที่ {certificateData.periodText} รวมระยะเวลาปฏิบัติงาน <strong>{certificateData.totalHours} ชั่วโมง</strong><br />
                  ด้วยผลการปฏิบัติงานในระดับ <strong>{certificateData.performanceGrade}</strong>
                </p>
              </div>

              {/* Bottom Signatures & Seal */}
              <div>
                <div className="cert-signatures-row">
                  {/* Supervisor Signature */}
                  <div className="cert-sig-block">
                    <div style={{ minHeight: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'cursive', fontSize: '1.4rem', color: '#1e1b4b', fontWeight: 'bold' }}>
                        Kullunat.M
                      </span>
                    </div>
                    <div className="cert-sig-line" />
                    <div className="cert-sig-name">({certificateData.supervisorName})</div>
                    <div className="cert-sig-title">{certificateData.supervisorTitle}</div>
                  </div>

                  {/* University Seal Badge */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{
                      width: '78px',
                      height: '78px',
                      borderRadius: '50%',
                      border: '3px double #d97706',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'radial-gradient(circle, #fef3c7 0%, #fde68a 100%)',
                      color: '#b45309',
                      fontWeight: 700,
                      fontSize: '0.68rem',
                      textAlign: 'center',
                      padding: '0.2rem',
                      lineHeight: 1.1,
                      boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)'
                    }}>
                      SSKRU<br />OFFICIAL<br />SEAL
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.35rem' }}>
                      {certificateData.certNumber}
                    </div>
                  </div>

                  {/* Dean Signature */}
                  <div className="cert-sig-block">
                    <div style={{ minHeight: '48px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      <span style={{ fontFamily: 'cursive', fontSize: '1.4rem', color: '#4c1d95', fontWeight: 'bold' }}>
                        Nantiya.B
                      </span>
                    </div>
                    <div className="cert-sig-line" />
                    <div className="cert-sig-name">({certificateData.deanName})</div>
                    <div className="cert-sig-title">{certificateData.deanTitle}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '1.5rem', textAlign: 'center' }}>
                  ใบรับรองอิเล็กทรอนิกส์ตามพระราชบัญญัติธุรกรรมทางอิเล็กทรอนิกส์ • มหาวิทยาลัยราชภัฏศรีสะเกษ
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
