import React, { useState } from 'react';
import {
  FileSpreadsheet,
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  Lock,
  Eye,
  Download,
  Calendar,
  Save,
  Shield,
  FileCheck
} from 'lucide-react';

export default function Module8Reports({
  reportsData,
  onUpdateReports,
  currentRole,
  studentData
}) {
  const [data, setData] = useState(reportsData);
  const [activeSubTab, setActiveSubTab] = useState('outline'); // outline or final
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canStudentEdit = currentRole === 'student';
  const canAdvisorApprove = currentRole === 'advisor' || currentRole === 'admin';

  const handleAdvisorApproveOutline = () => {
    setData({
      ...data,
      outline: {
        ...data.outline,
        advisorStatus: 'approved',
        advisorApprovedAt: new Date().toISOString().split('T')[0],
        advisorComment: 'อนุมัติเค้าโครงรายงาน หัวข้อและขอบเขตสอดคล้องตามมาตรฐานหลักสูตร'
      }
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSaveOutline = (e) => {
    e.preventDefault();
    onUpdateReports(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 8 (ส่วนที่ 8)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-8.1 ถึง FR-8.3</span>
        </div>
        <h2 className="hero-title">การเขียนรายงานและการส่งโครงร่าง</h2>
        <p className="hero-subtitle">
          ส่งเค้าโครงรายงานภายใน 3 สัปดาห์แรก อัปโหลดเล่มรายงานสมบูรณ์ พร้อมระบบแยกเล่มรายงานฉบับความลับและฉบับเผยแพร่ (FR-8.3)
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              {data.outline.advisorStatus === 'approved' ? 'อนุมัติแล้ว ✓' : 'รออนุมัติ'}
            </span>
            <span className="hero-stat-label">สถานะเค้าโครง (3 สัปดาห์แรก)</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">สหกิจศึกษา (Coop)</span>
            <span className="hero-stat-label">ประเภทเล่มรายงาน</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--sskru-gold-light)' }}>
              2 ฉบับแยกสิทธิ์
            </span>
            <span className="hero-stat-label">ระบบจัดการความลับ (FR-8.3)</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              ยินยอมเผยแพร่ ✓
            </span>
            <span className="hero-stat-label">หนังสือยินยอม (FR-8.2)</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert-box alert-success" style={{ animation: 'fadeIn 200ms ease' }}>
          <CheckCircle size={20} />
          <div><strong>บันทึกสำเร็จ!</strong> ข้อมูลเค้าโครงและเล่มรายงานได้รับการปรับปรุงเรียบร้อยแล้ว</div>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="tabs-nav">
        <button
          className={`tab-btn ${activeSubTab === 'outline' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('outline')}
        >
          <Calendar size={16} />
          <span>FR-8.1 ส่งเค้าโครงรายงาน (ภายใน 3 สัปดาห์แรก)</span>
          {data.outline.advisorStatus === 'approved' && (
            <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>ผ่านแล้ว</span>
          )}
        </button>

        <button
          className={`tab-btn ${activeSubTab === 'final' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('final')}
        >
          <FileText size={16} />
          <span>FR-8.2 & FR-8.3 เล่มรายงานสมบูรณ์และการแยกข้อมูลลับ</span>
        </button>
      </div>

      {/* FR-8.1 3-Week Outline Section */}
      {activeSubTab === 'outline' && (
        <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-8.1 เค้าโครงรายงานสหกิจศึกษา / ฝึกงาน</h3>
                  <p className="card-subtitle">ส่งภายใน 3 สัปดาห์แรกของการปฏิบัติงานเพื่อขออนุมัติ</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSaveOutline}>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">
                    หัวข้อโครงงาน / รายงาน (ภาษาไทย) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.outline.titleTh}
                    disabled={!canStudentEdit}
                    onChange={(e) => setData({
                      ...data,
                      outline: { ...data.outline, titleTh: e.target.value }
                    })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Project / Report Title (English) <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={data.outline.titleEn}
                    disabled={!canStudentEdit}
                    onChange={(e) => setData({
                      ...data,
                      outline: { ...data.outline, titleEn: e.target.value }
                    })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    วัตถุประสงค์ของการปฏิบัติงานและจัดทำรายงาน <span className="required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={data.outline.objective}
                    disabled={!canStudentEdit}
                    onChange={(e) => setData({
                      ...data,
                      outline: { ...data.outline, objective: e.target.value }
                    })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    ขอบเขตของงานและระบบที่พัฒนา <span className="required">*</span>
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={data.outline.scope}
                    disabled={!canStudentEdit}
                    onChange={(e) => setData({
                      ...data,
                      outline: { ...data.outline, scope: e.target.value }
                    })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    ประโยชน์ที่คาดว่าจะได้รับต่อสถานประกอบการ
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={2}
                    value={data.outline.expectedBenefits}
                    disabled={!canStudentEdit}
                    onChange={(e) => setData({
                      ...data,
                      outline: { ...data.outline, expectedBenefits: e.target.value }
                    })}
                  />
                </div>
              </div>

              {canStudentEdit && (
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    <Save size={16} /> บันทึกเค้าโครงรายงาน
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Advisor Review Outline Card */}
          <div className="card" style={{ height: 'fit-content' }}>
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'var(--sskru-gold)', color: '#fff' }}>
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="card-title">การตรวจเค้าโครงโดยอาจารย์นิเทศ</h3>
                  <p className="card-subtitle">ส่งเมื่อ {data.outline.submissionDate}</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              {data.outline.advisorStatus === 'approved' ? (
                <div>
                  <div className="alert-box alert-success">
                    <CheckCircle size={20} />
                    <div>
                      <strong>อนุมัติเค้าโครงเรียบร้อยแล้ว</strong>
                      <div style={{ fontSize: '0.78rem' }}>วันที่อนุมัติ: {data.outline.advisorApprovedAt}</div>
                    </div>
                  </div>

                  <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                      ความเห็นจาก ผศ.ดร. ธีรเดช เจริญผล (อาจารย์นิเทศ):
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: '0.88rem' }}>
                      "{data.outline.advisorComment}"
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="alert-box alert-warning">
                    <AlertTriangle size={20} />
                    <div>
                      <strong>รออาจารย์นิเทศตรวจสอบ</strong>
                      <div style={{ fontSize: '0.78rem' }}>นักศึกษาส่งเค้าโครงเรียบร้อยแล้ว</div>
                    </div>
                  </div>

                  {canAdvisorApprove && (
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={handleAdvisorApproveOutline}
                    >
                      <CheckCircle size={16} /> อนุมัติเค้าโครงรายงานนี้
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FR-8.2 & FR-8.3 Final Report & Dual-Version Management */}
      {activeSubTab === 'final' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* FR-8.3 Confidential dual-version Banner */}
          <div className="card" style={{ border: '2px solid var(--sskru-purple)' }}>
            <div className="card-header" style={{ background: 'linear-gradient(90deg, rgba(109, 40, 217, 0.08), transparent)' }}>
              <div className="card-title-group">
                <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-8.3 ระบบจัดการข้อมูลความลับ (Dual-Version Report Management)</h3>
                  <p className="card-subtitle">
                    แยกเล่มรายงานเป็น 2 ฉบับอย่างเคร่งครัดตามข้อตกลงรักษาความลับ (NDA) ของสถานประกอบการ
                  </p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="grid-2">
                {/* Version 1: Company Confidential */}
                <div style={{
                  border: '1px solid #f87171',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  backgroundColor: 'rgba(239, 68, 68, 0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Lock size={18} color="var(--danger)" />
                      <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--danger)' }}>
                        ฉบับที่ 1: ฉบับสมบูรณ์สำหรับสถานประกอบการ
                      </h4>
                    </div>
                    <span className="badge badge-danger">ลับเฉพาะบริษัท (Confidential)</span>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {data.finalReport.companyVersionFile.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={22} color="var(--danger)" />
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>
                          {data.finalReport.companyVersionFile.fileName}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          ขนาด: {data.finalReport.companyVersionFile.fileSize} • อัปโหลดเมื่อ {data.finalReport.companyVersionFile.uploadDate}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => alert("ดาวน์โหลดไฟล์ฉบับสมบูรณ์สำหรับบริษัท (สิทธิ์เฉพาะบริษัทและศูนย์ฯ)")}
                    >
                      <Download size={14} /> ดาวน์โหลด
                    </button>
                  </div>
                </div>

                {/* Version 2: University Public / Sanitized */}
                <div style={{
                  border: '1px solid #34d399',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.25rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.03)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Eye size={18} color="var(--success)" />
                      <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--success)' }}>
                        ฉบับที่ 2: ฉบับเผยแพร่มหาวิทยาลัย
                      </h4>
                    </div>
                    <span className="badge badge-success">เผยแพร่สาธารณะ (Public/Sanitized)</span>
                  </div>

                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    {data.finalReport.universityVersionFile.description}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem',
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <FileText size={22} color="var(--success)" />
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>
                          {data.finalReport.universityVersionFile.fileName}
                        </div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          ขนาด: {data.finalReport.universityVersionFile.fileSize} • อัปโหลดเมื่อ {data.finalReport.universityVersionFile.uploadDate}
                        </div>
                      </div>
                    </div>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => alert("ดาวน์โหลดไฟล์ฉบับเผยแพร่มหาวิทยาลัย")}
                    >
                      <Download size={14} /> ดาวน์โหลด
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FR-8.2 Consent Agreement & Presentation File */}
          <div className="card">
            <div className="card-header">
              <div className="card-title-group">
                <div className="card-icon-badge">
                  <FileCheck size={20} />
                </div>
                <div>
                  <h3 className="card-title">FR-8.2 หนังสือยินยอมเผยแพร่รายงาน (Consent Agreement)</h3>
                  <p className="card-subtitle">ข้อตกลงการยินยอมให้นำผลงานและรายงานไปใช้ประโยชน์ทางวิชาการ</p>
                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="alert-box alert-success" style={{ marginBottom: '1rem' }}>
                <CheckCircle size={22} style={{ flexShrink: 0 }} />
                <div>
                  <strong>สถานะการลงนามหนังสือยินยอม: ยินยอมเรียบร้อยแล้ว</strong>
                  <p style={{ marginTop: '0.25rem', fontSize: '0.86rem' }}>
                    "{data.finalReport.consentAgreement.statement}"
                  </p>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                    ลงนามเมื่อวันที่ {data.finalReport.consentAgreement.agreedDate} โดย {studentData.fullName}
                  </div>
                </div>
              </div>

              {/* Presentation slides file */}
              <div style={{ marginTop: '1rem' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>ไฟล์สไลด์นำเสนอผลงาน (Presentation Slides)</label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  backgroundColor: 'var(--bg-app)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <FileSpreadsheet size={20} color="var(--primary)" />
                    <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                      {data.finalReport.presentationFile.fileName} ({data.finalReport.presentationFile.fileSize})
                    </span>
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => alert("ดาวน์โหลดสไลด์นำเสนอ")}>
                    <Download size={14} /> ดาวน์โหลดสไลด์
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
