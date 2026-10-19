import React, { useState } from 'react';
import {
  ClipboardCheck,
  Building2,
  UserCheck,
  Star,
  CheckCircle,
  Save,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function Module4Supervision({
  supervisionData,
  onUpdateSupervision,
  currentRole,
  studentData,
  companyData
}) {
  const [data, setData] = useState(supervisionData);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const canEdit = currentRole === 'advisor' || currentRole === 'admin';

  const handleCompanyScoreChange = (key, value) => {
    setData({
      ...data,
      companyScores: {
        ...data.companyScores,
        [key]: parseInt(value, 10)
      }
    });
  };

  const handleStudentScoreChange = (key, value) => {
    setData({
      ...data,
      studentScores: {
        ...data.studentScores,
        [key]: parseInt(value, 10)
      }
    });
  };

  const handleSave = () => {
    onUpdateSupervision(data);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Calculate averages
  const companyScoreValues = Object.values(data.companyScores);
  const companyAvg = (companyScoreValues.reduce((a, b) => a + b, 0) / companyScoreValues.length).toFixed(2);

  const studentScoreValues = Object.values(data.studentScores);
  const studentAvg = (studentScoreValues.reduce((a, b) => a + b, 0) / studentScoreValues.length).toFixed(2);

  return (
    <div className="page-container">
      {/* Hero Header */}
      <div className="page-hero">
        <div className="hero-meta">
          <span className="hero-tag">โมดูลที่ 4 (ส่วนที่ 4)</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>สำหรับอาจารย์นิเทศ (Advisor)</span>
        </div>
        <h2 className="hero-title">บันทึกการนิเทศการฝึกงานและสหกิจศึกษา</h2>
        <p className="hero-subtitle">
          แบบประเมินคุณภาพสถานประกอบการ (Scale 1-5) และแบบประเมินคุณภาพนักศึกษาโดยอาจารย์นิเทศ มหาวิทยาลัยราชภัฏศรีสะเกษ
        </p>

        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="hero-stat-value">{companyAvg} / 5.00</span>
            <span className="hero-stat-label">คะแนนเฉลี่ยสถานประกอบการ</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value">{studentAvg} / 5.00</span>
            <span className="hero-stat-label">คะแนนเฉลี่ยคุณภาพนักศึกษา</span>
          </div>
          <div className="hero-stat-item">
            <span className="hero-stat-value" style={{ color: 'var(--success)' }}>
              {data.isApproved ? "อนุมัติเรียบร้อย ✓" : "รอนิเทศ"}
            </span>
            <span className="hero-stat-label">สถานะการนิเทศ</span>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="alert-box alert-success" style={{ animation: 'fadeIn 200ms ease' }}>
          <CheckCircle size={20} />
          <div><strong>บันทึกสำเร็จ!</strong> บันทึกผลการนิเทศและแบบประเมินเรียบร้อยแล้ว</div>
        </div>
      )}

      {/* FR-4.1 Supervision Overview */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <div className="card-title-group">
            <div className="card-icon-badge">
              <ClipboardCheck size={20} />
            </div>
            <div>
              <h3 className="card-title">FR-4.1 ข้อมูลการนิเทศและนักศึกษาในความดูแล</h3>
              <p className="card-subtitle">ข้อมูลการลงพื้นที่นิเทศและอาจารย์ผู้รับผิดชอบ</p>
            </div>
          </div>
        </div>

        <div className="card-body">
          <div className="grid-3">
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>อาจารย์ผู้นิเทศ</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{data.advisorName}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>วันที่นิเทศ</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{data.supervisionDate}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>รูปแบบการนิเทศ</div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{data.visitType}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* FR-4.2 Company Evaluation Scale 1-5 */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'var(--sskru-purple)', color: '#fff' }}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 className="card-title">FR-4.2 แบบประเมินคุณภาพสถานประกอบการ</h3>
                <p className="card-subtitle">เกณฑ์การให้คะแนน Scale 1 ถึง 5 (5 = ดีเยี่ยม)</p>
              </div>
            </div>
            <span className="badge badge-purple">{companyAvg} / 5.00</span>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    1. ความเข้าใจต่อกระบวนการฝึกงานและสหกิจศึกษา
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q1_understanding} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q1_understanding}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q1_understanding', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    2. ลักษณะงาน: ปริมาณงานที่เหมาะสม
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q2_work_quantity} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q2_work_quantity}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q2_work_quantity', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    3. ลักษณะงาน: คุณภาพงานตรงตามสาขาวิชา
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q3_work_quality} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q3_work_quality}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q3_work_quality', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    4. ลักษณะงาน: สภาพแวดล้อมและความปลอดภัย
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q4_work_safety} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q4_work_safety}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q4_work_safety', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    5. การจัดการสนับสนุน: สวัสดิการและเบี้ยเลี้ยง
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q5_welfare} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q5_welfare}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q5_welfare', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    6. การจัดการสนับสนุน: เครื่องมือและอุปกรณ์ทำงาน
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q6_equipment} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q6_equipment}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q6_equipment', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    7. การจัดการสนับสนุน: พนักงานที่ปรึกษาให้คำแนะนำใกล้ชิด
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
                    {data.companyScores.q7_mentorship} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.companyScores.q7_mentorship}
                  disabled={!canEdit}
                  onChange={(e) => handleCompanyScoreChange('q7_mentorship', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--primary)' }}
                />
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">ความเห็นเพิ่มเติมต่อสถานประกอบการ</label>
                <textarea
                  className="form-textarea"
                  rows={2}
                  value={data.companyNotes}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, companyNotes: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* FR-4.3 Student Quality Assessment Scale 1-5 */}
        <div className="card">
          <div className="card-header">
            <div className="card-title-group">
              <div className="card-icon-badge" style={{ background: 'var(--sskru-gold)', color: '#fff' }}>
                <UserCheck size={20} />
              </div>
              <div>
                <h3 className="card-title">FR-4.3 แบบประเมินคุณภาพนักศึกษา</h3>
                <p className="card-subtitle">ประเมินโดยอาจารย์นิเทศ Scale 1 ถึง 5</p>
              </div>
            </div>
            <span className="badge badge-warning">{studentAvg} / 5.00</span>
          </div>

          <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    1. ความรับผิดชอบต่อหน้าที่และระเบียบวินัย
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--sskru-gold-dark)' }}>
                    {data.studentScores.q1_responsibility} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.studentScores.q1_responsibility}
                  disabled={!canEdit}
                  onChange={(e) => handleStudentScoreChange('q1_responsibility', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--sskru-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    2. ความรู้ความสามารถทางวิชาการและทักษะเทคโนโลยี
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--sskru-gold-dark)' }}>
                    {data.studentScores.q2_knowledge} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.studentScores.q2_knowledge}
                  disabled={!canEdit}
                  onChange={(e) => handleStudentScoreChange('q2_knowledge', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--sskru-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    3. ทักษะการคิดวิเคราะห์และแก้ปัญหาเฉพาะหน้า
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--sskru-gold-dark)' }}>
                    {data.studentScores.q3_problemsolving} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.studentScores.q3_problemsolving}
                  disabled={!canEdit}
                  onChange={(e) => handleStudentScoreChange('q3_problemsolving', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--sskru-gold)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 500 }}>
                    4. คุณลักษณะส่วนบุคคล มนุษยสัมพันธ์ การแต่งกาย
                  </span>
                  <span style={{ fontWeight: 700, color: 'var(--sskru-gold-dark)' }}>
                    {data.studentScores.q4_personality} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={data.studentScores.q4_personality}
                  disabled={!canEdit}
                  onChange={(e) => handleStudentScoreChange('q4_personality', e.target.value)}
                  style={{ width: '100%', accentColor: 'var(--sskru-gold)' }}
                />
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="form-label">ความเห็นและคำแนะนำแก่นักศึกษา</label>
                <textarea
                  className="form-textarea"
                  rows={4}
                  value={data.studentNotes}
                  disabled={!canEdit}
                  onChange={(e) => setData({ ...data, studentNotes: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {canEdit && (
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={handleSave} style={{ padding: '0.75rem 2rem' }}>
            <Save size={18} /> บันทึกผลการนิเทศและคะแนนประเมิน
          </button>
        </div>
      )}
    </div>
  );
}
