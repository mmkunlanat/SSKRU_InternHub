import React, { useState } from 'react';
import {
  Calendar,
  FileText,
  CheckCircle,
  MessageSquare,
  Send,
  UserCheck,
  Award,
  AlertCircle,
  Lightbulb,
  HeartHandshake
} from 'lucide-react';

export default function Module3MonthlyReport({
  monthlyReports,
  onUpdateReport,
  currentRole
}) {
  const [activeTab, setActiveTab] = useState(monthlyReports[0]?.id || 'rep-1');
  const [selectedReport, setSelectedReport] = useState(monthlyReports[0]);
  const [feedbackInput, setFeedbackInput] = useState('');
  const [saveToast, setSaveToast] = useState(false);

  const report = monthlyReports.find((r) => r.id === activeTab) || monthlyReports[0];

  const handleSelectTab = (id) => {
    setActiveTab(id);
    const target = monthlyReports.find((r) => r.id === id);
    setSelectedReport(target);
    setFeedbackInput(target.supervisorComment || '');
  };

  const handleApproveBySupervisor = () => {
    const updated = {
      ...report,
      supervisorApproved: true,
      supervisorComment: feedbackInput || 'อนุมัติรายงานประจำเดือน ผลการปฏิบัติงานเป็นที่น่าพอใจ',
      verifiedAt: new Date().toISOString().split('T')[0]
    };
    onUpdateReport(updated);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const canEditStudent = currentRole === 'student' && !report.supervisorApproved;
  const canSupervisorApprove = currentRole === 'supervisor' || currentRole === 'admin';

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 3 (ส่วนที่ 3)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>FR-3.1</span>
        </div>
        <h2 className="hero-title">แบบรายงานประจำเดือน (Monthly Progress Report)</h2>
        <p className="hero-subtitle">
          รายงานผลการปฏิบัติงาน สรุปผลงานเด่น ปัญหาและอุปสรรค พร้อมข้อเสนอแนะสำหรับการปรับปรุงและคำแนะนำสำหรับรุ่นน้อง
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{monthlyReports.length} รายงาน</span>
            <span className="hero-stat-label">รอบรายงานทั้งหมด</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              {monthlyReports.filter((r) => r.supervisorApproved).length} ผ่านการอนุมัติ
            </span>
            <span className="hero-stat-label">สถานะการตรวจ</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">100%</span>
            <span className="hero-stat-label">อัตราการส่งตรงเวลา</span>
          </div>
        </div>
      </div>

      {saveToast && (
        <div className="alert-box alert-success" style={{ animation: 'fadeIn 200ms ease' }}>
          <CheckCircle size={20} />
          <div><strong>บันทึกสำเร็จ!</strong> ความคิดเห็นและการอนุมัติรายงานได้รับการบันทึกแล้ว</div>
        </div>
      )}

      {/* Month Tabs */}
      <div className="tabs-nav">
        {monthlyReports.map((rep) => (
          <button
            key={rep.id}
            className={`tab-btn ${activeTab === rep.id ? 'active' : ''}`}
            onClick={() => handleSelectTab(rep.id)}
          >
            <Calendar size={16} />
            <span>{rep.monthName}</span>
            {rep.supervisorApproved ? (
              <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>อนุมัติแล้ว</span>
            ) : (
              <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>รอตรวจ</span>
            )}
          </button>
        ))}
      </div>

      <div className="grid-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
        {/* Main Report Form / Details */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="card-title">FR-3.1 {report.monthName}</h3>
                <p className="card-subtitle">ส่งเมื่อวันที่ {report.submittedDate}</p>
              </div>
            </div>

            {report.supervisorApproved ? (
              <span className="badge badge-success">
                <CheckCircle size={14} /> อนุมัติโดยที่ปรึกษาแล้ว
              </span>
            ) : (
              <span className="badge badge-warning">
                <AlertCircle size={14} /> รอพนักงานที่ปรึกษาตรวจสอบ
              </span>
            )}
          </div>

          <div className="card-body">
            {/* 1. ผลการปฏิบัติงาน */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600 }}>
                1. สรุปผลการปฏิบัติงานในรอบเดือน
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={report.workAccomplishment}
                disabled={!canEditStudent}
                onChange={(e) => {
                  const updated = { ...report, workAccomplishment: e.target.value };
                  onUpdateReport(updated);
                }}
              />
            </div>

            {/* 2. ความสัมพันธ์กับบุคลากร */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <HeartHandshake size={16} color="var(--primary)" />
                2. การปรับตัวและความสัมพันธ์กับบุคลากรในหน่วยงาน
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={report.teamRelationship}
                disabled={!canEditStudent}
                onChange={(e) => {
                  const updated = { ...report, teamRelationship: e.target.value };
                  onUpdateReport(updated);
                }}
              />
            </div>

            {/* 3. ผลงานเด่น */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Award size={16} color="var(--sskru-gold)" />
                3. ผลงานเด่นที่ภาคภูมิใจ / ประโยชน์ที่หน่วยงานได้รับ
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={report.outstandingWork}
                disabled={!canEditStudent}
                onChange={(e) => {
                  const updated = { ...report, outstandingWork: e.target.value };
                  onUpdateReport(updated);
                }}
              />
            </div>

            {/* 4. ปัญหาและอุปสรรค */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <AlertCircle size={16} color="var(--danger)" />
                4. ปัญหาและอุปสรรคที่พบระหว่างการทำงาน พร้อมวิธีแก้ไข
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={report.problemsObstacles}
                disabled={!canEditStudent}
                onChange={(e) => {
                  const updated = { ...report, problemsObstacles: e.target.value };
                  onUpdateReport(updated);
                }}
              />
            </div>

            {/* 5. ข้อเสนอแนะสำหรับรุ่นน้อง */}
            <div className="form-group">
              <label className="form-label" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Lightbulb size={16} color="var(--sskru-purple)" />
                5. ข้อเสนอแนะและความรู้ที่เป็นประโยชน์สำหรับรุ่นน้อง
              </label>
              <textarea
                className="form-textarea"
                rows={3}
                value={report.juniorRecommendations}
                disabled={!canEditStudent}
                onChange={(e) => {
                  const updated = { ...report, juniorRecommendations: e.target.value };
                  onUpdateReport(updated);
                }}
              />
            </div>
          </div>
        </div>

        {/* Supervisor Review Card */}
        <div className="card" style={{ height: 'fit-content' }}>
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="card-title">การตรวจรับรองโดยที่ปรึกษา</h3>
                <p className="card-subtitle">Job Supervisor Feedback</p>
              </div>
            </div>
          </div>

          <div className="card-body">
            {report.supervisorApproved ? (
              <div>
                <div className="alert-box alert-success" style={{ marginBottom: '1rem' }}>
                  <CheckCircle size={20} />
                  <div>
                    <strong>รับรองผลการรายงานแล้ว</strong>
                    <div style={{ fontSize: '0.78rem' }}>วันที่ตรวจ: {report.verifiedAt}</div>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-app)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                    ข้อเสนอแนะจากพี่เลี้ยง/พนักงานที่ปรึกษา:
                  </div>
                  <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-main)' }}>
                    "{report.supervisorComment}"
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  พนักงานที่ปรึกษาสามารถให้ข้อเสนอแนะและกดอนุมัติรายงานประจำเดือนของนักศึกษาได้ที่นี่
                </p>

                {canSupervisorApprove ? (
                  <div>
                    <div className="form-group">
                      <label className="form-label">ความคิดเห็น / คำแนะนำจากที่ปรึกษา</label>
                      <textarea
                        className="form-textarea"
                        rows={4}
                        placeholder="ระบุความคิดเห็นเกี่ยวกับผลการปฏิบัติงานของนักศึกษา..."
                        value={feedbackInput}
                        onChange={(e) => setFeedbackInput(e.target.value)}
                      />
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      onClick={handleApproveBySupervisor}
                    >
                      <CheckCircle size={16} /> อนุมัติและบันทึกรายงาน
                    </button>
                  </div>
                ) : (
                  <div className="alert-box alert-info">
                    <MessageSquare size={18} />
                    <div style={{ fontSize: '0.82rem' }}>
                      รอพนักงานที่ปรึกษาเข้าสู่ระบบเพื่อทำการตรวจและให้ข้อเสนอแนะ
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
